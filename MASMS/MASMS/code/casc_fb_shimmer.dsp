declare name        "Cascaded Feedback Shimmer Algorithm";
declare version     "1.0";
declare author      "Facundo Franchino";

import("stdfaust.lib");

//user controls

//pre-delay section (tape style)
//creates discrete echoes before the reverb bloom.
echoTime = hslider("[1]Echo Time [ms]", 500, 0, 1000, 1) : si.smoo;
echoFbk  = hslider("[1]Echo Feedback [0-1]", 0.4, 0.0, 0.9, 0.01);

//reverb physics
//t60, how long it takes for the sound to decay by 60db
//damp, absorbs high frequencies in the tail (simulation of air absorption)
t60      = hslider("[2]Decay T60 [s]", 10.0, 0.1, 60.0, 0.1);
damp     = hslider("[2]Air Absorption [0-1]", 0.4, 0.0, 0.9, 0.01); 

//shimmer controls
//injects pitch-shifted signal back into the loop.
//scale the max gain to 0.2 to prevent the feedback loop from "exploding"
shimmerMix = hslider("[3]Shimmer Mix [0-1]", 0.0, 0.0, 1.0, 0.01) * 0.2; 
pitchShift = hslider("[3]Shift [semitones]", 12, -12, 24, 1) : si.smoo;

//output equaliser
//a console-style eq to sculpt the final wet tone
lowShelf   = hslider("[4]Low Shelf [dB]", 0.0, -20, 10, 0.1);
lowFreq    = hslider("[4]Low Freq [Hz]", 150, 50, 500, 1);
highShelf  = hslider("[4]High Shelf [dB]", -2.0, -20, 10, 0.1);
highFreq   = hslider("[4]High Freq [Hz]", 6000, 2000, 15000, 1);

//global settings
wet      = hslider("[5]Dry/Wet", 0.5, 0, 1, 0.01);
//modulation adds movement to the tail to prevent metallic ringing
modSpeed = hslider("[5]Wobble Speed", 0.2, 0.0, 3.0, 0.01);
modDepth = hslider("[5]Wobble Depth", 20.0, 0.0, 100.0, 0.1);

//DSP components

//simple feedback delay. the right channel is offset by 1% to create stereo width
tapeDelay = (pathL, pathR)
with {
    maxDel = 48000; 
    delSamps = echoTime * (ma.SR/1000);
    pathL = (+ : de.fdelay(maxDel, delSamps)) ~ (*(echoFbk));
    pathR = (+ : de.fdelay(maxDel, delSamps * 1.01)) ~ (*(echoFbk)); 
};

//standard low and high shelf filters for tonal shaping
consoleEQ = fi.low_shelf(lowShelf, lowFreq) : fi.high_shelf(highShelf, highFreq);

//uses windowed delay lines to pitch shift the audio in real-time
//we use a locked tuning here (no prev detune blur idea) to make sure loop stays in key
shimmerEngine = _ <: (shiftA, shiftB) :> _
with {
    window = 4096; xfade  = 2048;
    shiftA = ef.transpose(window, xfade, pitchShift);
    shiftB = ef.transpose(window, xfade, pitchShift);
};

//hard clips the signal if it exceeds -6db inside the shimmer loop
safetyLimit = max(-0.5) : min(0.5);

//cascaded topology setup

//a list of 25 prime numbers for delay lengths
//using primes prevents resonant frequencies from stacking up and thus getting a metallic sound
t(0) = 871; t(1) = 1037; t(2) = 1205; t(3) = 297; t(4) = 467;
t(5) = 884; t(6) = 173;  t(7) = 1456; t(8) = 799; t(9) = 361;
t(10)= 1432; t(11)= 338; t(12)= 186;  t(13)= 1408; t(14)= 1014;
t(15)= 23;   t(16)= 807; t(17)= 501;  t(18)= 1468; t(19)= 1102;
t(20)= 11;   t(21)= 1119; t(22)= 1315; t(23)= 94;   t(24)= 1270;

//mixing matrix (householder)
//this scatters energy between the 5 channels without adding or losing volume
householder = si.bus(5) <: (si.bus(5), (par(i,5,_):>_ * (0.38) <: si.bus(5))) : ro.interleave(5,2) : par(i,5,-);


//cut high frequencies in the feedback loop
shelfFilter(g) = _ : fi.lowpass(1, 18000 - (g * 14000));

//allpass diffuser
//smearing filter that increases echo density
ap(len) = (+ <: (de.delay(4096, len), *(-0.6))) ~ *(0.6) : mem, _ : +;
diffuser = par(i, 5, ap(223 + (i*50)));

//topology stages
//the following is a bank of 5 parallel delays followed by a mixer
stage(offset) = par(i, 5, de.delay(65536, t(offset + i))) : householder;

//add lfo modulation to the delay lines for chorusing
stageMod(offset, phase) = modLine, par(i, 4, staticLine(i)) : householder
with {
    lfo = os.oscp(modSpeed, phase * 6.28) * modDepth;
    modLine = de.fdelay(65536, t(offset) + lfo);
    staticLine(i) = de.delay(65536, t(offset + 1 + i));
};

//cascade chain
//the signal flows through 5 stages in series before recirculating
//this creates massive echo density very quickly
cascade = stage(0) : stageMod(5, 0.0) : diffuser : stage(10) : stage(15) : stageMod(20, 0.25);


//main process
process = _,_ <: (*(1-wet), *(1-wet)), (stereoProcess :> _,_ : *(wet), *(wet)) :> _,_
with {
    //input processing
    //apply pre-delay, then sum to mono and distribute to 5 channels
    //we attenuate by 0.25 to leave headroom for resonance
    inputChain = _,_ : tapeDelay : (+ : *(0.25) <: si.bus(5));
    
    //calculate decay coefficient based on total loop time
    avgLoop = 19500 + 2500;
    g_decay = pow(0.001, (avgLoop/ma.SR) / t60);
    
    //the main reverb tank
    tank = inputChain : (ro.interleave(5, 2) : par(i, 5, +)) ~ feedbackLogic
    with {
        feedbackLogic = cascade : feedbackSplit;
        
        //feedback split logic
        //first path is normal reverb decay
        //second path is shimmer injection, (pitch shifted & reinjected)
        feedbackSplit(c1,c2,c3,c4,c5) = 
            (c1,c2,c3,c4,c5 : par(i, 5, *(g_decay) : shelfFilter(damp))),
            
            //shimmer path
            //sums channels, shifts pitch, filters out mud/fizz, and reinjects
            (c1,c2,c3,c4,c5 :> *(shimmerMix) : shimmerEngine : safetyLimit 
             : fi.lowpass(1, 3500) : fi.highpass(1, 200) <: si.bus(5))
             
            : ro.interleave(5, 2) : par(i, 5, +); 
    };
    
    //output processing
    //mix 5 internal channels down to stereo
    //apply final eq
    mix5to2 = route(5, 2, 1,1, 2,2, 3,1, 4,2, 5,1, 5,2);
    stereoProcess = tank : mix5to2 : par(i, 2, *(0.33) : consoleEQ);
};