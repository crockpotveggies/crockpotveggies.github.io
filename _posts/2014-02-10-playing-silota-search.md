---
layout: post
title: Playing with Silota Search
---

If there's one feature that can make-or-break data analysis it's facets. At the end of last year I started integrating [Silota Search](http://silota.com) into our software platform at work, Platform3.

The creator of Silota crafted the name from "Silo Data". Silota acts as an information silo that indexes your data and provides a memory-based search API where you can query based on multiple features including:

+ <b>Geo-bounds</b>
+ <b>Facets</b>
+ <b>Field and date filters</b>

Silota allowed for a snap-quick integration of Platform3 heatmaps to geo-data. We were able to better tie the dataset to the interface, allowing us to build interfaces where we could query demographic data faster and return a large dataset in less than 200ms round-trip. Because we wanted Platform3 to be fully self-serve and user-friendly, request times to Silota APIs were important to us.

<img src="/uploads/silota_heatmap.png" class="thumbnail col-md-12">

The only drawback with a new search tool was learning the API. After some training and some great support from the Silota team I was able to quickly create my first query:

<pre>
var facets = {
  gender_facet: {
    terms: {
      field: 'gender'
    }
  },
  birth_facet: {
    terms: {
      field: 'birth'
    }
  }
};
var filters = {
  bool: {
    must: [{
      geo_bounding_box: {
        location: {
          top_left: [VM.SW_lng(), VM.NE_lat()],
          bottom_right: [VM.NE_lng(), VM.SW_lat()]
        }
      }
    }]
  }
}
var query = {
  q: "",
  schema: {},
  fetch_fields: {},
  facets: facets,
  filters: filters,
  limit: 900000
};
</pre>

You can see above I have full control over the facets that I want to return. Silota also offers facet filters, and for numerical ranges you can also group facets by their numerical value.

So what can you do with all this cool stuff? Create highly-targeted formulas in a blink. By combining demographic data with behavioral segmentation, I have the ability to message all females in New York who tweeted a brand in the last month who are between 18-30 years old. You can use a targeted promotion, such as a store-specific discount.
