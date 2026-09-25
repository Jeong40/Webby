# Webby
## Simple·Interactive·Customizable

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
You can add the following code to edite the character.

```HTML
<script>
  window.WebbyConfig = {
    //What you can add here (the following are the default values)
    //You don't need to add all of them if you only want to change some of them
    characterX: 10,
    characterY: 150,
    characterWidth: 200,
    characterURL: 'https://s1.imagehub.cc/images/2026/09/25/c7ba7d48838fde81e9bd0712e75d404e.png',

    chatboxWidth: 200,
    chatboxBorderRadius: 20，
    
    speakInterval: 5000,//5000 or longger is recommended
    
    //The following are the words your pet will say when opening your web
    midnightG: ['Why don&#146;t you sleep? Is there anything annoying you?', 'Go to sleep right now!', 'What are you doing in such a deep night?'],
    morningG: ['Good morning!', 'You wake up so early!'],
    noonG: ['Have you ever eaten yet?', 'What do you think of the meal just now'],
    afternoonG: ['Take a rest and begin to work again!', 'Good afternoon!', 'Did you have a good rest?'],
    eveningG: ['Good evening visitor!', "It is evening now"],
    nightG: ['You work so hard! Why not take a rest sometime', 'How many stars can you see in the sky?'],

    catchedWords: ['Hey! Put me down!', 'What are you doing!!!'],//speak when being catched
    boring: ['What are you doing here?', 'Is it a good day today?', 'Have you finished your work?', 'I feel so cryogenic~']
    //I feel so cryogenic
  }
</script>
```
