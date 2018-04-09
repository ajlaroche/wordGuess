module.exports = function Letter(character, guess) {
    this.character = character;
    this.guess = guess;
    this.pick = function (userGuess) {        //This is used to test characters within the word.js file
        if (userGuess === this.character) {
            this.guess = true;
        }
    };
    this.flip = function () {           // This function is used to changed guess value with the word.js file
        if (this.guess == true) {
            return this.character;
        } else if (this.character === " ") {
            return " ";
        } else {
            return "_ ";
        }
    };
}

