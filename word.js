var Letter = require("./letter.js");

var chosenWord = "dallas";
var chosenWordBreak = [];
var hiddenWord = [];
var shownWord = "";

for (var i = 0; i < chosenWord.length; i++) {
    chosenWordBreak[i] = chosenWord.charAt(i);
}
console.log(chosenWordBreak);

for (var i = 0; i < chosenWordBreak.length; i++) {
    hiddenWord[i] = new Letter(chosenWordBreak[i], false)
    shownWord += hiddenWord[i].flip() + " ";
}
console.log(shownWord);