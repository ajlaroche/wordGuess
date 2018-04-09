var Word = require("./word.js");
const chalk = require("chalk");
var inquirer = require("inquirer");

var wordLibrary = ["horse", "cowboys", "shotgun", "ranch", "cattle", "longhorn", "aggie", "rodeo", "dallas", "houston", "austin", "galveston bay", "barbecue", "bluebonnet", "padre island", "rio grande", "permian basin", "big bend", "corpus christi", "the alamo", "san antonio", "livestock", "lone star", "brisket"];

var randomWord = "";
var randomWordArr = [];
var chosenWord = "";
var numberGuesses = 0;
var guessCount = 0;
var checkGuesses = [];
var guessCheckResult = false;
var previousGuesses = "";
var guessRemaining = 0;
var wordPreview = [];
var initialDashes = "";
var randomStorage = [];

function startGame() {
    randomGenerator();
    randomWordArr = [];
    numberGuesses = randomWord.length + 10;
    for (var i = 0; i < randomWord.length; i++) {  //break up random word into array to be able to identify spaces
        randomWordArr[i] = randomWord.charAt(i);
    }
    for (var i = 0; i < randomWordArr.length; i++) {
        if (randomWordArr[i] === " ") {
            wordPreview[i] = " ";
        } else {
            wordPreview[i] = "_ ";
        }
        initialDashes += wordPreview[i] + " ";
    }
    console.log(chalk.bold("\nHere is your puzzle: " + initialDashes + " \n"));
    chosenWord = new Word(randomWord);
    guessCount = 0;
    checkGuesses = [];
    guessCheckResult = false;
    previousGuesses = "";
    initialDashes = "";
    getUserInput();
};

startGame();


function restartGame() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "decide",
            message: "Would you like to play again? (y/n) "
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
                message: "Please choose a letter",
                validate: function (input) {
                    if (input.length !== 1) {
                        console.log("\n\nPlease only enter 1 character\n");
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function (user) {
            checkRepeatGuesses(user.character);
            if (guessCheckResult === false) {
                chosenWord.testWword(user.character);
                var wordUpdate = chosenWord.shownWord();
            }
            if (wordUpdate === randomWord) {
                console.log(chalk.bold.green("\nCONGRATULATIONS! You found the word.\n"));
                restartGame();
            } else if (guessRemaining === 0 && guessCheckResult === false) {
                console.log(chalk.bold.red("\nSorry! You ran out of guesses. GAME OVER.\n"));
                restartGame();
            } else {

                getUserInput();
            }
        })
    }
}


// Function to generate random from word library but avoids repeating the same word before running through entire library
function randomGenerator() {
    randomWord = wordLibrary[Math.floor(Math.random() * wordLibrary.length)];
    if (randomStorage.length === 0) {
        var repeatTest = false;
    } else {
        var repeatTest = true;
    }

    while (repeatTest === true) {
        for (j = 0; j < randomStorage.length; j++) {
            if (randomWord === randomStorage[j]) {
                repeatTest = true;
                randomWord = wordLibrary[Math.floor(Math.random() * wordLibrary.length)];
                break;
            }
            if (j == randomStorage.length - 1) {
                repeatTest = false;
            }
        }
    }

    randomStorage.push(randomWord);

    if (randomStorage.length === wordLibrary.length) {
        randomStorage = [];
    }

    // console.log(randomWord);
    // console.log(randomStorage)
}



