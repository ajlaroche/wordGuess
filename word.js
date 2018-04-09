var Letter = require("./letter.js");
const chalk = require("chalk");

// var chosenWord = "dallas";
// var chosenWordBreak = [];

var lastShownWord = "";
var winningWord = "";
var previousGuess = "";

//Converts target word to array for testing
function wordConverter(chosenWord) {
    var hiddenWord = [];
    for (var i = 0; i < chosenWord.length; i++) {
        hiddenWord[i] = new Letter(chosenWord.charAt(i), false)
    }
    // console.log(hiddenWord);
    return hiddenWord;
};

//function test user guess against word and prints result on screen
function wordDisplay(hiddenWord) {
    var shownWord = "";
    var firstTest = false;
    winningWord = "";

    for (var i = 0; i < hiddenWord.length; i++) {
        shownWord += hiddenWord[i].flip() + " ";
        winningWord += hiddenWord[i].flip();
        if (hiddenWord[i].guess == true) {   //used only for first test when there is no lastShownWord
            firstTest = true;
        }
    }

    if (shownWord === lastShownWord || firstTest == false) {
        console.log(chalk.red("\nINCORRECT!!!"));
    } else {
        console.log(chalk.green("\nCORRECT!!!"));
    }

    lastShownWord = shownWord;
    console.log(chalk.bold("\nHere is your puzzle: " + shownWord + "\n"));
    return shownWord;
}


// first convert random word to an array, then test user entered characters against array
module.exports = function Word(chosenWord) {
    this.hiddenWord = wordConverter(chosenWord);
    this.testWword = function (character) {
        previousGuess += character;
        for (var i = 0; i < this.hiddenWord.length; i++) {
            this.hiddenWord[i].pick(character);
        }
    }
    this.shownWord = function () {
        wordDisplay(this.hiddenWord);
        if (winningWord === chosenWord) {
            lastShownWord = "";
            previousGuess = ""
        }
        return winningWord;
    }

};

