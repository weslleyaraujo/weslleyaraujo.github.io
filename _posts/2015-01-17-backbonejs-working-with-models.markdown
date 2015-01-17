---
layout: post
title:  "Backbone.Js: Working with models"
date:   2015-01-17 19:50:00
categories: backbone
tags: javascript
image: /assets/article_images/2015-01-17-backbonejs-working-with-models/lights.jpg
comments: true
---
  

[Backbone.Js][BackboneJS] is a really flexible javascript library that helps you to structure you applications with data/view decouple, data-binding and events.  

And one great thing of it is the [Models][Models] layer, which was made for you to manage all your data. It's very easy how you can use it, let's see a quick example:

```javascript
var UserModel = Backbone.Model.extend({
  defaults: {
    firstName: '',
    lastName: '',
    birthDate: '' 
  }

});

var user = new UserModel({
  firstName: 'Bruce',
  lastName: 'Wayne',
  birthDate: '1980-02-19'
});

user.get('firstName'); // "Bruce"
```
  
We just created a simple model to store users information as you can see. There is some attributes as the `defaults` of our model and let's say that this is all the data we have from our server side. But what if our view requires the `fullname` of the user, and it also requires the date of birth in another format? How to deal with that?

For each Backbone layer (such as Models, Views, Router, etc)  we can write a method called `initialize` that will act exactly as a constructor and will be executed as we instantiate the class. In this
case we want to parse our model data to obtain the extra attributes.   

Let's start by adding those extra keys in our model `defaults` :

```javascript
var UserModel = Backbone.Model.extend({
  defaults: {
    firstName: '',
    lastName: '',
    birthDate: '',

    // extra information
    formatedDate: '',
    fullName: ''
  }

});
```

Just by doing this you are making sure that even if something goes wrong in the process the view will never broke by trying to get any `undefined` data from our model.

Now let's create the `fullName` attribute:  

```javascript
var UserModel = Backbone.Model.extend({
  defaults: {
    firstName: '',
    lastName: '',
    birthDate: '',

    // extra information
    formatedDate: '',
    fullName: ''
  },

  initialize: function () {
    this.set('fullName', this.get('firstName') + ' ' + this.get('lastName'));
  }
});

var user = new UserModel({
  firstName: 'Bruce',
  lastName: 'Wayne',
  birthDate: '1980-02-19'
});

user.get('fullName'); // "Bruce Wayne"
```

Our `fullName` is now done. The next step now is the `formatedDate` attribute! In this case we want to display the `birthDate` in the Brazilian date format (dd/mm/YYYY), let's write it in a simple line fo code:  

```javascript
var UserModel = Backbone.Model.extend({
  defaults: {
    firstName: '',
    lastName: '',
    birthDate: '',

    // extra information
    formatedDate: '',
    fullName: ''
  },

  initialize: function () {
    this.set('fullName', this.get('firstName') + ' ' + this.get('lastName'));
    this.set('formatedDate', this.get('birthDate').split('-').reverse().join('/'));
  }
});

var user = new UserModel({
  firstName: 'Bruce',
  lastName: 'Wayne',
  birthDate: '1980-02-19'
});

user.get('formatedDate'); // "19/02/1980"
```

Done! We have our data just like it is supposed to be in a simple line of code. I would also recommend to write those data manipulation in different methods for each other (which soon will be easier to write tests for it).

And the final version would be like this:

```javascript
var UserModel = Backbone.Model.extend({

  defaults: {
    firstName: '',
    lastName: '',
    birthDate: '',
    formatedDate: '',
    fullName: ''
  },

  initialize: function () {
    this.setFullName();
    this.setDate();
  },

  setFullName: function () {
    this.set('fullName', this.get('firstName') + ' ' + this.get('lastName'));
  },

  setDate: function () {
    this.set('formatedDate', this.get('birthDate').split('-').reverse().join('/')));
  }
});

var user = new UserModel({
  firstName: 'Bruce',
  lastName: 'Wayne',
  birthDate: '1980-02-19'
});

user.get('fullname'); // "Bruce Wayne"
user.get('formatedDate'); // "19/02/1980"
```

## Conclusion

As we seen, its very easy to manipulate data using Backbone, and it's always good to keep those logic far away from the View layer. The [Models][Models] layer offers you many useful methods that can help you while you building your application. You can learn more from the official [documentation][Models]!

[BackboneJS]: http://backbonejs.org
[Models]: http://backbonejs.org/#Model
