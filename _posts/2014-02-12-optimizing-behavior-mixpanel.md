---
layout: post
title: Optimizing Behaviors on Crockpotveggies
---

Unless you've opened the inspector while visiting this website you probably haven't noticed that I'm tracking scrolls and clicks.

I just threw up this website not too long ago and I wanted to see if visitors were interested enough to read my contact icons at the bottom of the page. I'm tracking clicks on these icons as well as the amount of scrolling across the page.

<img src="/uploads/mixpanel_click_funnel.png" class="thumbnail col-md-12">

I created a free account on Mixpanel and integrated a scrolling library to get the job done. I set up a few "waypoints" of scrolling I wanted to track.

+ Top of page
+ Beginning of content
+ Meat of content

I then used these waypoints to make a funnel that shows how encouraged visitors were to click on my social icons. It can demonstrate a couple things, including how interested a user *actually* is in the content.

<img src="/uploads/mixpanel_edit_funnel.png" class="thumbnail col-md-12">

Creating the funnel was actually dead simple. There's not a whole of configuration required. I could get even more complicated and add more "scroll" waypoints...but there's a limit to how much data is actually relevant.

The website is fresh, so I obviously need to spread the word to attract more visitors. Sample size is not big enough. But so far it looks like I need to either write more interesting content or reconsider the placement of those icons...if I actually want clicks on them. ;)
