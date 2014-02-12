---
layout: post
title: Leaflet's New Awesome Heatmap
---

There's a brand spanking new heatmap for Leaflet maps and I couldn't be more excited!

<img src="/uploads/leaflet_heat.png" class="thumbnail col-md-12">

At work we were having many issues with a 2-year-old heatmap that hadn't seen any support or forks in ages. But just before I was going to sit down and devote time to heatmap programming I stumbled upon Leaflet's new <code>Leaflet.Heat</code>!

I was so dumbfounded how simple it was to configure. Here's how easy it is to create a heatmap:

<pre>
var heatmap = L.heatLayer(d.locations.data, {
  blur: 20, 
  maxZoom: 19, 
  gradient: {0.4: 'blue', 0.6: 'lime', 0.85: 'yellow', 0.97: 'yellow', 1: 'red'}
}).addTo(map);
</pre>

The above fits on one line easily, and in fact I can inititialize it with a simple <code>L.heatLayer(data).addTo(map)</code>. It was just released at the end of January 2014, and I'm hoping the Leaflet's primary developer will continue to work on it.

Leaflet.heat is based on [SimpleHeat](https://github.com/mourner/simpleheat). Grab the files on [Leaflet's GitHub](https://github.com/Leaflet/Leaflet.heat).
