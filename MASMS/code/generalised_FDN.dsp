declare name        "Switchable Diffusivity Feedback Delay Network2";
declare version     "1.0.1";
declare author      "Facundo Franchino";

import("stdfaust.lib");

//controls
mode = hslider("engine mode [style:radio{'standard':0;'allpass':1}]", 0, 0, 1, 1) : int;

t60 = hslider("decay t60 [unit:s]", 2.0, 0.1, 10.0, 0.1);
damp = hslider("hf damping [0-1]", 0.4, 0, 0.9, 0.01);
wet = hslider("dry/wet", 0.5, 0, 1, 0.01);

//modulation settings
//note,lowered default speed for a smoother, less "wobbly" drift
modSpeed = hslider("mod speed [hz]", 0.2, 0.01, 5.0, 0.01);
modDepth = hslider("mod depth [samp]", 8, 0, 50, 0.1);

//helper functions

op(g) = _ : (+ : _ * (1-g)) ~ * (g);

hadamard(2) = si.bus(2) <: +, -;
hadamard(4) = par(i, 2, hadamard(2)) : ro.interleave(2,2) : par(i, 2, hadamard(2));

prime(0) = 1973; prime(1) = 2693; prime(2) = 3251; prime(3) = 3943;

//input diffuser
diffuser = 
    ap(113, 0.7) : ap(157, 0.7) : ap(337, 0.6) : ap(541, 0.5) 
with {
    ap(size, g) = (+ <: (de.delay(2048, size), *(g))) ~ *(-g) : mem, _ : +;
};

//core engine

//generalised branch
generalisedBranch(idx, phaseOffset) = _ <: ba.selectn(2, mode, pathDelay, pathAllpass) : _
with {
    N = prime(idx);
    
    //mode 0,static delay
    pathDelay = de.delay(65536, N);
    
    //mode 1,modulated allpass
    apGain = 0.1;
    
    localLfo = os.oscp(modSpeed, phaseOffset) * modDepth;
    
    //structure, schroeder allpass with variable delay length
    pathAllpass = (+ <: (de.fdelay(65536, N-1+localLfo), *(apGain))) ~ *(-apGain) : mem, _ : +;
};

//main fdn loop
fdn = (inputPath : opPath : branchPath : hadamardPath : normHadamard : decay : feedbackLimiter) ~ si.bus(4) : delCompensation
with{
    inputPath = ro.interleave(4, 2) : par(i, 4, (_, _) :> _);
    opPath = par(i, 4, op(damp));
    
    //decorrelation, phases spread by 90 degrees (pi/2)
    branchPath = par(i, 4, generalisedBranch(i, 2*ma.PI * (i/4)));
    
    hadamardPath = hadamard(4);
    normHadamard = par(i, 4, _ * 0.5);
    
    g(i) = pow(0.001, (prime(i)/ma.SR) / t60) : min(0.995); 
    decay = par(i, 4, *(g(i)));
    
    feedbackLimiter = par(i, 4, ma.tanh);     
    delCompensation = par(i, 4, mem);
};

stereoToQuad = _,_ <: _,_,_,_;
outputGain = *(0.5);

process = _,_ <: 
    (*(1-wet), *(1-wet)), 
    (diffuser, diffuser : stereoToQuad : fdn :> _,_ : outputGain, outputGain : *(wet), *(wet)) 
    :> _,_;