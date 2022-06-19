---
layout: post.pug
title: A Rant about Reviewing Code
author: Jim Le
date: 2022-06-18 16:38
tags: programming
---
${toc}

## Actually, a rant
I had the idea for this post a while ago, had it written up but sat on it too long until I forgot about it. After rediscovering the initial draft, it felt quite preachy and my feelings about the topic had changed somewhat.

So after some revision, I re-wrote the piece as a rant and here it is.

The following is based on my past experience in the role of a code reviewer as part of a digital product / web development team. I've been trying to identify why I enjoy reviewing certain people's work over others, and I've summed up that **I like code reviews where the author respects my time and energy and helps me spend less of both**.

## Identify

### Make it clear what I have to review

The more time and energy I'm spending trying to figure out what I'm looking at, the less time I can spend on the actual review. Worst if I'm reviewing a part of the code which should be ignored! Specifying or linking to ticket info, writing a short description, state breaking changes, list key functionality implemented and not implemented, state if PR is work-in-progress - these are things I encourage all devs to do. Do not however try to pass off commit messages as PR descriptions.

### Prioritize complex and/or significant parts of code first

In my experience, PRs are usually 90% cruft and 10% questionable approach or implementation. So rather than having to read from top to bottom, point me straight to that key part which makes or breaks your code. This helps focus my energy to review the work that matters. Examples could be breaking down key issues/challenges in the work implemented, noting any failed attempts and/or workarounds, anticipate questions and provider answers preemptively, link to source code line in files, provide diagrams, provide examples of usage.

### Call out any related or follow-on work that's needed

Unless you tell me, I going to make assumptions and call out issues which I might not know is coming up. The back and forth can be a huge time-sink if without this context, the PR looks broken. Spend a few minutes explaining related functionality which this work enables, state things which were missed, if this is a part of a series of PRs, state where this PR fits in and what is to follow.

## Explain

### Don't repeat what is said in the ticket, explain your approach and how it works

Your implementation will probably follow one or more existing and well understood software development patterns. I just need to know which ones and why you've chosen them so I can use my past knowledge and experience to validate. Uncommon approaches, unless novel, are usually a recipe for disaster and involves having to run the code/tests locally to verify. In this case, I'd advise to provide a demo link, attach a video demo, attach screenshots and list bullet points against acceptance criteria.

### Teach me how to review your code

If your PR is complex then assume that further explanation is likely required. If I don't understand the code, there's going to be back and forth on the PR until I do. Save us both some time beforehand by using PR comments, linking to reference material, [creating an ADR](https://adr.github.io/) or similar docs, provide video demo or offer to have quick meetings to explain.

### After the review, let me know when and what changes you're making

After the initial review, it's likely I will lose all context as I work on other stuff. If you are acting on suggestions/requests for changes and updated your PR, you can help me out by amending the description, updating reference material, avoid replying “done” to review comments and instead explain the changes implemented.

## Proactive

### If you want my review/time, you have to tell me

The last place you'll find me is hanging out on the PRs queue waiting for my name to come up so if you need my time, you have to let me know. Don't be shy about it though, please ask even if you think I'm busy! Avoid situations where you PR is being ignored and drifting further out of sync. Don't rely on automatic notifications in a chat channel as these will become noise after a while, post a message directly to the team, escalate if your PRs are sitting idle for more than 1 day.

### Make yourself available for questions

Always assume you'll need to set some time aside to answer any questions or response to comments on your PR. Some questions may block a full review until addressed and there's a risk you'll lose my engagement if it takes forever to get a reply. It should be a high priority to get your work merged and deployed so keep an eye on your inbox for any notifications.

### Keep the momentum going

The longer you take to get back to the PR, the longer I will need to rebuild context since the last review. Given enough time, I may forget what was decided or agreed upon and end up repeating myself which isn't the best use of both of our time. Factor in and allocate time for amendments, state clearly an estimate when likely re-review can take place. Alternative, break up PR into smaller approved chunks which can be merged first may help.