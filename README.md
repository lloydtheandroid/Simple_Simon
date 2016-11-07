<s>Simple</s> Schwifty Simon
============================

"It's time to get schwifty!"

Introduction
------------
**Schwifty Simon** is my first major [Codeup][1] project. The object of 
the project is to build a game using html, css, and javascript/jquery. 
I used an example codepen by [Ben Blood][4] as starting reference for 
my game. I have since modified my code, using guidance given to me from
my instructor. The final code barely resembles my Ben Blood's or my
original code. My intent was to build a game that looked like simon, but
with a humorous and slightly annoying twist. I used Rick and Morty as 
inspiration for this game.  

![Get Schwifty Screenshot](img/ScreenShot.png "Schwifty Simon")


Dependencies
------------
I originally intended to use [Bootstrap][2] for my project, however, 
it didn't allow me the styling I was looking for. I am using jquery for 
external dependencies and [Google Fonts][3] for my font stylings. I 
have created a css and javascript file for my styling and functions. 
All of my resources are stored in the following directories: 
 
 * Audio
 * img
 * css
 * js
 
Background
----------
On page load the audio "Show me what you got" will be played along with
a text animation. All of the animation on page load is built in css; I 
wanted to separate the static animation from the responsive animation. 
I felt that this would allow for easier troubleshooting. I had linked a 
[Boodstrap][2] CDN when I first started building this project, but it 
was conflicting with my css. I decided that I wasn't going to worry 
about this site being mobile friendly as it will likely only be played 
on a desktop.
 
The css and html is pretty straight forward. I debated how I wanted to 
format the CSS, I chose to group all like elements by type (elements, 
IDs, Class, and animation). 
 
The JavaScript/Jquery code gave was a challenge. I started with creating 
all the variables I thought I would need. I only kept about half of the 
original variables. The first function I created was the hover button. 
It was originally an addclass/removeClass but it was an issue later on 
when; the opacity wasn't changing when I hovered over a button was 
played. I believe it was conflicting with the .animate jquery function. 
I decided to change all of the buttons to animate instead of 
toggleClass. I also
 
```js
  //animate buttons on hover
     $('.game_buttons').hover(function() {
         $(this).animate({"opacity": ".5"}, 25);
     }, function() {
         $(this).animate({"opacity": "1"}, 25);
     });
 ```

I ended up scrapping this part of the code and went with an animate 
function that can be called by both user clicks and playSchwiftyCombo.

```js
 function animate(selector) {
    $(selector).css("opacity", "0.2")
        .animate({
            opacity: "1.0"
        }, 300);
}
```

**Referencing** someone else's [code][4] as a starting point proved to 
be more challenging than I thought. Although it allowed me to jump start 
my project, I decided that if I wanted to learn, I would have to make 
this project <i>somewhat</i> different. I did not want to use much of 
the original code. I created my own CSS and HTML for this. I originally 
did use some of the javascript, primarily the start button, the code for
clicking on the colored buttons, and the random number generator. 
However, this created issues for me. The biggest challenge was 
determining what functions where necessary and which parts where not 
needed. In the end, I scrapped much of the code after being shown that
much of the lines I was using weren't required. 


Usage
-----
The game starts by clicking on the **Start** button. After the button 
is clicked the following occurs:
1. The display changes to round 1
2. The background changes 
3. The function schwiftyCombo() runs, selecting the first color
4. Tempo is set to 1 Second
5. The function schwiftyMove() is played, animating on screen

```js
 function startGame() {
    $("#displayRounds").val("1"); //Start at round 1
    $("body").addClass("backgroundImage");
    $("#centerText").text("schwifty");
    // reset any other variables (level, delay, tempo)
    // zero out schwifty'sSequence
    schwiftyCombo = [];
    tempo = 1000;
    schwiftyMove(); // calls a function to randomly pick a square
}
```
    
After the schwifty code is played, it is the users turn to play. When 
user clicks a colored button, it first checks to see if it matches the 
schwifty code using the compare function. If the button click doesn't 
match, the game is over. If the clicks and the lengths match, the user
advances to the next round. As the rounds increase, the tempo will 
increase. 

```js
 function enableUserInput() {
     // handle the user input when they click a square
     $("div[id]").click(function() {
         // animate the specific button the user clicked
         animate("#" + this.id);
         $("#" + this.id + "Sound")
             .get(0).play();
         console.log($("#" + this.id + "Sound").get(0).play());
         // compare user input to all of schwifty's choices in order
         compare($(this).attr("id"));
 
     });
 }
```                        

The compare function was probably the best addition to my code. It 
allowed me to get rid of many lines of code. 

```js
function compare(color) {
    var userSelection = "#" + color;
    var currentSchwiftyMove = schwiftyCombo[indexOfSchwiftyMove];

    // userSelection matches currentSchwiftyMove
    if(userSelection == currentSchwiftyMove) {

        // comparing userInput to schwifty's very last selection
        if(indexOfSchwiftyMove == schwiftyCombo.length - 1) {
            indexOfSchwiftyMove = 0;
            schwiftyMove();
            updateRound();
        } else {
            indexOfSchwiftyMove++;
        }
    } else {
        gameOver();
    }
}
```
I did have an issue trying to figure out how to select the button IDs 
when the user clicked them. I had originally selected the class and 
which kept showing up as an object instead of an Array.  
```js
$(".game_buttons")
 ```

I then changed to selecting the div ID on user clicks which solved the 
issue. 
```js
$("div[id]")
```


[1]: http://codeup.com/    "Codeup"
[2]: http://getbootstrap.com/   "Bootstrap"
[3]: http://fonts.googleapis.com/   "Google Fonts"
[4]: http://codepen.io/BenLBlood/pen/LGLEoJ  "Ben Blood Codepen"

