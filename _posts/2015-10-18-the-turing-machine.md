---
layout: post
title: The Turing Machine
tags: default
---
&emsp;*I wrote this essay as practice after not having written anything longer than a paragraph in quite some time.  So forgive me if I have left in any glaring mistakes in my writing.*

&emsp;I'm writing this to help explain a difficult concept.  It is a concept I have occasionally brought up to friends in the past, much to their apparent chagrin.  The Turing Machine; a machine, that when mentioned, may cause some eyes to glaze over.  So I will try to fix this by explaining in detail what the Turing machine is from a historical perspective; as opposed to a mathematical perspective.  First I must mention the person for whom this machine is named: Alan Turing---mathematician, cryptanalyst, and pioneering computer scientist.

{% include image.html url="/img/notes/alan-turing.jpg" description="Alan Turing." width="50%" %}

&emsp;Years before helping the Allied forces crack the Nazi's cryptography codes, during the summer of 1935; Alan Turing was on his usual run along the Ely River.  He stopped to rest after a couple of miles, to lie down among the apple trees and think.  While lost in thought, he envisioned a single mechanical process which could solve almost any mathematical problem<sup>1</sup>.He called it the Logical Computing Machine.  It would be his rigorous mathematical formalism of the machine that would make a huge impact on the burgeoning field of Computer Science.  

&emsp;The Logical Computing Machine---also known as the Turing Machine---was officially introduced in his 1937 paper, "On Computable Numbers, with an Application to the Entscheidungsproblem."  The paper used the Turing Machine to tackle the Entscheidungsproblem---German for "decision problem."  The Entscheidungsproblem was a challenge posed by one of the most influential mathematicians of the 19th and early 20th centuries, David Hilbert.  It challenged other mathematicians to find a special algorithm; an algorithm that could answer "Yes" or "No" to whether a given statement of first-order logic is universally valid.  To put it another way, the challenge asked for a way to determine whether or not a logical statement is provable from using just the axioms---established truths of the world<sup>2</sup>.

&emsp;This alone would make an interesting topic to discuss.  If a solution were to actually be found, it could be used to solve any logically written problem in the world, no matter what the problem is.  It would also imply that no problem is unsolvable; of those that could be written in logical form.  

&emsp;Not only has no generic problem solving algorithm been found, but it has ironically been proven unsolvable.  Alan Turing was not the only mathematician that proved the Entscheidungsproblem unsolvable; Alonzo Church---another influential mathematician---proved it independently using Lambda Calculus a little before Turing did.  The insolvability of the problem is known as the Church-Turing thesis.  But how does this all apply to the Turing Machine?  How did it relate to insolvability of the Entscheidungsproblem?

{% include image.html url="/img/notes/turing-model.jpg" description="A physical implementation of a Turing machine<sup>3</sup>." width="75%" %}

&emsp;The Turing Machine, as Turing imagined it, is a machine that contains an unlimited length of paper tape.  This paper tape can contain symbols or colors within squares.  Above the tape sits the head of the machine, similar to the head of a cassette player.  The head can erase, read, or write symbols on the tape.  Or it can move the tape to the left or right.  The head also contains what is known as state---the current status or short-term memory of the machine.  A set of instruction, or rules, would be given to the head to tell it what to do depending on its state and the symbol being read.

&emsp;This machine, like its modern computer descendent, can compute numbers and solve mathematical problems.  "Any real number that was defined by a math rule could be calculated by the Logical Computing Machine.  Even an irrational number such as &pi; could be calculated indefinitely using a finite table of instructions"<sup>1</sup>.  It can do anything that a modern computer can do; such as computing artificial intelligence.  But there are some problems even the Turing machine can't solve.

&emsp;The Halting Problem, discussed in Turing's paper, is the problem of determining, from a description of any arbitrary computer program and its input, whether the program will finish running or continue on forever<sup>4</sup>.  It simply asks for a "Yes" or "No" response to the question of whether an algorithm with arbitrary inputs will ever finish.  This would be extremely helpful for programmers if a solution were to be found.  It would mean that a computer could automatically check for infinite loops---which are not good when unplanned.  It could save plenty of time for programmers while debugging software.  But of course, like the Entscheidungsproblem, this too would be too good to become true.

