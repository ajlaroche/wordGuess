var Word = require("./word.js");

var inquirer = require("inquirer");

var wordLibrary = ["horse", "cowboy", "shotgun", "ranch", "cattle", "longhorn", "aggie", "rodeo", "dallas", "houston", "austin", "galveston"];

var randomWord = "";

randomWord = wordLibrary[Math.floor(Math.random() * wordLibrary.length)];
console.log(randomWord);

var chosenWord = new Word(randomWord);

// console.log(chosenWord);
// console.log(chosenWord.shownWord());

inquirer.prompt([
    {
        type: "input",
        name: "character",
        message: "Please choose a letter"
    }
]).then(function (user) {

    chosenWord.testWword(user.character);
    chosenWord.shownWord();
})


