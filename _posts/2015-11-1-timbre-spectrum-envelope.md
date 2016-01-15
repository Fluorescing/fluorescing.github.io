---
layout: post
title: "Timbre: Spectrum and Envelope"
tags: default
---
*This is the first revision of an essay I'm writing about musical timbre.  I chose to write about this topic because I'm interested in being able to simulate instruments on the computer, to be able to produce music on the computer.  To do this, I must understand what differentiates the sound of instruments from one another.  This post is a work in progress, and I will be making changes over time to correct the wording, flow, and prose of the text.*

<div markdown="1" style="text-align: justify">&emsp;For quite some time now, I've wanted to know how instruments are able to have such unique sounds.  I wanted to understand why they all sound different, even if they play the same note.  I've discovered that the key to this concept is the *timbre*.  So what is timbre?  What is the mechanism behind timbre that make each instrument sound truly unique?

&emsp;The timbre is the quality of a musical note that distinguishes one instrument from another<sup>1</sup>, which is exactly what I've wanted to understand.  We can hear the difference between a piano, guitar, flute, or violin even if they all play the same note, so there must be something other than the frequency that makes the sound different; there is.  There are two physical characteristics of the sound of a note that determine the timbre of an instrument: the spectrum and the envelope<sup>1</sup>.

&emsp;If we look at the *spectrum* of a musical note, we would see, not just a single frequency, but many frequencies being expressed at the same time; these are called the *harmonic frequencies*.  Harmonics are a series of frequencies that start with a fundamental frequency and contains frequencies of a positive integer multiple of the fundamental frequency; i.e. \\(f,2f,3f,4f,...,nf\\), where \\(n\\) is a positive integer<sup>2</sup>.  In general, instruments do not have the same amplitude for all harmonics<sup>2</sup>.  One part of an instrument's unique sound is the difference in amplitude of each harmonic.

&emsp;An important property of the harmonic series is that any combination of frequencies from the series creates a periodic signal<sup>2</sup>.  This periodic signal can be any shape that repeats at the fundamental frequency.  Here is an example of the waveform of a flute: [http://hyperphysics.phy-astr.gsu.edu/hbase/music/flutew.html](http://hyperphysics.phy-astr.gsu.edu/hbase/music/flutew.html)---courtesy of the Department of Physics and Astronomy at Georgia State University.  Note that the amplitudes of the harmonics are not all the same, but they are varied.  In the example, the fundamental frequency is the loudest, and the next few frequencies are quieter, but still audible.  

&emsp;Next in our discussion of timbre is the *envelope*.  The envelope of a musical note (or in general, any signal) is a curve that smoothly encloses the oscillations of the note<sup>3</sup>.  It is the amplitude or loudness of the note as a function of time.  For many instruments, there are four distinct stages of the envelope: the attack, the decay, the sustain, and the release; commonly referred to as the ADSR envelope.  

&emsp;The *attack* is the period during which the amplitude quickly increases from silence to loud.  After, there is the *decay*, where the amplitude will start to decay from its peak.  The amplitude does not go to zero just yet, but is held stationary during the *sustain*.  The sustain ends when the *release* happens, and the amplitude drops back down to silence<sup>4</sup>.  

&emsp;The timbre depends greatly on what the envelope is doing<sup>5</sup>.  If say, for example, you were to play a recording of a crab cannon, or musical palindrome, backwards, it would sound different, even though the notes being played remain the same.  It is because the envelope becomes reversed, changing the sound and feel of the instrument.  The UNSW School of Physics has a great demonstration of one such musical piece: [http://www.animations.physics.unsw.edu.au/jw/timbre-envelope.htm<wbr>#sub1](http://www.animations.physics.unsw.edu.au/jw/timbre-envelope.htm#sub1).

&emsp;The sound, feel, texture, and timbre of an instrument thus depends on just the spectrum of the instrument and the envelope is comes with.  In a sense, the spectrum is the content of the note and the envelope packages it up to be presented.

</div> 


*Link to demo: [A Demonstration of Timbre](../../../../../demo/timbre)*

--------

**References:**

1. Wikipedia contributors, "Timbre," Wikipedia, The Free Encyclopedia, 10 October 2015. [Online]. Available: <a href="https://en.wikipedia.org/w/index.php?title=Timbre&oldid=685057075">https://en.wikipedia.org/w/index.php?title=Timbre&oldid=685057075</a>. [Accessed 31 October 2015].
2. School of Physics, "Spectrum, harmonics and timbre," UNSW. [Online]. Available: <a href="http://www.animations.physics.unsw.edu.au/jw/timbre-spectrum.htm">http://www.animations.physics.unsw.edu.au/jw/timbre-spectrum.htm</a>. [Accessed 31 October 2015].

3. C.R. Johnson, Jr., W.A. Sethares, and A.G. Klein, "Software Receiver Design: Build your Own Digital Communication System in Five Easy Steps", Cambridge University Press, 2011. Pages 417-418.

4. Wikipedia contributors, "Synthesizer#ADSR_envelope," Wikipedia, The Free Encyclopedia, 31 October 2015. [Online]. Available: <a href="https://en.wikipedia.org/w/index.php?title=Synthesizer&oldid=688424223#ADSR_envelope">https://en.wikipedia.org/w/index.php?title=Synthesizer&oldid=688424223#ADSR_envelope</a>. [Accessed 1 November 2015]

5. School of Physics, "Spectrum, harmonics and timbre," UNSW. [Online]. Available: <a href="http://www.animations.physics.unsw.edu.au/jw/timbre-envelope.htm">http://www.animations.physics.unsw.edu.au/jw/timbre-envelope.htm</a>. [Accessed 31 October 2015].
