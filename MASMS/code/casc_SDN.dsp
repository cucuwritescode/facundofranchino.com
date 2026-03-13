declare name 		"Cascaded Scattering Delay Network";
declare version 	"1.0.0";
declare author 		"Facundo Franchino";

import("stdfaust.lib");

//controls

t60 = hslider("Decay T60 [s]", 5.0, 0.1, 50.0, 0.1);
damp = hslider("Air Absorption [0-1]", 0.3, 0.0, 0.9, 0.01); 
wet = hslider("Dry/Wet", 0.5, 0, 1, 0.01);

modSpeed = hslider("Wobble Speed", 0.2, 0.0, 3.0, 0.01);
modDepth = hslider("Wobble Depth", 20.0, 0.0, 100.0, 0.1);


//tank data
t(0) = 871; t(1) = 1037; t(2) = 1205; t(3) = 297; t(4) = 467;
t(5) = 884; t(6) = 173;  t(7) = 1456; t(8) = 799; t(9) = 361;
t(10)= 1432; t(11)= 338; t(12)= 186;  t(13)= 1408; t(14)= 1014;
t(15)= 23;   t(16)= 807; t(17)= 501;  t(18)= 1468; t(19)= 1102;
t(20)= 11;   t(21)= 1119; t(22)= 1315; t(23)= 94;   t(24)= 1270;


//components

//5x5 matrix (Safe 0.38)
householder = si.bus(5) <: (si.bus(5), (par(i,5,_):>_ * (0.38) <: si.bus(5))) : ro.interleave(5,2) : par(i,5,-);

//gentle shelf
shelfFilter(g) = _ : fi.lowpass(1, 18000 - (g * 14000));

//diffuser
ap(len) = (+ <: (de.delay(4096, len), *(-0.6))) ~ *(0.6) : mem, _ : +;
diffuser = par(i, 5, ap(223 + (i*50)));


//cascaded stages (dual modulation)

//static stage
stage(offset) = par(i, 5, de.delay(65536, t(offset + i))) : householder;

//modulated stage
//'phase' ensres the two modulated stages never wobble in sync
stageMod(offset, phase) = modLine, par(i, 4, staticLine(i)) : householder
with {
    lfo = os.oscp(modSpeed, phase * 6.28) * modDepth;
    modLine = de.fdelay(65536, t(offset) + lfo);
    staticLine(i) = de.delay(65536, t(offset + 1 + i));
};

//the balanced chain
//first stage, static
//second stage, modulated (phase 0)
//diffuser
//third stage, static
//fourth stage, static
//fifth stage, modulated (phase 0.25,quadrature offset)

cascade = stage(0) : stageMod(5, 0.0) : diffuser : stage(10) : stage(15) : stageMod(20, 0.25);


//main process

process = _,_ <: (*(1-wet), *(1-wet)), (stereoProcess :> _,_ : *(wet), *(wet)) :> _,_
with {
    //input (headroom preserved)
    inputMapper = _,_ : + : *(0.25) <: si.bus(5);
    
    //physics
    avgLoop = 19500 + 2500;
    g_decay = pow(0.001, (avgLoop/ma.SR) / t60);
    
    //tank loop (clean)
    tank = inputMapper : (ro.interleave(5, 2) : par(i, 5, +)) ~ feedbackPath
    with {
        feedbackPath = cascade : par(i, 5, *(g_decay) : shelfFilter(damp) : fi.dcblocker);
    };

    //output mixing (unity gain)
    mix5to2 = route(5, 2, 1,1, 2,2, 3,1, 4,2, 5,1, 5,2);
    stereoProcess = tank : mix5to2 : par(i, 2, *(0.33) : fi.highpass(1, 30));
};