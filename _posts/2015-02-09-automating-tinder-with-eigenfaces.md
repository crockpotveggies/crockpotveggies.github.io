---
layout: post
title: Automating Tinder with Eigenfaces
---

While my friends were getting sucked into "swiping" all day on their phones with Tinder, I eventually got fed up and designed a piece of software that <b>automates everything on Tinder</b>.

<div class="well">
  <b>An update on Tinderbox:</b> Well, I didn't think I'd do it. I even wrote in my post that I wouldn't. Nearly a year since I released Tinderbox, I finally decided to take a packaged approach and make the technology more available. I'd like to introduce <a href="http://www.bernie.ai/">Bernie A.I.</a>, a personified artificial intelligence that is the next evolution from this project. Bernie is be a mobile app that brings this to the phone, and you can sign up at <a href="http://www.bernie.ai">http://www.bernie.ai</a>. Although Tinderbox support is completely dropped, Bernie is a better project for me to focus my energy and maintain. Check it out!
</div>

<centter><img src="/uploads/tinderbox_screenshot.jpg" alt="Screenshot of Tinderbox" class="img-responsive thumbnail" /></center>

Since Tinder’s rising popularity, including its use by Olympic athletes such as snowboarder Rebecca Torr, Tinder has achieved critical adoption as a launchpoint for singles meeting singles. Its rising popularity has encouraged a wave of "Tinderbot" inventions by nerds doing things such as "swiping right" for everyone near their location (and of course those pesky spammers). It wasn't my intention to "one-up" the competition, but using the facial recognition algorithm Eigenfaces I built a bot that learns when to swipe right (like a person) AND swipe left (dislike a person) AND start your conversations.

Dubbed "Tinderbox", the first version only took 3 weeks to build. It uses an existing Tinder account and taps into Tinder APIs, which is nice so you don't have to create an entirely new account. Tinderbox recreates the Tinder app in your browser, including the inbox and discovery preferences. The workflow is simple:

+ The built-in bot builds facial models using your likes/dislikes
+ Bot examines profile images, cropping faces
+ Faces are loaded into an "average" face representing choices
+ Eigenfaces are computed from average faces
+ Bot then makes future selections based on Eigenface comparison
+ Comparisons are essentially k-nearest neighbor selection

<center><img src="/uploads/tinderbox_eigenfaces_models.jpg" alt="Tinderbox Eigenfaces" class="img-responsive thumbnail" /></center>

<a href="https://en.wikipedia.org/wiki/Eigenface">Eigenface</a> is a quick and easy algorithm to implement facial recognition without the use of complex software like OpenCV. Tinderbox first extracts faces using the Viola-Jones framework - specifically the <a href="https://github.com/tc/jviolajones">jViolaJones</a> implementation - and converts them to grayscale. Only pictures with single, identifiable faces are used (to filter out false positives). Then after each image is normalized, its pixels are converted into a matrix where they are then appended to a list of models. The models are then averaged into a single face used for future comparison (as noted in the workflow above). The bot requires you to make 60 yes/no choices before it has enough data to choose on your behalf. Then its on full auto-pilot.

If you're interested in the code behind this, here's a snippet of the two main defs for computing Eigenfaces:

