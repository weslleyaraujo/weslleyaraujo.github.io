---
layout: post
title:  "Sorting a Backbone.js collection"
date:   2015-01-01 18:57:00
categories: backbone
tags: javascript
image: /assets/article_images/2015-01-01-sorting-a-backbone-collection/sheeps.jpg
comments: true
---
  

If you know some about [Backbone.js][Backbone.js] you also probably know that it offers you something pretty cool which are the [collections][collections]. Those are kind of a wrapper for dealing with [models](models) in a easy way giving you awesome features, and one of those features is that you can sort those models to proper work with. I'm gonna talk about the `comparator` method and what it can help you.  

Let's start creating a piece of code, a very simple Backbone collection:

```javascript
var CarsCollection = Backbone.Collection.extend();

var cars = new CarsCollection();
        
```
Well done,  
now we have our collection ready to add some data into it:

```javascript
var CarsCollection = Backbone.Collection.extend();

var cars = new CarsCollection();

cars.add({ name: 'Gol', year: 1998 });
cars.add({ name: 'Camaro', year: 2012 });
cars.add({ name: 'Palio', year: 2014 });
cars.add({ name: 'Ferrari', year: 2011 });
cars.add({ name: 'Fusca', year: 1998 });
        
```

Okay now our collection has some data and it can do some tricks, let's starting by retrieving only the year attribute from it. We are going to use the [`pluck`][pluck] method, that basically plucks an attribute from the collection and returns in a array. 

So what we get is this:  

```javascript  
cars.pluck('year'); // [1998, 2012, 2014, 2011, 1998]
cars.pluck('name'); // ["Gol", "Camaro", "Palio", "Ferrari", "Fusca"]

```

Notice that by the log of the name and the year we can see that this collection is sorted in the same way we added those items above, lets now write your `comparator` to make it work in a different way:

```javascript
var CarsCollection = Backbone.Collection.extend({
  comparator: function (a) {
    return a.get('year');
  }

});

var cars = new CarsCollection();

cars.add({ name: 'Gol', year: 1998 });
cars.add({ name: 'Camaro', year: 2012 });
cars.add({ name: 'Palio', year: 2014 });
cars.add({ name: 'Ferrari', year: 2011 });
cars.add({ name: 'Fusca', year: 1998 });
        
```

and now using [`pluck`](pluck) let's see what happened:

```javascript
cars.pluck('year'); // [1998, 1998, 2011, 2012, 2014]
cars.pluck('name'); // ["Gol", "Fusca", "Ferrari", "Camaro", "Palio"]

```  

Awesome! In very a simple line of code we made this collection be sorted by the year attribute... But how does that work?  

The `comparator` is called everytime you add an in item to the collection or by calling `sort()`. It will automatically receives two parameters, and those are the models which you can compare with. In our case we just had to return the chosen attribute and Backbone does the trick.  
 
But lets say we need some more logic here, maybe if we also need to sort those cars alphabetically by the name, how do we do that?  

You can see that comparator works in a very similar way with the [`Array.prototype.sort`][ArraySort], that basically you have to return a number positive, negative, or 0 for a equal sort . You can read more about this awesome method [here][ArraySort].

So to do that our `comparator` should be written like this:

```javascript
var CarsCollection = Backbone.Collection.extend({
  comparator: function (a, b) {
      var year = a.get('year') - b.get('year');
      if (year === 0) {
          return a.get('name') < b.get('name') ? -1 : 1;
        }

      return year;
  }
});

var cars = new CarsCollection();
      
cars.add({ name: 'Gol', year: 1998 });
cars.add({ name: 'Camaro', year: 2012 });
cars.add({ name: 'Palio', year: 2014 });
cars.add({ name: 'Ferrari', year: 2011 });
cars.add({ name: 'Fusca', year: 1998 });
 
``` 

And now if we [`pluck`](http://backbonejs.org/#Collection-pluck) our data:

```javascript 
cars.pluck('year'); // [1998, 1998, 2011, 2012, 2014]
cars.pluck('name'); // ["Fusca", "Gol", "Ferrari", "Camaro", "Palio"]

```   

We did it! Now our data are sorted by year and by the name of the car!  

First we subtract the `a` year by the `b` year, and if the result its not zero (which would be zero if those are the same) we just return this subtraction result, in the other hand we need to get the name of those models and compare them, returning which one should be on first place than the other, and voilà we did exactly what we wanted.

## Conclusion

Backbone has lots and lots of tricks, and the best part of it is that those tricks are nothing like magic, if you understand javascript you could quickly read this code and in minutes you would know what is going on.I believe that some kind of data sorting should be on the server side, but if you ever need to do that in the client side it's also easy to do.

If you wanna learn more of those Backbone tricks I highly recommend the [Advanced Backbone Patterns and Techniques](http://code.tutsplus.com/courses/advanced-backbone-patterns-and-techniques) from [Tutsplus](http://code.tutsplus.com/).

[Backbone.js]: http://backbonejs.org
[collections]: http://backbonejs.org/#Collection
[models]: http://backbonejs.org/#Model
[pluck]: http://backbonejs.org/#Collection-pluck
[ArraySort]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
