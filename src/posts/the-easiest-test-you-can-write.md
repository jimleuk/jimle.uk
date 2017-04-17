---
layout: post.pug
title: The easiest test you can write right now
author: Jim Le
date: 2017-01-14 10:49
tags: programming, javascript, testing
---
### Summary

So this is a post I've been meaning to write for a while.
  
I've spoken briefly about this topic with friends and colleagues that I'm in the
belief that if you identify purely as a frontend developer, I'm going to assume
99% of the time that you do not write tests.
  
__If I'm right, this is not to say you are a bad developer__. Far from it.

For a lot of developers out there, refreshing the browser and looking for console
errors is about as much testing as they need (and as about as much as they can stomach!).

But this is a haphazard approach which relies on __excessive cognitive load__ (to remember
all the bits that need testing), __experience with browser quirks__ (to have confidence across
different OS/browser environments) and __a human__ (who is by default error-prone and most
probably stressed out with that looming deadline fast approaching).

> Me:  What if you have over 100 UI components?  
> You: I'll just fire up my browser and run through _all_ the pages!  
> Me: ...
  
It also wouldn't give much confidence going into a release - where it's likely there's
a _christmas-naughty-list_ length of changes - __you have no way to verify what was working
before, does indeed work as expected now__.
  
### Breaking the cycle

I'm sure we've all experienced embarassing moments where we've had seemingly innocent
refactoring break core functionality in some way later on.

This post isn't to re-live those awkward moments but rather, to reduce occurrances of them
going forward - whether it's in your current or future projects.

I speak from experience when I say frontend developers get into a habit of not writing tests.
I've heard all the excuses - I've made them myself on many occasions. Writing comprehensive
tests is always a daunting task and the more you think about it, the less likely you'll get started.
  
I broke out of that cycle by asking myself, __what is the easiest test I could write right now__?

### Smoke tests

Ok, so you're probably asking: what does "easy" mean exactly?  
Well for a start, I wanted to do the basic minimum with the idea of revisiting the tests
once I had more time/motivation. This had to cover 3 basic criteria:

1. I should be write the least amount of code needed.
2. I can write it in the shortest amount of time possible.
3. I should actually be testing something meaningful.

After not much research, I found this pretty much describes __smoke testing__.

__The idea is simple__. Given that the worst thing that can happen in your web app
is to have something throw an exception at startup, we would write unit tests that 
check each and every javascript component and widget we use, is able to initialize.
  
Here's an example for a single component named __"MyComponent"__

```javascript
// mycomponent.test.js

import MyComponent from 'src/MyComponent';

describe('myComponent', () => {
    it('initializes', () => {
        new MyComponent();
    }); 
});
```
And that's pretty much all there is to it.
  
__Now do this for 100 components__. The results are amazing.

Not only would you have written 100 tests in about 5 - 10 minutes, but you will 
have assured yourself that if something was to fall over, you'll know about it 
before anyone else does and most importantly, before it goes out to your customers.

### Doubling up

Here's a tip. If your components have "render" methods, you could (and probably should) double up
on your tests by ensuring these components are also able to render as well.

Extending our __MyComponent__ example from above

```javascript
// mycomponent.test.js

import MyComponent from 'src/MyComponent';

describe('myComponent', () => {
    it('initializes', () => {
        new MyComponent();
    });

    it('renders', () => {
        var component = new MyComponent();
        component.render();
    });
});
```
Boom! An easy 200 tests in about the same time it takes setup your webpack config.

### Only the beginning

Once you start seeing the benefits and get into a habit of writing smoke tests (and
unit tests in general), it becomes a starting point for more interesting tests.
I find that once you're confident about the things that do work, you can focus 
more on writing tests for the things that don't.

__If you've been holding off writing tests, give this a go!__
Hopefully I've been able to convince some of you for the better but I would be 
interested to know if this has worked for anyone else.