<pre>
  /**
   * Computes the EigenFaces matrix using a pixel matrix of multiple images.
   * @param pixelMatrix
   * @param meanColumn
   */
  def computeEigenFaces(pixelMatrix: Array[Array[Double]], meanColumn: Array[Double]): DoubleMatrix2D = {
    val diffMatrix = MatrixHelpers.computeDifferenceMatrixPixels(pixelMatrix, meanColumn)
    val covarianceMatrix = MatrixHelpers.computeCovarianceMatrix(pixelMatrix, diffMatrix)
    val eigenVectors = MatrixHelpers.computeEigenVectors(covarianceMatrix)
    computeEigenFaces(eigenVectors, diffMatrix)
  }

  /**
   * Computes the EigenFaces matrix for a dataset of Eigenvectors and a diff matrix.
   * @param eigenVectors
   * @param diffMatrix
   */
  def computeEigenFaces(eigenVectors: DoubleMatrix2D, diffMatrix: Array[Array[Double]]): DoubleMatrix2D = {
    val pixelCount = diffMatrix.length
    val imageCount = eigenVectors.columns()
    val rank = eigenVectors.rows()
    val eigenFaces = Array.ofDim[Double](pixelCount, rank)

    (0 to (rank-1)).foreach { i =>
      var sumSquare = 0.0
      (0 to (pixelCount-1)).foreach { j =>
        (0 to (imageCount-1)).foreach { k =>
          eigenFaces(j)(i) += diffMatrix(j)(k) * eigenVectors.get(i,k)
        }
        sumSquare += eigenFaces(j)(i) * eigenFaces(j)(i)
      }
      var norm = Math.sqrt(sumSquare)
      (0 to (pixelCount-1)).foreach { j =>
        eigenFaces(j)(i) /= norm
      }
    }
    val eigenFacesMatrix = new DenseDoubleMatrix2D(pixelCount, rank)
    eigenFacesMatrix.assign(eigenFaces)
  }
</pre>

And computing the distance is just as easy:

<pre>
  /**
   * Computes the distance between two images.
   * @param pixels1
   * @param pixels2
   */
  private def computeImageDistance(pixels1: Array[Double], pixels2: Array[Double]): Double = {
    var distance = 0.0
    val pixelCount = pixels1.length
    (0 to (pixelCount-1)).foreach { i =>
      var diff = pixels1(i) - pixels2(i)
      distance += diff * diff
    }
    Math.sqrt(distance / pixelCount)
  }
</pre>

If you're interested learning more about Eigenfaces, <a href="https://dl.dropboxusercontent.com/u/37572555/Github/Face%20Recognition/FaceRecognition.pdf">this paper</a> has a relatively good overview of the math/matrix operations as well as a selection process using k-nearest neighbor. The paper is a description of another Eigenface facial recognition system.

I also added a couple of features that are only in the paid version of Tinder. "Undo" buttons are there in the event a wrong swipe was made or the bot made a poor choice. Also, you can set your location to anywhere in the world for travel or curiosity purposes.

The bot that runs in the background also has a messaging system that starts conversations. Using <a href="http://nlp.stanford.edu/">StanfordNLP</a>, the bot analyzes the sentiment of each chat response and classifies it as positive or negative. Using a "message tree" (see diagram below), the bot selects from pre-programmed chat messages as a response based on the sender's sentiment. This continues up to 3 replies until the user is notified that a chat is ready to enter. The advantage of this? It removes the time involved in filtering new Tinder matches since a lot of people tend to drop off and "go dark" early in the process. Extended conversation is a strong indicator of interest.

<center><img src="/uploads/tinderbox_message_tree.png" alt="Tinderbox Message Tree Example" class="img-responsive thumbnail" /></center>

What are the results so far? The bot is amazingly effective. I would estimate an accuracy of up to 70% in its selections - though there may be a hindsight bias. Using a brand new account, I did a quick test to see how quickly the bot could get results. In 48 hours, the bot registered 21 matches (starting all of those conversations), made 4 extended conversations, and the bot itself made over 300 moves. A "move" is any step the bot makes in either sending a message or making a swipe. And in that time I barely needed to touch the app. I also created a dashboard to give me an overview of my metrics (see screenshot below).

<center><img src="/uploads/tinderbox_dashboard.jpg" alt="Tinderbox Dashboard" class="img-responsive thumbnail" /></center>

What do girls think of the bot? I've gone on at least 10 dates with the help of the bot and I've shown my partners the bot in its entirety. One date literally didn't believe me and thought I was pulling her leg. Another person thought it was really cool and wanted the full tour. All were in agreement that it is *<b>not</b>* creepy, though some felt it was borderline. Kind of nice considering it's not something you'd come across everyday.

Am I still using the bot? I've actually turned it off for now. Admittedly, it worked too well and started to conflict with work. Although in a couple cases I had follow-ups and I'm still seeing one person.

Check out the code online: <a href="https://github.com/crockpotveggies/tinderbox">https://github.com/crockpotveggies/tinderbox</a>. Please feel free to contribute. I don't have current plans to pursue this commercially, though the license allows personal use and modification.