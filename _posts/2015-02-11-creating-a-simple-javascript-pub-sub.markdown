---
layout: post
title:  "Creating a simple Javascript pub sub"
date:   2015-02-11 15:26:00
categories: vim
tags: vim
image: /assets/article_images/2015-02-11-creating-a-simple-javascript-pub-sub/talk.jpg
comments: true
---

Have you heard the word [pubsub][pubsub]?

Well, the [Publish/Subscribe][pubsub] is a famous pattern that in a simple way implement data-transfer/trigger between all your application.

Imagine that you have a point in your code that you can tell ___"Hey, something x just happened here"___, and in the other point you will have ___"Im waiting for something x to happen"___, and then all the magic happen.

Got it? Basically it's your application talking with itself to archive the requirements :)

And today we are going to build a simple [pubsub][pubsub] in a few lines of code.

I will start with simple [IIFE][iife] statement to prevent of messing aroud with our global scope, and getting a root argument as the `window` (we are going to use it later).  


```javascript
;(function (root) {
 'use strict';
 
 function PubSub () {
 	// our constructor
 }
 
 
} (window));
```

We are going to need somewhere to store a "quote" of topics in our pubsub, and also we need a subscribe method to insert those:

```javascript
;(function (root) {
 'use strict';
 
 function PubSub () {
 	this.topics = {};
 }
 
 PubSub.prototype.subscribe = function (name, fn) {
	this.topics[name] = this.topics[name] || [];
	this.topics[name].push(fn);
 };
 
 
} (window));
```
The next step is create the publish method, which will be responsible for send the message to the subscriber and execute the callback saved before in our "quote" of subscriptions:

```javascript
;(function (root) {
 'use strict';
 
 function PubSub () {
 	this.topics = {};
 }
 
 PubSub.prototype.subscribe = function (name, fn) {
	this.topics[name] = this.topics[name] || [];
	this.topics[name].push(fn);
 };
 
 PubSub.prototype.publish = function(name, args) {
 	this.topics[name] = this.topics[name] || [];
    this.topics[name].forEach(function(fn) {
      fn.apply(this, args);
    });
 };
 
 
} (window));
```

Remember that `root` argument that we sent before on our IIFE?
Well now we are going to export an instance of our app right into it:

```javascript
;(function (root) {
 'use strict';
 
 function PubSub () {
 	this.topics = {};
 }
 
 PubSub.prototype.subscribe = function (name, fn) {
	this.topics[name] = this.topics[name] || [];
	this.topics[name].push(fn);
 };
 
 PubSub.prototype.publish = function(name, args) {
 	this.topics[name] = this.topics[name] || [];
    this.topics[name].forEach(function(fn) {
      fn.apply(this, args);
    });
 };
 
 root.PubSub = new PubSub();
 
} (window));
```

Our pub sub its ready to use! Lets write some examples now. 
I'm going to register a subscribe named __"foo"__ which will execute a callback and logs a simple text and the arguments `a` and `b`:

```javascript
PubSub.subscribe('foo', function (a, b) {
  console.log('foo callback', a, b)
});

```

Now I'm going to send a message named __"foo"__ to my [pubsub][pubsub] and pass some arguments into it:

```javascript
PubSub.subscribe('foo', function (a, b) {
  console.log('hey there, thats foo callback ', a, b)
});

PubSub.publish('foo', ['arg A', 'arg b']); // log: foo callback "myargument A" "arg b"

```
And thats it :)


## Conclusion

By using a pubsub you can write your code in single modules and make those "talk" to each and keep your logic doing exactly what it should :)

You can get a gist [here](https://gist.github.com/weslleyaraujo/c906b58a89bf82032ae6).

[pubsub]: http://en.wikipedia.org/wiki/Publish–subscribe_pattern
[iife]: http://en.wikipedia.org/wiki/Immediately-invoked_function_expression