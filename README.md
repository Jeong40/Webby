# Webby
## Simple Interactive Customizable

A personal website doesn't have to be just a collection of text and images.

It can have a little personality of its own.

## Simple

Only a line of code is needed to add it to your website.

```HTML
<script src="https://cdn.jsdelivr.net/gh/jeong40/Webby/Webby.js"></script>
```
## Interactive

You can drag it to any where you want and it may come back to the original position itself. You can actually use it to release stress!

## customizable
You can add the following code to edited the character.

```HTML
window.WebbyConfig = {
  //The customized data you want to add
}
```
What you can edit here:
Character:
```javascript
characterX //the distance between the left edge of the screen and the character
characterY //the distance between the bottom of the screen and the character
characterWidth //The width of your character
characterURL //The sptitesheet of your character
```

chat box:
```javascript
chatboxWidth //the width of the chat box
```
