---
layout: post.pug
title: The joys of static site generators
author: Jim Le
date: 2015-12-10 17:23
tags: meta, cactus
---
### Welcome

Lately, I've been wanting to get things down into words. Things like thoughts, jokes, advice, comments. It's weird, I can't explain it. 

Though the exact content of said things is still unknown to me, I feel the format I need to use is clear. Something very much like twitter but with three distinct differences: 

1. I need to break out of the 140 character limit
2. I need to own my own words
3. I settle for nothing less than total control[^1].

Hey whaddya know... I just described a blog[^2].

### Started blogging again

So now I'm making another attempt at trying to keep a blog.

Fair warning: I've never been good at keeping one. Aside from always failing to come up with anything interesting to say, keeping a blog up and running, technically speaking, has always been a pain for me[^3].

So over the autumn, I began looking into [static site generators](https://davidwalsh.name/introduction-static-site-generators). *Note: The pros and cons of static site generators are summed up pretty well in the linked article so do check that out*.

> A lie can travel half way around the world while the truth is putting on its shoes.
Read more at: https://www.brainyquote.com/quotes/quotes/c/charlesspu105835.html

### Static site generators

Long story short, at first I gave [Jekyll](http://jekyllrb.com/) a try but was totally not feeling it[^4]. Later I discovered and ended up sticking with [Cactus](https://github.com/koenbok/Cactus)[^5].

I got to say, I'm a convert. Overall it's less files, dependencies and issues to deal with and all the mental energy managing that stuff drains. I've come the realise that blogs and the like, don't really need a production instance running a dynamic backend with multiple services - it's crazy overkill.  

Of course, if I ever needed user management, site search, comments, pingbacks etc I wouldn't count out switching back to a database-backed CMS. At the moment, it's just refreshing to not have to think about it.

By the way, if you haven't tried using a static site generator, I'd definitely recommend you do and see for yourself. They're written in just about every language nowadays, check out [staticsitegenerators.net](https://staticsitegenerators.net/) for a comprehensive list.

### What's next
I will probably do a few reviews/articles on Cactus since it is really barebones. Admittedly, I was feverishly tweaking and writing scripts to make it behave like other static site generators[^6] but it's been a great way to learn the code.

As for blogging, it'll be interesting to see how far I get in this new format. Workflow is definitely easier this time round sohopefully it'll last more than a couple of weeks.

Now to find something to write about.


[^1]: for example, I didn't want my site littered with ads, platform scripts and tracking codes.
[^2]: obviously, I lose a lot of the whole social/visibility/discoverability of twitter but just being able to *edit your words* makes it oh so worth it.
[^3]: usual stuff like configuration, databases, security updates etc. I did give online services a try but found them restrictive and hard to theme.
[^4]: definitely a great generator but too opinionated for me. Whereas Jekyll is blog first, Cactus isn't - which for all intents and purposes, doesn't make any sense at all but strangely enough, Cactus is working out for me. It could also be I don't shit about Ruby...
[^5]: cactus is written in python and uses django templates. Not to be mistaken with the gui app counterpart for the mac ([catcusformac.com](http://cactusformac.com)). It seems the app version uses an older version of cactus which can get quite confusing when things aren't working out as expected.
[^6]: well, I've only written scripts to handle *markdown* and *tags* so nothing major really.