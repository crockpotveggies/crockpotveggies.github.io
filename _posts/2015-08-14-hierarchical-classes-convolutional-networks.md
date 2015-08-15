---
layout: post
title: Hierarchical Categorization and Convolutional Neural Network Troubles
---

I've been taking a stab at computer vision and convolutional neural networks. Interestingly, I discovered a hard-to-solve problem when some classes contained features that indicated to multiple classes.

Although there is a complicated way to engineer the problem out of this - namely Regions with Convolutional Neural Networks and Decision Trees - I wanted to see if it was possible to train a simpler convolutional neural network to understand categorical importance. Using a dataset of profile photos (demo'd here with hilarious mock photos of yours truly) I wanted to classify objects and facial expressions in the photos. In a toy model, I separated my dataset into the following classes:

+ faces with smiles
+ faces with open mouths (excited)
+ faces with glasses
+ faces with sunglasses

<img src="/uploads/convnet_class_set1.jpg" alt="Classes Test Set 1" />

So what's the flaw with the above? Faces that have glasses and sunglasses *can also contain smiles and excitement*. As the human trainer, I know that if the photo contains sunglasses and glasses, I need to categorize that feature as more important than the smile in the photo. Hence, the eyewear features are more important in hierarchy and should lead to that photo being classified as one of the glasses classes.

But, this doesn't happen. Although the glasses classes perform more accurately (though not optimally), the classes containing smiles or excitement are misclassified at a poor rate. It appears that because the glasses classes contain the same features as the facial expression classes, the neural network can't rank the features. This is a big limitation.

<pre>
Testing accuracy: 0.6585365853658537
Accuracy for category 0 [excitement]: 0.5
Accuracy for category 1 [glasses]: 0.8
Accuracy for category 2 [smile]: 0.5882352941176471
Accuracy for category 3 [sunglasses]: 0.75
</pre>

The neural network was trained for 245 epochs and contained the following parameters:

<pre>
layer_defs.push({type:'input', out_sx:64, out_sy:64, out_depth:6});
layer_defs.push({type:'conv', sx:5, filters:32, stride:1, pad:2, activation:'relu'});

layer_defs.push({type:'pool', sx:2, stride:2});
layer_defs.push({type:'conv', sx:5, filters:20, stride:1, pad:3, activation:'relu'});
layer_defs.push({type:'conv', sx:5, filters:20, stride:1, pad:3, activation:'relu'});

layer_defs.push({type:'pool', sx:5, stride:2});
layer_defs.push({type:'conv', sx:5, filters:10, stride:1, pad:3, activation:'relu'});
layer_defs.push({type:'conv', sx:5, filters:10, stride:1, pad:3, activation:'relu'});
layer_defs.push({type:'conv', sx:5, filters:10, stride:1, pad:3, activation:'relu'});

layer_defs.push({type:'pool', sx:2, stride:2});

layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});

// note: softmax automatically adds a fully-connected layer
layer_defs.push({type:'softmax', num_classes: categories});
</pre>

So what happens when we strip out the facial expression classes and introduce a new class that none of them ever contained?

+ faces with glasses
+ faces with sunglasses
+ *faces with tongues sticking out*

<img src="/uploads/convnet_class_set2.jpg" alt="Classes Test Set 2" />

Note here we're using the same neural network parameters and training over 51 epochs - nearly 1/5 of previous training time. What were the results?

<pre>
Testing accuracy: 0.8387096774193549
Accuracy for category 0 [glasses]: 0.8333333333333334
Accuracy for category 1 [sunglasses]: 0.8461538461538461
Accuracy for category 2 [tongue]: 0.8333333333333334
</pre>

A remarkable improvement with much less training time. It's obvious that the network is quickly picking up on the differences when the "tongue class" was introduced. Only a couple of the glasses photos in the dataset actually had a tongue, so the tongue photos are generally mutually exclusive from any of the photos in the glasses classes.

Since I'm still getting familiar with neural networks, I can't draw any immediate conclusions. Usually, the brute force solution to work around this problem is to add more layers and more neurons. This seems inefficient. There may be an opportunity to optimize convolutional networks, though what it requires I don't know. I can say that I'm somewhat disappointed that the network is unable to create its own "taxonomy" of classification - creating a hierachy of decisions and building on that. This may be an opportunity for better engineer convolutional neural networks. If you, the reader, think otherwise I'd be happy to hear from you.
