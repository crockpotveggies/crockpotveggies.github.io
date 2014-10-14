---
layout: post
title: Finding Centrality, There's More to Betweenness
---

Being immersed in my own graph research and development, I quickly ran into the common problems with centrality in social network analysis. Does it scale? Can it be parallelized? Is it going to be effective in my own problem solving?

Currently I'm working on finding centrality and other important measures in a social network for an R&D project at <a href="http://3tierlogic.com">3 Tier Logic</a>. I've been working with Betweenness Centrality and Markov Centrality - both great algorithms for discovering importance in a network. These are excellent algorithms for finding a quick response...if your network is smaller than 1,000 individuals. Welcome to the world of big data, where the smallest graph is 200,000 nodes. Compute time for Markov Centrality is <code>n^3</code> and nobody got time for that.

<a href="https://www.flickr.com/photos/speedoflife/8273922515" title="Co-authorship network map of physicians publishing on hepatitis C by Andy Lamb, on Flickr"><img src="/uploads/graph_cluster_centrality.jpg" alt="Image representing importance in a network of Hepatitis C author physicians"></a>

With a performance tolerance of 4 days, I managed to scale Betweenness Centrality to a very large graph. The nice thing is that Betweenness is very light on memory, so most of the work is done through time and not "force". Unfortunately, I did find Markov Centrality to be more effective at finding importance, but it's dependence on matrix operations meant I'd be dealing with a very complex implementation.

If you're someone who deals with smaller networks such as Crime Analysis, I highly recommend looking into Markov. IBM's <em>Analyst's Notebook</em> is prepackaged with a limited number of algorithms, and expanding that list to include Markov Centrality can greatly aid crime investigation. Secondary research showed me it was better at picking out "ring leaders", such as this <a href="http://www.ke.tu-darmstadt.de/lehre/archiv/ss07/dm-sem/Schaffer.pdf">comparison here</a>. What's interesting with Betweenness compared to Markov is that it scores someone higher who is well connected but not necessarily important, such as a "logistics" individual. As mentioned previously, the deal-killer with Markov Centrality is that it just doesn't scale well.

So how do we go <em>next level</em>?

There are two options. You can either get 1) more creative in your graph analysis through pruning and piecemeal analysis; or 2) you can change the paradigm altogether and introduce algebraic methods.

I won't get too deep into methods for #1 above. If you're solving a communication problem, algorithms that help you break apart the graph into pieces are, for example, helpful in finding bottlenecks in communication. Take a look at <a href="http://www.kazemjahanbakhsh.com/docs/Jahanbakhsh_Kazem_PhD_2012.pdf">this paper</a> by Kazem Jahanbakhsh. Kazem proposes a use for Tarjan's algorithm. Finding "bottlenecks" in a communication graph, which are highly relevant to communication strategies.

<img src="/uploads/bisimulation_labelledstate.png">

Number 2 is an interesting technique I picked up from <a href="https://www.linkedin.com/profile/view?id=1585351">Greg Meredith</a>, who proposed that I introduce algebraic methods to graph processing. <a href="http://en.wikipedia.org/wiki/Bisimulation">Bisimulations</a> are the algebraic operations used to represent binary relation between state transition systems. Bisimulations will allow you to scale graph analysis by assuming each node is a hypothesis, and each hypothesis sits in a "separate" graph. By running the simulation you are testing each hypothesis for similarity. <a href="http://www.control.utoronto.ca/~broucke/Webpapers/BroDiBDiGSan-HSCC00.pdf">Theory of Optimal Control</a> is a prime candidate for my own types of scaled social network analysis.

Bisimulation methodology has been traditionally locked away in industries dedicated to mission critical analysis, including finance. Much of the knowledge hasn't yet bled into other industries, though I'm discovering much of it now.

Anyways, even if you're not focused on social network analysis the methods above are just as applicable for many graph problems. If I could scale Markov Centrality to any size dataset I would, but then why would scaled social network analysis be interesting if it weren't challenging?
