---
layout: post.pug
title: Coffeescript 2016
date: 2015-12-27 23:52
tags: javascript
---
### The question

Reddit user [xDinomode](https://www.reddit.com/user/xDinomode) asks in [/r/javascript](https://www.reddit.com/r/javascript/comments/3yfpz4/whats_the_point_of_coffeescript/):

> __What's the point of CoffeeScript?__  
> I'm reading a tutorial on PouchDB and like always I run into CoffeeScript. What's the point of it?

It got me thinking: With the release of ES6 in June of this year, does it still make sense to use coffeescript today?

### Coffeescript vs ES6

Having played a little with the ES6 syntax, here are my initial thoughts.

__1. Coffeescript is still easier to read than javascript.__

ES6 actually solves alot of things coffeescript did. Features such as proper classes, destructuring, string interpolation and even list comprehension[^1]. However you may still want to go with coffeescript for its expressive nature and fewer brackets.

```coffeescript
# http://coffeescript.org/#switch
switch day
  when "Mon" then go work
  when "Tue" then go relax
  when "Thu" then go iceFishing
  when "Fri", "Sat"
    if day is bingoDay
      go bingo
      go dancing
  when "Sun" then go church
  else go work
```
and a classic example:
```coffeescript
# You can write something like this is check variable exists...
if person?
  subject = person

# ...and the javascript equivalent
if (typeof person !== "undefined" && person !== null) {
  subject = person;
}
```

__2. Coffeescript compiles to ES5 just fine.__

I expect ES5 javascript to be around for a while yet so I don't see any significant technical advantage to porting over to ES6+Babel[^2].

Which leads me to my third point...

__3. Coffeescript could eventually support fully compling to ES6 syntax?__

This would be *pretty* huge. I'm guessing there's no way of knowing if it'll ever happen but if not by the current authors, then likely a community-backed fork of the coffeescript project will emerge someday.

### Pick your poison

It really comes down to personal preference really but you would not go amiss if you decide on coffeescript today. Coffeescript is still very much kicks ass 5 years down the line and it'll be interested to see what's next on its roadmap!


[^1]: re: comprehensions - ok, it kinda did at one point. Removed from the ES6 draft as noted on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Array_comprehensions). Working in Babel 5.0 and below, removed in 6.0.
[^2]: to clarify, I know there are a few new ES6-only features available but it is common knowledge at this point that not all of them can be transpiled to ES5.

