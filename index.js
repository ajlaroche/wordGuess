var Word = require("./word.js");

var inquirer = require("inquirer");

var wordLibrary = ["horse", "cowboy", "shotgun", "ranch", "cattle", "longhorn", "aggie", "rodeo", "dallas", "houston", "austin", "galveston", "barbecue", "bluebonnet"];

var randomWord = "";
var chosenWord = "";
var numberGuesses = 0;
var guessCount = 0;
var checkGuesses = [];
var guessCheckResult = false;
var previousGuesses = "";
var guessRemaining = 0;
var wordPreview = [];
var initialDashes = "";

function startGame() {
    randomWord = wordLibrary[Math.floor(Math.random() * wordLibrary.length)];
    numberGuesses = randomWord.length + 10;
    console.log(randomWord);
    for (var i = 0; i < randomWord.length; i++) {
        wordPreview[i] = "_ ";
        initialDashes += wordPreview[i] + " ";
    }
    console.log("Here is your puzzle: " + initialDashes + " \n");
    chosenWord = new Word(randomWord);
    guessCount = 0;
    checkGuesses = [];
    guessCheckResult = false;
    previousGuesses = "";
    initialDashes = "";
    getUserInput();
};

startGame();

// console.log(chosenWord);
// console.log(chosenWord.shownWord());

function restartGame() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "decide",
            message: "Would you like to play again?"
        }
    ]).then(function (user) {
        if (user.decide == true) {
            startGame();
        } else {
            gameOver = true;
        }
    })
}

function checkRepeatGuesses(character) {
    for (var i = 0; i < previousGuesses.length; i++) {
        checkGuesses[i] = previousGuesses.charAt(i);
        if (character.toLowerCase() === checkGuesses[i].toLowerCase()) {
            guessCheckResult = true;
            console.log("You've already tried this letter" + "\nHere are your previous guesses: " + previousGuesses);
            { break; }
        } else {
            guessCheckResult = false;
        }
    }
    if (guessCheckResult === false) {
        guessCount++;
        previousGuesses += character.toUpperCase();
        console.log("\nPrevious guesses: " + previousGuesses);
    }
    guessRemaining = numberGuesses - guessCount;
    console.log("\nNumber of guesses remaining: " + guessRemaining + "\n");
}

function getUserInput() {
    var gameOver = false;
    guessRemaining = numberGuesses - guessCount;

    if (guessCount <= numberGuesses) {
        inquirer.prompt([
            {
                type: "input",
                name: "character",
                message: "Please choose a letter"
            }
        ]).then(function (user) {

            chosenWord.testWword(user.character);
            var wordUpdate = chosenWord.shownWord();
            // console.log(randomWord + " " + wordUpdate);
            if (wordUpdate === randomWord) {
                console.log("\nCONGRATULATIONS! You found the word.\n");
                restartGame();
            } else if (guessRemaining === 0) {
                console.log("\nSorry! You ran out of guesses. GAME OVER.\n")
                restartGame();
            } else {
                checkRepeatGuesses(user.character);
                getUserInput();
            }
        })
    }
}




