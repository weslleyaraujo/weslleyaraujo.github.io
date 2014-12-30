---
layout: post
title:  "Dealing with multiple windows and files on VIM"
date:   2014-12-30 16:28:25
categories: vim text-editor resize edit
tags: vim
image: /assets/article_images/2014-12-30-dealing-with-multiple-windows-and-files-on-vim/cat-keyboard.jpg
---
  

As we know, vim is such a powerful text-editor available in most of all UNIX systems.  
And one thing that is kind of hard to deal is the windows manipulation (resizing, opening file, go to file, etc)  
Today Im gonna show you one of the commands that really made me more productive solving that problems.

__NOTE: THE COMMANDS ABOVE MUST BE EXECUTED IN THE [NORMAL MODE](http://en.wikibooks.org/wiki/Learning_the_vi_Editor/Vim/Modes) WHICH YOU CAN SIMPLE ENTER PRESSING `ESC`__  


## Opening files from anywhere  
  
  
One of the most useful command in vim is the `:edit`  
you can simple use it like `:edit <path-to-my-file>`  
or to make it more easier you can use it shortcut `:e <path-to-my-file>`



## Splitting screen
  
Another useful tool is the screen split which lets you create multiple files instances in the same screen.
You have two kinds:

* `:vsp` vertical split
* `:sp` split (horizontal)

the usage of those commands are very similar with the `:edit`,
you just have to indicate which is the path of the file to split like:  
  
  `:vsp <path-to-my-file>`
  
or the horizontal split like:
  
  `:sp <path-to-my-file>`
    
Using that you will be able to open, visualize and edit how many files do you want at the same time. But doing that you got to know how to move between split viewports.  

## Moving beetwen a split viewport

Splitting screen is a useful tool, but how do you move between those viewports?  
For that you can use the `ctrl + w` following by the chosen direction.  
For example, if you have two vertical viewports `:vsp`, you can use `ctrl + w ->` to focus on the right side, and then `ctrl + w <-` to go back to the left side.
This is called `:wincdm` and can find more about it [here](http://vim.wikia.com/wiki/Switch_between_Vim_window_splits_easily).

*funny fact is that `w` is to remind you `window`*

## Maximizing and restoring viewports

Another great feature is that you can maximise those viewport while you working to get a better view of the file.
For that you can simple use:  

* `ctrl + w _` for horizontals
* `ctrl + w |` for verticals.

To return all viewports to a equal size you can use `ctrl + =`

### Conclusion

Vim can be a great friend with time, and while you get used with it. Its a hard path to leave you favorite text editor to become a vim user, but once you do and start to discover all the power of this awesome editor it gets very easy and for sure it will improve your production.

