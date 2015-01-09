---
layout: post
title:  "Maintain your code consistency with EditorConfig"
date:   2015-01-08 23:12:00
categories: text-editor
tags: editorconfig
image: /assets/article_images/2015-01-08-maintain-your-code-consistency-with-editorconfig/html_paper.jpg
comments: true
---

  

Today I'm going to talk about something that really helped me in these days, a very simple and easy way to maintain the projects code consistency using a small tool called [EditorConfig](EditorConfig).
  
  
One known problem in some projects is to keep the code consistency of all the files as it should be. Lets explains that:   

Some people like to use `tabs` over than `spaces`, some people may be prefer to indent with size `4` and other people may use `2`, and everyone has your own text-editors choice...  

In a short time your project can become a real mess with all that difference!

The [EditorConfig][EditorConfig] it's a IDE plugin that is here to help you with that, and to use it its quite simple!  

Let's starting by creating a `.editorconfig` file in the root of your project with all the coding styles choices that you agree for the project.

## Configuring your code style  


To configure your `.editorconfig` file it's really easy, here is an example of how it would be:

```c
; this is a comment!
root = true

[*]
indent_style = space

```
  
Notice that we used the `[*]`, here is where you can specify the type (or event the name) of the file(s), and below comes your settings. You can even specify different configs from any kind of file:  


```c
; this is a comment!
root = true

[*]
indent_style = space
ident_size = 2
end_of_line = lf
charset = utf-8

[*.html]
indent_style = tabs

[Rakefile]
ident_size = 4

```

Okay we have our configurations sets, but how my IDE is going to use this?  

Download and install the right plugin for your favorite text-editor, and its done!

* [AppCode](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig)
* [Atom](https://github.com/sindresorhus/atom-editorconfig#readme)
* [Brackets](https://github.com/kidwm/brackets-editorconfig/)
* [Code::Block](https://github.com/editorconfig/editorconfig-codeblocks#readme)
* [Emacs](https://github.com/editorconfig/editorconfig-emacs#readme)
* [Geany](https://github.com/editorconfig/editorconfig-geany#readme)
* [Gedit](https://github.com/editorconfig/editorconfig-gedit#readme)
* [GitHub](https://github.com/RReverser/github-editorconfig#readme)
* [intelliJ](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig)
* [jEdit](https://github.com/editorconfig/editorconfig-jedit#readme)
* [Notepad++](https://github.com/editorconfig/editorconfig-notepad-plus-plus#readme)
* [PHPStorm](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig)
* [PyCharm](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig)
* [RubyMine](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig)
* [Sublime Text](https://github.com/sindresorhus/editorconfig-sublime#readme)
* [TextMate](https://github.com/Mr0grog/editorconfig-textmate#readme)
* [Vim](https://github.com/editorconfig/editorconfig-vim#readme)
* [Visual Studio](https://github.com/editorconfig/editorconfig-visualstudio#readme)
* [WebStorm](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig)

## Conclusion

In a very easy way you can provide enhancement to all developers code in your projects, and say good bye to a bunch of different code styles on your files :) 
  
You can learn more on the [official page][EditorConfig] of the project.

[EditorConfig]: http://editorconfig.org/

<p align="center">
  <a href="http://editorconfig.org/">
    <img src="/assets/article_images/2015-01-08-maintain-your-code-consistency-with-editorconfig/editorconfig-logo.png" />
  </a>
</p>

