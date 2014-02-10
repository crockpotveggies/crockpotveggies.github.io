---
layout: post
title: Pathmax - Analyzing Distributions with Scala
---

Last year I began undertaking the massive build of Platform3. This was to be a new platform that would flagship 3 Tier Logic. I was working with two other programmers and we knew we had to teach ourselves some new skills fast so we could support the data analysis that we promised. At home, I began playing with different Scala math libraries and found an interesting number problem: lottery numbers.

I built Pathmax as a standalone Play! application to load lottery data from the Lotto649 website and save it to a local Riak instance. I wanted to be able to analyze the distributions of numbers and also look at probabilities of numbers appearing after each other. I also wanted an easy-to-use interface so if I wanted to build on the app later I could easily modify it.

<img src="/uploads/pathmax_screenshot.png" class="thumbnail col-md-12">

I wrote multiple functions that allowed me to look for patterns in the data. I specifically wanted to calculate probabilities of numbers repeating themselves. It was my goal to then use these probabilities to help me make picks in lottery numbers and then develop an algorithm. I haven't yet had the time to produce the algorithm, but testing did prove interesting!

<img src="/uploads/pathmax_screenshot2.png" class="thumbnail col-md-12">

I ran three test runs, and broke even with each lottery pick. It's a rather unusual event, but I did catch a couple of interesting properties of the game:

+ <b>Picks are random</b>. No way to fully predict lottery numbers using the standard "ball machines".
+ <b>Columns have distributions</b>. Lottery numbers broken down by column have clear patterns, which can assist with picks.
+ <b>Reminds me of Simpson's Paradox</b>. Very significant distributions are observable in the first and last columns.

I ended up diving heavily back into development of Platform3 and will continue work on Pathmax in the near future. However, here are some very helpful Scala libraries that I found for future inclusion and code inspiration:

+ <b>Probability Monad</b>. https://github.com/jliszka/probability-monad
+ <b>Malakov</b>. https://github.com/runarorama/Malakov
+ <b>Breeze</b>. https://github.com/scalanlp/breeze  
