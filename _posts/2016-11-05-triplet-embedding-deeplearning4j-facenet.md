---
layout: post
title: Triplet Embeddings in Deeplearning4j - Adapting FaceNet
---

Inspired by Google's FaceNet project and OpenFace (and some help of Skymind.io), I implemented a java-based verion of triplet embeddings for the purpose of better computer vision at Bernie AI.

<center>
  <img src="/uploads/triplet_facedetection.jpg" alt="Facial Landmarks Face Detection" class="img-responsive thumbnail" />
  <br><small>An example of facial landmark detection</small>
</center>

Thanks to the help of [Alex Black](https://github.com/alexdblack), one of Skymind's most knowledgeable engineers, I was able to write an implementation of triplet embeddings for [Deeplearning4j](https://deeplearning4j.org/) and create a variant of FaceNet for [Bernie AI](http://www.bernie.ai/). This work was prompted by performance issues from our fork of OpenFace to add a custom image pipeline, and a desire to continue improving the accuracy of facial comparisons for our users. As Bernie grew, the combination of Python and LUA became troublesome and we saw resource lock-ups - our fork was not meant to develop high-concurrency mmicroservices. Hence, it was time to port our facial comparison service to the JVM.

If you haven't read [the FaceNet Paper](https://arxiv.org/abs/1503.03832), it revealed a very interesting usage of neural network embeddings for the purpose of generating a representation of an input (in this case, a face). In simple terms, embeddings are mappings of relationships in data passed through a neural network. Word2Vec is an excellent example of using embeddings to map the relationships between words and use them for clustering, classification, and comparison. For the purpose of FaceNet, the embeddings are a mapping of facial features.

<center>
  <img src="/uploads/triplet_trainingloss.png" alt="Triplet Training Loss" class="img-responsive thumbnail" />
  <br><small>Illustrative example of triplet training loss via <a href="http://reports-archive.adm.cs.cmu.edu/anon/2016/CMU-CS-16-118.pdf" target="_blank">OpenFace paper</a></small>
</center>

To properly train a neural network to create vision embeddings, you must split your data into triplets before passing through a network (there are also other ideas such as [center loss](http://ydwen.github.io/papers/WenECCV16.pdf) that I won't describe here). This involves passing three examples through the neural network, and examining the "loss" at the end. 3 images are passed, where the first *x* is the anchor class, and *x+* is a positive example of that image, and *x-* is a negative example of that image. This leads to 2D representations of each image placed on a hypersphere, and each subsequent representation can be compared, linearly. You no longer have to re-train the neural network in order to identify new objects or faces.

<center>
  <img src="/uploads/triplet_embeddingmodel.jpg" alt="DL4J Triplet Embeddings" class="img-responsive thumbnail" />
  <br><small>Diagram of DL4J Triplet Embedding Model</small>
</center>

What's special about the implementation for Deeplearning4j is that the pieces required for loss calculation are more modular, and the vertices we created for DL4J's `ComputationGraph` can be re-used for other setups. The implementation is JVM - a breath of fresh air when doing research and production implementations in the same language (portability!). In the immediate future I hope to use triplet embeddings to discover the differences between objects and find a way to speed up identification of scene markers for our context detection at Bernie.

I'm in the process of finishing up a [FaceNet variant](https://github.com/crockpotveggies/dl4j-model-z/blob/64038526dcecfefe4adfd37fb5116e450596346e/src/main/java/org/deeplearning4j/FaceNetVariant.java) on my Github which I will merge into the DL4J model zoo in hopes that others can also explore and use the work. Many thanks to Alex Black, the [Skymind team](https://skymind.io/), and brief feedback from [Brandon Amos](https://bamos.github.io/) for their help on this implementation.