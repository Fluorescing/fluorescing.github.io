---
layout: post
title: Did I code this?
tags: default
---
<div markdown="1" style="text-align: justify">&emsp;A couple of days ago, while thinking of something to write, I remembered a virtual optics simulation I created back in early 2011.  I thought about posting it; but before that, I decided to check over my code to ensure that I actually did program it correctly.  I ran into an issue, however: I couldn't understand what my code was doing.

&emsp;Now, it is typically bad to have illegible code, but it wasn't exactly illegible, nor did I forget to put comments.  Also to keep in mind, the results appeared to be correct, as the visuals of the simulation matched the actual experiment.   It was the way I went about calculating the scenario.

&emsp;The scenario was a simulation of Optical Activity, or the rotation of light within a medium.  In this case, it was a simulation of light passing through a bottle of corn syrup between two linear polarizers.  Rotating the polarizer nearest the viewer would show the rainbow-like colors that one would expect from the actual experiment.  

&emsp;So it would have been an awesome little demo to post here.  However, I wanted to talk about how it worked, and I forgot about the method I used.  If I were to recreate it today, my intuition would have been to use Jones Calculus---matrix calculations for optics---to compute the expected result.  I, instead, used an obscure method from my Optics textbook (that I've since found again) to compute the results.

&emsp;I really did get the sense that I did not write this code initially.  It had been years and it didn't even look like my coding style.  But the simulation appears to be correct, and I'm still thinking about posting it once I rewrite it using math.js (a mathematics library for Javascript), to simplify the code.  Expect it soon.

### Update 1 (23 Oct 2015)

&emsp;Going over the code in depth, I've discovered that the fact it worked correctly was a fluke.  There were small little errors that had no effect on overall results.  They have been fixed and simplified, and the demo has been posted to [here](../../../../../demo/syrup/syrup.html).  Also, I've discovered that math.js is quite slow compared to what I've been using, so I'm not switching over.
</div>