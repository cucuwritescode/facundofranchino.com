declare name "Modern Moorer Reverb";
declare author "Facundo Franchino";
declare description "implementation of Moorer's 1979 design using modern Faust arrays";

import("stdfaust.lib");
//controls
t60 = hslider("Reverb Time [unit:s]", 2.0, 0.1, 10.0, 0.1);
damp = hslider("HF Damping [0-1]", 0.4, 0, 0.99, 0.01);

//data is the Boston Symphony Hall Simulation
//these values are taken directly from Moorer's 1979 paper "About This Reverberation Business".
//they represent the first 18 discrete reflections of Boston Symphony Hall.
er_times = (
    0.0043, 0.0215, 0.0225, 0.0268, 0.0270, 0.0298, 
    0.0458, 0.0485, 0.0572, 0.0587, 0.0595, 0.0612, 
    0.0707, 0.0708, 0.0726, 0.0741, 0.0753, 0.0797
);

er_gains = (
    0.841, 0.504, 0.491, 0.379, 0.380, 0.346, 
    0.289, 0.272, 0.192, 0.193, 0.217, 0.181, 
    0.180, 0.181, 0.176, 0.142, 0.167, 0.134
);
//comb filter delay times, Moorer's recommendation for "good" room
comb_times = (0.050, 0.056, 0.061, 0.068, 0.072, 0.078);

//prcessing blocks

//single er tap
tap(i) = _ @ (samps) * gain
with {
    samps = ba.take(i+1, er_times) * ma.SR;
    gain  = ba.take(i+1, er_gains);
};

//low-pass feedback comb filter
lbcf(dt_sec) = (+ : de.delay(65536, samps)) ~ (*(g) : filter)
with {
    samps = dt_sec * ma.SR;
    //calc feedback gain based on T60
    g = pow(0.001, dt_sec / t60);
    //1-pole lowpass
    filter = _ : (+ : _ * (1-damp)) ~ * (damp);
};

//allpass filter, for final diffusion
apf(dt_sec, g) = (+ <: (de.delay(65536, samps), *(-g))) ~ *(g) : mem, _ : +
with {
    samps = dt_sec * ma.SR;
};
//main arch
process = _ <: (earlyReflections : combBank : allpassChain) :> stereoOut
with {
    //tapped delay line (18 taps)
    //scaled to prevent summing distortion
    earlyReflections = _ <: par(i, 18, tap(i)) :> * (0.15);
    //parallel comb filters (6 combs)
    combBank = _ <: par(i, 6, lbcf(ba.take(i+1, comb_times))) :> _;
    //series allpass (diffusion)
    allpassChain = apf(0.006, 0.7);
    //output
    stereoOut = *(0.9) <: _,_;
};
