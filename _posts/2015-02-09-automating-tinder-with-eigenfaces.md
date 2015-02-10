---
layout: post
title: Automating Tinder with Eigenfaces
---

While my friends were getting sucked into "swiping" all day on their phones with Tinder, I eventually got fed up and designed a piece of software that <b>automates everything on Tinder</b>.

<img src="/uploads/tinderbox_screenshot.jpg" alt="Screenshot of Tinderbox">

Since Tinder’s rising popularity, including its use by Olympic athletes such as snowboarder Rebecca Torr, Tinder has achieved critical adoption as a launchpoint for singles meeting singles. Its rising popularity has encouraged a wave of "Tinderbot" inventions by nerds doing things such as "swiping right" for everyone near their location (and of course those pesky spammers). It wasn't my intention to "one-up" the competition, but using the facial recognition algorithm Eigenfaces I built a bot that learns when to swipe right (like a person) AND swipe left (dislike a person) AND start your conversations.

Dubbed "Tinderbox", the first version only took 3 weeks to build. It uses an existing Tinder account and taps into Tinder APIs, which is nice so you don't have to create an entirely new account. Tinderbox includes a desktop recreation of the Tinder app, including the inbox and disovery preferences. The workflow is simple:

+ The built-in bot builds facial models using your likes/dislikes
+ Bot examines profile images, cropping faces
+ Faces are loaded into an "average" face representing choices
+ Eigenfaces are computed from average faces
+ Bot then makes future selections based on Eigenface comparison
+ Comparisons are essentially k-nearest neighbor selection

<img src="/uploads/tinderbox_eigenfaces_models.jpg" alt="Tinderbox Eigenfaces">

<a href="https://en.wikipedia.org/wiki/Eigenface">Eigenface</a> is a quick and easy algorithm to implement facial recognition without the use of complex software like OpenCV. Tinderbox first extracts faces using the Viola-Jones framework - specifically the <a href="https://github.com/tc/jviolajones">jViolaJones</a> implementation - and converts them to grayscale. Only pictures with single, identifiable faces are used (to filter out false positives). Then after each image is normalized, its pixels are converted into a matrix where they are then appended to a list of models. The models are then averaged into a single face used for future comparison (as noted in the workflow above). The bot requires you to make 60 yes/no choices before it has enough data to choose on your behalf. Then its on full auto-pilot.

If you're interested learning more about Eigenfaces, <a href="https://dl.dropboxusercontent.com/u/37572555/Github/Face%20Recognition/FaceRecognition.pdf">this paper</a> has a relatively good overview of the math/matrix operations as well as a selection process using k-nearest neighbor. The paper is a description of another Eigenface facial recognition system.

I also added a couple of features that are now in the paid version of Tinder. For example, I have added an "undo" button in the event that a wrong swipe was made or the bot made a poor choice. Additionally, Tinderbox allows you to set your location to anywhere in the world for travel or curiosity purposes.

The bot that runs in the background also has a messaging system that starts conversations. Using <a href="http://nlp.stanford.edu/">StanfordNLP</a>, the bot analyzes the sentiment of each chat response and classifies it as positive or negative. Using a "message tree" (see diagram below), the bot selects from pre-programmed chat messages as a response based on the sender's sentiment. This continues up to 3 replies until the user is notified that a chat is ready to enter. The advantage of this? It removes the time involved in filtering new Tinder matches since a lot of people tend to drop off and "go dark" early in the process. Extended conversation is a strong indicator of interest.

<img src="/uploads/tinderbox_message_tree.png" alt="Tinderbox Message Tree Example">

What are the results so far? The bot is amazingly effective. I would estimate an accuracy of up to 70% in its selections - though there may be a hindsight bias. Using a brand new account, I did a quick test to see how quickly the bot could get results. In 48 hours, the bot registered 21 matches (starting all of those conversations), made 4 extended conversations, and the bot itself made over 300 moves. A "move" is any step the bot makes in either sending a message or making a swipe. And in that time I barely needed to touch the app. I also created a dashboard to give me an overview of my metrics (see screenshot below).

<img src="/uploads/tinderbox_dashboard.jpg" alt="Tinderbox Dashboard">

What do girls think of the bot? I've gone on at least 10 dates with the help of the bot and I've shown my partners the bot in its entirety. One date literally didn't believe me and thought I was pulling her leg. Another person thought it was really cool and wanted the full tour. All were in agreement that it is *<b>not</b>* creepy, though some felt it was borderline. Totally understandable, especially since it is not something you'd come across everyday.

Am I still using the bot? I've actually turned it off for now. Admittedly, it worked too well and started to conflict with work. Although in a couple cases I had follow-ups and I'm still seeing one person.

Check out the code online: <a href="https://github.com/crockpotveggies/tinderbox">https://github.com/crockpotveggies/tinderbox</a>. Please feel free to contribute. I don't have current plans to pursue this commercially, though the license allows personal use and modification.