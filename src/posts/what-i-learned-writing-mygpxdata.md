---
layout: post.pug
title: What I learned writing mygpxdata
author: Jim Le
date: 2016-01-19 22:34
tags: programming, python, projects
meta: project=mygpxdata, author=Jim Le, license=BSD, github=https://github.com/jimle-uk/mygpxdata
---
### What is mygpxdata? 

**mygpxdata** is a personal opensource python project which was released in
Jan 2016. It parses gpx files to render a svg path of the route and calculate
relevant stats from it. Learn more about the [gpx file format](https://en.wikipedia.org/wiki/GPS_Exchange_Format)
or check it out the [mygpxdata project](https://github.com/jimle-uk/mygpxdata) on github.


This project started as a weekend project and took a few more days on and off to get it onto github. Here are some lessons I picked up along the way.

###

#### 1. The earth is not flat.

"No shit, sherlock!" I hear you say. Bear with me as I try to explain...  
So my initial naive approach didn't take into account longitude and latitude maps to the curvature of the planet and when you don't apply meteorological projection to convert to 2d cordinates, your numbers are sure to come out distorted.  

I guess it's just not something you think about when you look at google maps and the like.

###

#### 2. The gpx file is really just a list longitude, latitudes and timestamps but you can calculate almost everything from it.

For example, with consecutive pairs of coordinates, you can use the [havesine formula](https://en.wikipedia.org/wiki/Haversine_formula) (aka "as the crow flies" method) and sum up all the values to get the total distance travelled. Pretty cool.

The only thing you won't be able to get without a 3rd party API are address details (eg. street name, postcode). However, I wanted to identify the park I was running in but it  doesn't seem any 3rd party API supports that at the moment.

###

#### 3. Writing a package is hard work!

I would have published the project sooner but had some reservations about the quality of the code. After faffing around for a few days, I went ahead and hosted it on github.

Definitely a new-found respect for package authors everywhere!

###

### What's next for mygpxdata?

Documention and tests are pretty high on the list. I think the core functionality is pretty good for now and don't really see the need to add anymore.

###