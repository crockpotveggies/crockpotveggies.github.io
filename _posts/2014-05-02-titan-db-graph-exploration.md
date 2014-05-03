---
layout: post
title: Graph Exploration with Titan DB
---

At <a href="http://3tierlogic.com/">3 Tier Logic</a> we've completely redefined a new approach to the way we mine data. 

Our Product Team has quickly realized we pigeon-holed ourselves by siloing our data into two distinctive datasets, which in the end has become painful to merge, grow, and experiment. This is not how we intended to work with complex relationships, and we're not getting the performance we wanted. So here I'd like to outline how we are beginning this journey.

Our Product Team is very much hands-on with our data infrastructure. We're aware of the traditional concepts in developing information from "big data" and the concepts used. However, we didn't want a complex batch processing infrastructure. We wanted a single, unified solution that is built on a software stack with minimal devops required. We wanted the infrastructure to give us both aggregations as well as relational capabilities across millions of datapoints. The less software, the better.

We looked at multiple tools including Storm, Akka, Cassandra, MongoDB, and CouchDB. We even considered transforming our master data storage Riak. However, we found with different combinations we had challenges in how we queried data or even more challenges with scalability and ease of devops.

<img src="/uploads/titanlogo.png">

Enter TitanDB. Developed by Aurelius, Titan is a maturing distributed graph database that scales to hundreds of billions of edges. It is essentially a database of databases, sitting on multiple backends including HBase.

How did it fit our engineering problem? As a company we're very interested in behavior and properties of an individual person. We enjoy clustering of relationships, and understanding diffusion of information. This is what fuels our product Platform3. However, we're very much conerned with performance. Our original architecture is already proving to be limited in performance and we want to push the limits of questions we can ask of the data.

Our basic stack looks like this:
- Spark-Streaming
- TitanDB
- HBase

We've got plans to add a more complex computational layer, and we'll be using tools like Gremlin to write our own domain-specific DSL. But what about our data structure? I can't share specifics (company IP) but we're using <a href="https://github.com/thinkaurelius/titan/wiki/Vertex-Centric-Indices">vertex-centric indices</a>. This is a bit more advanced than the node/edge structure since we can create vertex edges, and assign properties to those edges. However, we decided this was the best way to squeeze more juice out of our data.

Below is some sample code taken from the Titan wiki using Gremlin Groovy. Of course, we'll naturally be writing it in Scala for Platform3 as we build this out.
<pre>
g = TitanFactory.open(conf)
// graph schema construction
g.makeKey('name').dataType(String.class).indexed(Vertex.class).make()
time = g.makeKey('time').dataType(Long.class).make()
if(useVertexCentricIndices)
  g.makeLabel('tweets').sortKey(time).make()
else 
  g.makeLabel('tweets').make()
g.commit()

// graph instance construction
g.addVertex([name:'v1000']);
g.addVertex([name:'v10000']);
g.addVertex([name:'v100000']);
g.addVertex([name:'v1000000']);

for(i=1000; i<1000001; i=i*10) {
  v = g.V('name','v' + i).next();
  (1..i).each {
    v.addEdge('tweets',g.addVertex(),[time:it])
    if(it % 10000 == 0) g.commit()
  }; g.commit()
}
</pre>

I'll continue updating this blog as we build out this infrastructure. This is one of the most exciting updates to Platform3 in a while.