---
layout: post
title: Automating Tinder with Artificial Intelligence
---

Back in 2014 I built a prototype that automated Tinder for me using Eigenfaces. After an overwhelming response to the project, I put together a team, made the technology accessible to everyone, and bested selection accuracy.

<center><img src="/uploads/bernie_login.jpg" alt="Bernie Dating Assistant | Automate Tinder" class="img-responsive thumbnail" /></center>

<a href="https://itunes.apple.com/us/app/bernie-a.i./id1068738111">Bernie A.I.</a> is the child of countless hours of research, experimentation, and bug fixing. I realized I wasn't the only one who wanted to find a better way of dealing with the overwhelming time it takes to use online dating. I believe there's so much that can be offered by having a wide-open space for singles to meet, and with the right mindset it's possible to make the experience a desirable one.

<center><img src="/uploads/bernd_1.jpg" alt="Bernd Dittrich" class="img-responsive thumbnail" /></center>

For those who don't know the history, Bernie is aptly named after Bernd Dittrich, a dear friend and promising athlete who passed away in 2009 (sorry Bernie Sanders fans!). Dittrich was loved by everyone around him, and we couldn't get enough of his terrible jokes. Bernie was originally from Austria and had moved to Oklahoma to pick up his football career. After moving to Canada to join the Simon Fraser University team (now part of the NCAA), he was just starting to peak in his football career when we lost him. Bernie was a dormmate and practically a roommate, and I'll never forget how loving he was in his own relationship with his girlfriend.

Bernie A.I. relies on latest practices in artificial intelligence and uses convolutional neural networks under the hood. After face-palming over my mistake to use Eigenfaces, I'm completely blown away by the accuracy we're given with neural nets - Bernie reports confidence for swipes averaging in the mid-80%. Just like Tesla autopilot, "undo" actions feed into Bernie help us to further increase his accuracy and customize Bernie for each user.

<h3>1,187,734 total efforts, 99.86% visual accuracy</h3>

We crunched the numbers on Bernie's accuracy using the new neural networks. Out of a sample size of `164,519` "efforts" (actions or events by Bernie) that involved visual selection of profiles, users only reversed Bernie `225` times. That's a total measured accuracy of `99.86%`, although we can safely assume a source of error is our users not reviewing all efforts. Still damn good in my books 💪. To compare to Tinderbox, the prototype only bested around the low-70s and had mixed results. As of writing this post, Bernie has performed a total of `1,187,734` efforts and our users have matched `6,871` times. That's a huge amount of work for a young A.I.!!!

Each Bernie is pre-trained out of the box, so he gets working immediately after sign up. Bernie can get started on limited knowledge, and the more you train Bernie the better he will understand the type of match you want. Better yet, the training times in Bernie have been reduced to `17%` of what it used to take, a tremendous improvement from the early days.

For the more technical readers wondering what we use under the hood, Bernie is trained using <a href="https://github.com/torch/nn" target="_blank">torch/nn</a> and currently uses Torch for per-user customization. We started with OpenFace's implementation and gutted it, introducing our own models and workflows. We're in the process of migrating to a Java and native solution via <a href="http://deeplearning4j.org" target="_blank">Deeplearning4j</a>. DL4J gives us an advantage over Torch where we get both native (C++) N-Dimensional Array operations and be able to execute those solutions in an environment we're very familiar with: Java Virtual Machine (almost everything else about Bernie is JVM-based). DL4J also allows the opportunity to compile its binaries so that they're optimized for the machine, which is a concern for us as we scale Bernie.

<center><img src="/uploads/bernie_settings.jpg" alt="Bernie Settings | Automate Tinder Happn" class="img-responsive thumbnail" /></center>

Bernie does everything the Tinderbox prototype did, and more. Bernie brings a more personified, human experience to online dating by summarizing in conversational language, and we leave the graphs and charts and stats to the background. Bernie still opens conversations with fun and random questions, and within a couple months time we'll be turning on the ability for Bernie to start a conversation based on the context of a match's profile picture. We already know that matches who receive contextual introductory messages are much more likely to respond, and we're doing everything we can to make this perfect.

<center><img src="/uploads/bernie_efforts.jpg" alt="Bernie Dating Assistant | Automate Happn" class="img-responsive thumbnail" /></center>

Most of all, Bernie is more <em>accessible</em>. Bernie's mobile app has much more to offer than the Tinderbox prototype's web interface, and the Bernie team is working non-stop behind the scenes to keep features updated and ensure his algorithms are performing exactly as expected. Bernie reports his history via his "efforts", where some efforts have the ability to be "undone". We've made the settings much more straightforward with abilities to turn certain features off with the flip of a switch.

The burning question is, did I solve my own problem? The answer is a resounding yes. In the interest of privacy of my relationship, I won't be publishing too many details on the blog but I will leave you with a picture of myself with the most beautiful woman in the world... 😉

<center><img src="/uploads/bernie_justinlove.jpg" alt="Bernie Dating Assistant | Justin in Love" class="img-responsive thumbnail" /></center>

I couldn't be more excited by Bernie to see where he goes next. There's much more in the pipe to make him better, and the team and I are only just getting started...