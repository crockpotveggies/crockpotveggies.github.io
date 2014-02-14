---
layout: post
title: Modular Code with Require.js
---

Valentine's day arrived in multiples. Or multiple files that is, thanks to modular code with Require.js.

If you're building a large front-end application and you had one massive monolithic javascript file storing all of your code, you've probably experienced organizational headaches after the 5,000th line. [Require.js](http://requirejs.org) is meant to solve that problem, and specifically work in an AMD-world.

We had a huge time crunch on our project at work and one serious oversight was lack of modular javascript. We spent more time thinking about backend code we looked over the frontend. So in less than a day's work we were able to drop in Require.js and solve some organizational problems.

We're using Require.js to pull our code together to create a singleton. Note that it is only for application-specific code and in this case we don't use it for libraries like jQuery.

<pre>
 index.html
 / js
 
   / app
   app.js // basic config and calls init.js
   
     / controller
     master.js
     / model
     package.js // pulls together different models
     m1.js
     m2.js
     / util
     package.js
     u1.js
     u2.js
     
     init.js // using knockout.js, so use this to pull everything together and bind
     
   /lib // external libraries
</pre>

We have a rather special MVVM/MVC environment for our control panel since we're taking advantage of Play! templates on the backend, but we organize our javascript files in MVC-fashion.

So how do we pull it together? Thanks to <code>define</code> we can return objects and use <code>$.extend</code> to merge them together.

A typical m1.js file:

<pre>
define(function(){
  var singleton = {};
  singleton.m1 = {param: value};
  
  return singleton;
});
</pre>

And a package.js file that pulls all of them together:

<pre>
define(["model/m1","model/m2", function(m1, m2){
  var singleton = {};
  $.extend(singleton, m1, m2);
  
  return singleton;
});
</pre>

And this continues all the way to the controller where we do some special things with Sammy.js for client-side routing. Hopefully if I have some extra time I can pull this together into a boilerplate.