---
layout: post.pug
title: Making of Interactive Black History Tube Map
author: Jim Le
date: 2022-06-25 14:28
tags: retrospective
---
!{video}(https://res.cloudinary.com/daglih2g8/video/upload/v1656166010/jimle.uk/posts/20220625/1_y7jxpt.mp4)

I had a chance to redo the layout on [interactive-blackhistorytubemap](https://jimleuk.github.io/interactive-blackhistorytubemap/) recently so I thought I'd create a quick post to document some of things I did for this mini project.

${toc}

---
## Getting the Initial Data
[![web scraping script using crystal lang](https://res.cloudinary.com/daglih2g8/image/upload/v1656177871/jimle.uk/posts/20220625/3_rnzfrn.png)](https://res.cloudinary.com/daglih2g8/image/upload/v1656177871/jimle.uk/posts/20220625/3_rnzfrn.png)

Fortunately, The black cultural archives website had the page listing all the names, organisations and events on the tube map [https://blackculturalarchives.org/bca-x-tfl](https://blackculturalarchives.org/bca-x-tfl). I think if this page didn't exist, this project would have likely taken a lot longer.

I wrote a simple script using [Crystal](https://crystal-lang.org/)[^1] to download a snapshot of website page and extract the data from the html. The plan was to enrich this data with images, reference links and mapping to stations - it would take about a month to complete this exercise!

## Creating a Dynamic Tube Map
[![Using Figma to create a SVG tube map with hotspots](https://res.cloudinary.com/daglih2g8/image/upload/v1656177871/jimle.uk/posts/20220625/2_nmoah7.png)](https://res.cloudinary.com/daglih2g8/image/upload/v1656177871/jimle.uk/posts/20220625/2_nmoah7.png)

There were a few approaches I consider to handle user interaction I envisioned with the tubemap. Ultimately, the quickest and easiest option was to manipulate via DOM an existing SVG of the tubemap once it was rendered in the webpage.

However, existing SVGs were optimised for display and ultimately I had to modify my own version of the SVG to mark out station nodes and their labels. [Figma](https://figma.com) was huge help here - it's ability to define id attributes for nodes meant I didn't have to do this by hand[^2].

## Setting up a Simple Data API
[![Using Supabase to make the data publically available](https://res.cloudinary.com/daglih2g8/image/upload/v1656177871/jimle.uk/posts/20220625/4_ocbs1j.png)](https://res.cloudinary.com/daglih2g8/image/upload/v1656177871/jimle.uk/posts/20220625/4_ocbs1j.png)

I've been following [Supabase](https://supabase.com) for a while and wanted an excuse to try out the service. Before anyone mentions, I realise a database is kinda overkill for this project - I initially had a version of the site which had json files loaded client side!

Using Supabase however did make it easier to edit the data later and offering automatic [pgrest](https://github.com/pgrest/pgrest) integration meant it took me no time at all to get the API working[^3].

## Building and Publishing the Site
[![Publishing via github pages](https://res.cloudinary.com/daglih2g8/image/upload/v1656177871/jimle.uk/posts/20220625/5_dpbddk.png)](https://res.cloudinary.com/daglih2g8/image/upload/v1656177871/jimle.uk/posts/20220625/5_dpbddk.png)

For this project, I decided to try [Svelte Kit](https://kit.svelte.dev) which is a app framework using [SvelteJS](https://svelte.dev) after having not touched svelte for more than a year. Overall using Svelte Kit was fun but for me, Svelte's reactivity model and sync/async data handling are still challenging concepts - I guess it's just not how my brain works. In the end, the site is static-generated which 

To publish the project, I opted to simple use Github pages rather than opting for services like Vercel or Netlify. If I were to go the route of these more advanced hosting solutions, I'd probably want to build backend stuff to justify the extra effort[^4].

## Conclusion

Compiling and enriching the data was real challenge of this project and in the future, I'd definitely consider outsourcing some of that effort. The development of the site itself was quite easy in comparison and in my opinion, the modern day developer is spoiled for choice when it comes to how they build their apps and where they choose to host them.


[^1]: There was no particular advantage for me to using Crystal other than curiousity and learning. I definitely could have saved a bunch of time using Node.
[^2]: If you label a shape/element, Figma will render that label as the element's id attribute when you export to SVG.
[^3]: This PgRest endpoint is automatically exposed and the site currently accesses it using a public API key. AFAIK there isn't a way to restrict the API to a particular site so if be aware if you want to try the same solution for your API.
[^4]: Ideas could be bookmarking, ability to contribute changes to the data, creating your own tube maps? In any case, perhaps for another project.