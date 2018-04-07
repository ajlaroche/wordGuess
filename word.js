var Letter = require("./letter.js");

// var chosenWord = "dallas";
// var chosenWordBreak = [];



function wordConverter(chosenWord) {
    var hiddenWord = [];
    for (var i = 0; i < chosenWord.length; i++) {
        hiddenWord[i] = new Letter(chosenWord.charAt(i), false)
    }
    // console.log(hiddenWord);
    return hiddenWord;
};

function wordDisplay(hiddenWord) {
    var shownWord = "";
    for (var i = 0; i < hiddenWord.length; i++) {
        shownWord += hiddenWord[i].flip() + " ";
    }
    console.log("shownWord is " + shownWord);
    return shownWord;
}



module.exports = function Word(chosenWord) {
    this.hiddenWord = wordConverter(chosenWord);
    this.testWword = function (character) {
        for (var i = 0; i < this.hiddenWord.length; i++) {
            this.hiddenWord[i].pick(character);
        }
    }
    this.shownWord = function () {
        wordDisplay(this.hiddenWord);
    }

};

// wordConverter(chosenWord);
// wordDisplay(wordConverter(chosenWord));