&emsp;In his paper, Turing shows that the Halting Problem is unsolvable.  It is impossible to know exactly when an algorithm will stop without running it first.  Further still, it is impossible to always know if algorithm will stop.  With the help of the Turing Machine, he was able to relate the Halting Problem to the Entscheidungsproblem.

&emsp;Turing showed that the Halting Problem should have been one of the problems solvable by the Entscheidungsproblem algorithm.  Since the Halting Problem cannot be solved, neither can the Entscheidungsproblem.  But this is only one of several important outcomes of Turing's paper, which initially got little notice<sup>1</sup>.  Other important concepts came out of the Turing Machine, such as Turing Equivalence and Turing Completeness.  This is where the similarities between the Turing Machine and modern computers become formally apparent.  

{% include image.html url="/img/notes/lego-turing.jpg" description="A physical implementation of a Turing machine built using Legos<sup>5</sup>." width="75%" %}

&emsp;Fast forwarding to modern day, we now have many different types of computing machines---or devices.  We have PCs, servers, calculators, video game consoles, smart phones, and many integrated computers in things from watches to satellites.

&emsp;We can take any two machines; we'll call them machine A and machine B.  If machine A can emulate machine B, and vice versa, then machines A and B are Turing Equivalent.   For example, if a PC can emulate a video game console, and a video game console can emulate a PC, then they are Turing Equivalent.  One real world example of this that I've seen with my own eyes is with a Windows PC and the Playstation Portable (PSP).  It is possible to emulate a PSP in Windows.  It is also possible to emulate a PC running Windows on the PSP.  Therefore, the Windows PC and PSP are both Turing Equivalent.

&emsp;Getting back to the Turing Machine, if a machine was Turing Equivalent with the Turing Machine itself, then that machine is Turing Complete.  Said machine would be capable of all that the Turing Machine is capable of, and nothing more.  This can also apply to modern computer languages, such as Python, C++, and Brainfuck---all of which are Turing Complete.  We can say a computer language is Turing Complete if it can be used to emulate a Turing Machine, and vice versa.  It implies that that computer language can compute and solve any problem the Turing Machine can solve.  It demonstrates the full set of abilities a computer language can utilize.

&emsp;The Turing Machine remains a key topic in Computer Science, alongside the concept of Turing Equivalence and Turing Completeness.  New computer languages and machines are often initially tested to check if they are Turing Complete.  Alan Turing, the man who created the Turing machine, would go on to help the Allied forces win World War II.  But it would be his theoretical machine and related concepts that would help to usher in the information age.

--------

**References:**

1. W. Isaacson, *The Innovators: How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution* (Simon and Schuster, New York, NY, 2014).
2. Wikipedia contributors, "Entcheidungsproblem," [https://en.wikipedia.org/w/index.php?title=Entscheidungsproblem&oldid=665868942](https://en.wikipedia.org/w/index.php?title=Entscheidungsproblem&oldid=665868942) (2015), \[Online; accessed September 7, 2015\].
3. GabrielF, "File:model of a turing machine.jpg," [https://en.wikipedia.org/wiki/File:Model_of_a_Turing_machine.jpg](https://en.wikipedia.org/wiki/File:Model_of_a_Turing_machine.jpg) (2012), \[Online; accessed October 10, 2015\].
4. Wikipedia contributors, "Halting problem," [https://en.wikipedia.org/w/index.php?title=Halting_problem&oldid=675276180](https://en.wikipedia.org/w/index.php?title=Halting_problem&oldid=675276180) (2015), \[Online; accessed September 7, 2015\].
5. RubENS Project, "Galerie," [http://rubens.ens-lyon.fr/fr/gallery/](http://rubens.ens-lyon.fr/fr/gallery/) (2012), \[Online; accessed October 10, 2015\].