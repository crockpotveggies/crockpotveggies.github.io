---
layout: post
title: Scala's Nifty Parallelization
---

Scala has a nifty hidden feature that helps processing large collections without creating a complex actor system to deal with it all.

If you are taking a large collection that is at least 50,000 members long odds are you will find performance issues when trying to do a simple map operation. You can fix this by calling <code>.par</code> to turn it into a parallelized collection.

Import <code>scala.collection.parallel._</code> and you will also import the default thread executor. Very important: parallelization is not ideal if the order of the collection matters to you.

Here's a sample that also uses task support to boost the number of threads to 8.

<pre>
val list = (1 to 50000)
val parList = list.par 
parList.tasksupport = new ForkJoinTaskSupport(new scala.concurrent.forkjoin.ForkJoinPool(8))
parList.map{ _ * 2 }.toList
</pre>

Above you'll see that I call <code>.toList</code> to convert the collection back to a normal collection. This built-in parallelization is one of my favorite features of Scala.