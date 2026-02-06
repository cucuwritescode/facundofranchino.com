declare name "NestedKeith";
declare version "1.0";
declare author "K. Barr, Facundo Franchino";
declare description "nested allpass loop reverb based on Alesis hardware architecture";
import("stdfaust.lib");
//some utility functions first

//a hardcoded list of prime numbers
//these are used for delay lengths to prevent resonant ringing
prime_list = (
    113, 127, 139, 181, 263, 
    347, 449, 563, 673, 797, 
    907, 1013, 1123, 1237, 1361, 
    1481, 1597, 1721, 1847, 1973
);
//helper to get a prime from our list
get_prime(i) = ba.take(i+1, prime_list);

//an lfo section
//lfo controls
lfoSpeed = hslider("LFO Speed [unit:Hz]", 0.5, 0.0, 5.0, 0.01) : si.smoo;
lfoDepth = hslider("LFO Depth [unit:samps]", 10, 0, 50, 0.1) : si.smoo;

//the lfo signal itself (sine)
lfo = os.osc(lfoSpeed) * lfoDepth;

//the modulated allpass filter
//we use 'de.fdelay' (fractional delay) here.
//standard 'de.delay' snaps to integers, which sounds bad when modulating.
allpass(N, n, g) = (+ <: (de.fdelay(N, n-1+lfo), *(g))) ~ *(-g) : mem, _ : +;

//A "section" consists of 2 allpasses in series + 1 delay
//this creates a dense smear of the sound
section(n1, n2) = allpass(65536, n1, 0.5) : allpass(65536, n2, 0.5) : de.delay(65536, n1+n2);

//main reverb arch
//build the chain of sections using sequence
//this creates the "big loop" Barr describes
//input 'x' is injected into the start of the chain.
procMono(x) = x : (+ : chain) ~ feedback_path :> _
with {
    //5 sections in series
    chain = seq(i, 5, section_wrapper(i, x));
    
    //helper to calculate delay times for the i-th section
    section_wrapper(i, input_sig) = _ : section(p1, p2) <: input_helper
    with {
        //calculate indices roughly, 100 + 10*2^i
        //we map these to our prime_list
        idx_base = i * 2; 
        p1 = get_prime(idx_base);
        p2 = get_prime(idx_base + 1);
        
        //this is basically the recursive "tap", we pass the result to the next stage
        //AND we mix in the original input 'x' again!!!
        input_helper(signal_from_prev) = signal_from_prev + input_sig; 
    };
    //the feedback path (global feedback)
    //taps the end of the chain and sends it back to the start
    feedback_path = _ : section(get_prime(10), get_prime(11)) : *(feedback_slider);
};

//ui control
feedback_slider = hslider("Feedback", 0.5, 0.0, 0.99, 0.01) : si.smoo;

//split stereo input to 2 mono reverbs (stereo processing)
process = _ <: par(i, 2, procMono) :> _,_;