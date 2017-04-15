---
layout: post.pug
title: Using make - an opinionated guide for javascript developers pt.1
author: Jim Le
date: 2017-04-09 17:00
tags: javascript
---

### This post is part 1 of a two part series
- [__Part I. Using make__](https://jimle.uk/posts/makefile-for-javascript-developers-1.html)  
  where I go over the basics of a makefile and the relevant parts you'll need to know.

- [__Part II. Using make for a javascript project__](https://jimle.uk/posts/makefile-for-javascript-developers-2.html)  
  where I show you how to get started using make in your daily javascript workflow.
  
---
### Summary

`make` is useful for stringing together multiple tasks to automate a build process. In a sufficiently sized project, we can assume there are various tasks such as moving files around, running tests, deploying to a remote location are all involved as well as the actual "building". This is where `make` can make this process manageable.

When running `make` in a directory, it will look for a `makefile` by default. This is a plain ascii file which
list a bunch of user-defined tasks. Each task may have a list of dependencies; other tasks which will run beforehand[^1] and optionally, one or more shell commands which are executed in succession when the task is called. It is possible to have tasks which simple combine other tasks and have commands of their own.

### 1. Getting started

To start using `make`, create a file called `makefile` in the top-level directory of your project.  
Next, add the following code to your `makefile`:  
  
```make
hello:
    echo "Hello from make!"
```
  
from the command line, run the command `make`:

```terminal
$ make
Hello from make!
```

### 2. Dependencies
In the following example, there are three named tasks `clean`, `build` and `deploy`. `clean` has no dependencies but
`build` has one (which is `clean`) and `deploy` has one (which is `build`). Their respective commands are listed beneath each task and indented once.

```make
clean:
    rm -rf ./build

build: clean
    webpack -p

deploy: build
    aws s3 cp ./build s3://mybucket --recursive
```

In the `deploy` task, we don't have to specify `clean` as a dependency as it is a dependency of `build`. Running `deploy` 
will run `clean`, then `build` before running our `deploy` task.

To have more than one dependency, simple add them to the dependency line. In the following example, `deploy` has two dependencies, `test` and `build`. Dependencies are executed left to right; that is to say, `test` will run first then `build`.

```make
deploy: test build 
    aws s3 cp ./build s3://mybucket --recursive
```

### 3. Executing a task
When you run `make` with no arguments, it'll run the first task in the `makefile`. To run a specific task,
just use the name of the task as the first argument.

```terminal
# Run the first task in the makefile
$ make

# Run the deploy task
$ make deploy
```

### 4. Multiple commands per task ...
It's possible to have multiple commands under a single task. The commands will execute one after the other. Just remember to keep the indentation the same as the first command.

```make
deploy: build
    aws s3 rm s3://mybucket --recursive
    aws s3 cp ./build s3://mybucket --recursive
```

### 5. ... but watch out for context
In `make`, each line is treated as a seperate shell session. This usually means you won't be able to
pass outputs or return values from one command to the next[^2]. However you can use a `\` at the end of each line to workaround this.

```make
# This example will fail.

deploy: build
    AWSBUCKET=mybucket
    aws s3 rm s3://$(AWSBUCKET) --recursive          # AWSBUCKET is undefined,
    aws s3 cp ./build s3://$(AWSBUCKET) --recursive  # here too

# This example is ok ...

deploy: build
    AWSBUCKET=mybucket; \
    aws s3 rm s3://$(AWSBUCKET) --recursive; \
    aws s3 cp ./build s3://$(AWSBUCKET) --recursive

# ... because it's the equivalent of writing

deploy: build
    AWSBUCKET=mybucket; aws s3 rm s3://$(AWSBUCKET) --recursive; aws s3 cp ./build s3://$(AWSBUCKET) --recursive
```

### 6. Working with environment variables
You can set environment variables in your `makefile`. Note that these will override existing environment variables[^3].

```make
NODE_ENV = production

test:
    echo "We'll test in $(NODE_ENV)!"
```
```terminal
$ make
We'll test in production!

$ NODE_ENV=staging make
We'll test in production!
```
We can flip this behaviour by using the `-e` flag.
```
$ NODE_ENV=staging make -e
We'll test in staging!
```

Technically, we _can_ override our overrides like so, but there are subtleties with how
you call variables:

```make
NODE_ENV = production

test:
    NODE_ENV=staging; \
    echo "We'll test in $$NODE_ENV!"; \   # This will be overridden ...
    echo "We'll release in $(NODE_ENV)!"  # ... but this will remain as "production" when evalutated
``` 
```terminal
$ make
We'll test in staging!
We'll release in production!
```
Watch out for recursive errors like this one.
```make
PATH = node_modules/.bin:$(PATH)

...

$ make
makefile:1: *** Recursive variable `PATH' references itself (eventually).  Stop.
```
You can fix this by using `:=` assignment instead.
```make
PATH := node_modules/.bin:$(PATH)
```

### 7. Functions
`make` also has support for functions. You can __define__ them like so:

__`define <fn name>`__  
`...`  
__`endef`__

```make
# you can pass arguments $1, $2 etc. like a regular bash function
define say_something
    echo "$1"
endef
```

To call a function use

#### `$(call <fn name>,[arguments,...])`

```
deploy: build
    $(call say_something,"Deploying!")
    AWSBUCKET=mybucket; \
    aws s3 rm s3://$(AWSBUCKET) --recursive; \
    aws s3 cp ./build s3://$(AWSBUCKET) --recursive
```

Alternatively, you may find `$(shell ...)` useful if you only need to call it once.

__`$(shell ...)`__

```make
deploy: build
    echo "Deploying with $(shell aws s3 --version)"
    ...
```

### 8. Conditionals
As you've noticed by now, `make` does have a few builtin commands ie. `$(shell ...)`.  
I don't have a comprehensive list but here are two I've found useful for conditionals.

#### `$(if [value],[success],[fail])`
- Where `value`, `success`, `fail` can be a string or a function
- To trigger a `success`, `value` must satisfy `[[ -n value ]]`
- To trigger a `fail`, `value` must satisfy `[[ -z value ]]`

```make
# will always return "15%", since "active" is not null
SPECIAL_OFFER = $(if "active","15%","0%") 

# will return "0%"
SPECIAL_OFFER = $(if ,"15%","0%")

# real world scenario, you'll probably call a function
SPECIAL_OFFER = $(if $(shell ...), "15%", "0%")
```

#### `$(filter [value1], [value2])`
- Where `value1` and `value2` can be a string or function
- Returns `value1` if `value1 == value2` else null
- Use it in conjunction with `$(if ...)`

```make
$(filter abc, abc)      # abc
$(filter abc, def)      # null
```

### Conclusion
Congrats on making it this far.  
Although what I've said here only _really_ scratches the surface, it should be
enough for anyone to start writing productive makefiles.
  
In the next article, I do just that and show you some tips and tricks which help
you get started on writing a makefile for your javascript projects.

### This post is part 1 of a two part series
- [__Part I. Using make__](https://jimle.uk/posts/makefile-for-javascript-developers-1.html)  
  where I go over the basics of a makefile and the relevant parts you'll need to know.
- [__Part II. Using make for a javascript project__](https://jimle.uk/posts/makefile-for-javascript-developers-2.html)  
  where I show you how to get started using make in your daily javascript workflow.
  
  
[^1]: I should write a bit of a disclaimer here that `make` was designed to watch for file changes in code and "dependencies" are the means to specify which files to watch. This is pretty advanced stuff and quite useful for the javascript developer but a little beyond the scope of this post.
[^2]: Ouputs and/or return values to stdout. If you're writing to a file then reading from it later, you should be good.
[^3]: Probably good to know that the variables are only overridden for the scope and duration of the script and the changes do not propagate to the shell session.