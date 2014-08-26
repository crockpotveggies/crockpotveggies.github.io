---
layout: post
title: Reviewing the (now) ancient Graph, Jung
---

At 3 Tier Logic I've been building a prototype for a future product behind the scenes, and to demonstrate some of the concepts I actually went with a Graph that is now becoming a little outdated: Jung. 

Jung is an interesting project that, although it last saw love in 2010, was very helpful in demonsrating a proof of concept. It's last major version upgrade bumped it to version 2 and it seems that the original contributors have since abandoned the project. However, it's possible it was abandoned due to the reason that it is a very mature Java library. The only additional development I'd consider is parallelizing many of its operations and finding ways to make it scale with ease.

Jung has a full suite of algorithms that are available in sub-projects. It also has a very interesting visualization library that is meant for Java applets - something I did not use. However given its maturity and Java backbone, I found it very performant for smaller graphs.

<img src="/uploads/junggraph.png">

I was able to produce graphs such as the one above in less than a second, and also use advanced Importance algorithms on the same graph in a similar tolerable performance: averaging 0.5 seconds for PageRank across all nodes. Another blogger was very nice enough to put together <a href="http://daniele-quercia.blogspot.ca/2009/02/importance-algorithms-by-jung.html" target="_blank">this detailed page</a> explaining the usage of each algorithm. In true Java fashion you have to call additional methods after initializing your algorithm to get them to work. I'm still unsure whether I liked this style or not.

Unlike some other open-source graph libraries, Jung allows you to easily set your own custom types. I found coding these APIs just as easy in Scala as compared to Java.

<pre>
  /**
   * factory method for new graphs
   * @return a DirectedSparseMultigraph that uses UserVertex for nodes and RelationshipEdge for edges
   */
  def graphFactory: DirectedSparseMultigraph[UserVertex, RelationshipEdge] = {
    new DirectedSparseMultigraph[UserVertex, RelationshipEdge]()
  }
</pre>

Some caveats that were a bummer, meaning I could not put it into production:

+ Jung is not parallelized in the backend or on some advanced algorithms
+ Many complex algorithms, including Markov Centrality, result in OutOfMemory errors with more than 3,000 nodes and 4GB of allocated heap
+ Productionizing Jung would require a very large machine given the above

At 3 Tier Logic we're still eyeing a distributed Graph such as Titan to solve some of our problems, but in the meantime I'll still be tinkering a little more with Jung. My full compliments to its developers, it's come a long way since v1.