---
layout: post
title:  "Why you should not use your own lib/framework in production"
date:   2015-01-07 09:31:00
categories: development
tags: web-development
image: /assets/article_images/2015-01-07-why-you-should-not-use-your-lib-framework-in-production/french.jpg
comments: true
---
  

I have been working with web development for a short time yet (something like 3/4 years),
and I know that its not a real big time but there is one things that I noticed in some companies (most on the front-end area)
is that you will find a lot of libraries and frameworks created often by ex-employers and employers from the company.  

## Why talk about this?
  
  
Well, creating your own project its Awesome! We all know that one real good way to learn is
trying to create your libraries and framework to solve the exaclty problem that you have in hands,
but how does it affect your team and mostly of all: *how does it affect the company?*   
I have lived a situation like that before, and I wanna share that with you.

## Building a legacy

In my case we had such a big project in the company (one of the biggest) and guess what,
all the front-end was build by a small library created by the old team, that nowadays *nobody* is actually working there.  
Well thats was fine until the first feature I had to implement in this project, and I spent something like 3 more times then it should, and Im sure I did not a good job in that.. and further someone will have to implement another feature and what we are dealing here is a __legacy code__.

The first thing that I looked for was the docs from that lib, and what I found was something like __"Docs under construction"__ and the last authored commit of was made *3 years* from now.  
Its a really crazy thing that a company is using in production a tool that nobody knows how to use it, and its kind of impossible to fix or implement anything in that.

If you get to your manager and explain that "maybe it's necessary re-write that big project's code because we are using something really unknown here", well maybe he will get it, but maybe its not the way that the company will react for this situation.

## Conclusion
  
Its a really professional and important thing to measure which tools you are using in a company project, and its always good do this with the opinion from all the developers from the team. Keep in mind that in a company your are writing code for __everyone__, and everyone must understand that, and a framework or a library that is already know in the market, built by hundreds of developers will always be the first and best option.

Building libraries and frameworks it's always awesome, but think twice before use that code in a project that will not be only yours :)
