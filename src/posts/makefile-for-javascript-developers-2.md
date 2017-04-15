---
layout: post.pug
title: Using make - an opinionated guide for javascript developers pt.2
author: Jim Le
date: 2017-04-15 17:31
tags: javascript
---

### This post is part 2 of a two part series
- [__Part I. Using make__](/posts/makefile-for-javascript-developers-1.html)  
  where I go over the basics of a makefile and the relevant parts you'll need to know.

- [__Part II. Using make for a javascript project__](/posts/makefile-for-javascript-developers-2.html)  
  where I show you how to get started using make in your daily javascript workflow.
  
---
### Summary

In this post, I'll share some tips on working with `make` into your javascript project followed by an example script you could build off.
The project setup I've decided to go with as an example is very frontend focused but easily changed to work with a backend if needed.
  
  
If you need a refresher on `make`, I'd suggest you check out [part 1 on using make](/posts/makefile-for-javascript-developers-1.html).

### 1. Add `node_modules/.bin` to your `path`

```make
PATH := node_modules/.bin:$(PATH)

build:
    webpack -p      # it works!
```
First up, it's a good idea to amend the environment variable `PATH` to include our project's `node_modules` directory. This is so we can be sure `make` is using the correct scripts for our tasks.

### 2. Working around `make`'s last-modified check using `.PHONY`

`make` is designed with an internal database system which keeps track of last modified times of files. Using this database, it knows only to build the relevant parts of the system where files have changed. This works as a great development tool for compiled projects but is mostly unneccessary if you're using `webpack`, `mocha` or any other tool which has "watch" tasks.
  
We can force `make` to always build regardless of last-modified checks, by:
1. using cli flags `-B, --always-make`
2. using the special `.PHONY` task in our `makefile`
  

We'll use `.PHONY` as it gives us greater control. Here's an example.
  
Example 1.
```make
.PHONY: test

test:
    mocha **/*.test.js
```
Example 2. What if we have multiple tasks?
```make
# bad

.PHONY: clean install test build deploy

# good

.PHONY: all
.all: clean install test build deploy
```

### 3. Use `.SILENT` to reduce output

When `make` runs, it will print out the commands for task being run, which can get a little verbose if you're checking for errors.
Use the special `.SILENT` task to prevent this default output. If you're `echo`-ing things to stdout, these will still show.
```
.SILENT
```

### 4. Checking if we're in "production"

Example 1. Checking at environment variable level
```make
AWS_BUCKET := $(if $(filter production, $(NODE_ENV)),'my_production_bucket', 'my_staging_bucket')

deploy:
    echo $(AWS_BUCKET)
```

Example 2. Checking at task level
```make
deploy:
    if [ $(NODE_ENV) = production ]; \
    then \
        AWS_BUCKET='my_production_bucket'; \
    else \
        AWS_BUCKET='my_staging_bucket'; \
    fi; \
    echo $$AWS_BUCKET
```

Example 3. Checking with a function
```make
deploy:
    AWS_BUCKET=$(call isProduction,"my_production_bucket","my_staging_bucket"); \
    echo $$AWS_BUCKET

define isProduction
$(if $(filter production, $(NODE_ENV)),$1,$2)
endef
```

### 5. Getting the version number from package.json

Example 1. Using a function
```
archive:
    echo "Now zipping version $(call get_version)"
    tar -czf archive-$(call get_version).tar.gz -C ./build

define get_version
$(shell cat package.json | sed -n 's/"version": "\([^"]*\)\",/\1/p' | tr -d '[:space:]')
endef
```

### 6. Overriding errors

`make` will stop if it hits a non-zero exit. If for any reason, you need to handle or bypass errors, here's an example of how you can do that.  

Example 1. 
```make
lint:
    eslint src; \
    if [[ $$? -ne 0 ]]; then ...; exit 0; fi
```

### 7. Putting it all together

Here is a basic layout of what a makefile for a javascript project could be.

```make
PATH := node_modules/.bin:$(PATH)

.PHONY: all
.SILENT

all: clean install lint test build deploy

clean:
    rm -rf node_modules/*
    rm -rf build/*

install:
    npm install

lint:
    eslint src

test:
    mocha **/*.test.js

build:
    webpack -p

deploy:
    aws s3 rm s3://mybucket --recursive
    aws s3 cp build s3://mybucket --recursive
```

### Conclusion

In part 1, I gave a crash course on make, makefiles and how to write them. In part 2,
I focused in on some specific pointers on using make for javascript projects.
  
I hope you've found both parts educational and at the very least convinced some of you 
that `make` can be a viable tool in your daily project workflows.
  
### Where to next?

If you think `make` is for you, then you should read up on the official man pages 
and how others are using it. You'll be surprised that we've only really cover a small fraction
on what's possible with `make` and I'll bet you'll stumble upon some tricks of your own.

### Are you using `make`? Or getting started using `make`? Have questions?

This post is updated periodically as and when I receive feedback so shoot me a line and,
time permitting, I'll do my best to get back to you as soon as I can.

### This post is part 2 of a two part series
- [__Part I. Using make__](/posts/makefile-for-javascript-developers-1.html)  
  where I go over the basics of a makefile and the relevant parts you'll need to know.

- [__Part II. Using make for a javascript project__](/posts/makefile-for-javascript-developers-2.html)  
  where I show you how to get started using make in your daily javascript workflow.
  