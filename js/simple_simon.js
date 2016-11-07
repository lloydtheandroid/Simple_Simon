/**
 * Created by lloyd on 11/5/16.
 */
(function () {

    "use strict";


    var indexOfSchwiftyMove = 0;
    var schwiftyCombo = [];
    var tempo;

    // Prevent Spinning div and head from being clicked on by accident
    document.getElementById("spinningDiv").style.pointerEvents = "none";

    function startGame() {
        $("#displayRounds").val("1"); //Start at round 1
        $("body").addClass("backgroundImage");
        $("#centerText").text("schwifty");
        // reset any other variables (round, delay, tempo)
        // zero out schwifty's Sequence
        schwiftyCombo = [];
        tempo = 1000;
        schwiftyMove(); // calls a function to randomly pick a square
    }

    function gameOver() {
        $("#centerText").text("GAME OVER");
        $("body").removeClass("backgroundImage");
        schwiftyCombo = [];
        indexOfSchwiftyMove = 0;
        disableUserInput();
    }

    function animate(selector) {
        $(selector).css("opacity", "0.2")
            .animate({
                opacity: "1.0"
            }, 500);
    }

    // randomly pick a square and add it to the end of Schwifty's Sequence
    function schwiftyMove() {
        var squares = ['#red', '#green', '#blue', '#yellow'];
        var random = Math.floor(Math.random() * 4);
        var randomSquare = squares[random];
        schwiftyCombo.push(randomSquare);

        playSchwiftyCombo();
    }

    function playSchwiftyCombo() {
        disableUserInput();

        var i = 0;
        var intervalId = setInterval(function() {
            animate(schwiftyCombo[i]);
            $(schwiftyCombo[i] + "Sound")
                .get(0).play();
            i++;
            if(i >= schwiftyCombo.length) {
                enableUserInput();
                clearInterval(intervalId);
            }
        }, tempo);

    }

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

    function updateRound() {
        var round = $("#displayRounds").val();
        round++;
        $("#displayRounds").val(round);
        switch(round) {
            case 1:
                tempo = 1000;
                break;
            case 5:
                tempo = 700;
                break;
            case 9:
                tempo = 500;
                break;
            case 13:
                tempo = 300;
                break;
        }
    }

    // start game when user clicks start button.
    $("#startButton").click(startGame);


    // enabling/disabling userClicks
    function enableUserInput() {
        // handle the user input when they click a square
        $("div[id]").click(function() {
            // animate the specific button the user clicked
            animate("#" + this.id);
            $("#" + this.id + "Sound")
                .get(0).play();
            // compare user input to all of schwifty's choices in order
            compare($(this).attr("id"));

        });
    }

    function disableUserInput() {
        $(".game_buttons").off('click');
    }
}());
