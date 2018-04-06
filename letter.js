module.exports =  function Letter(character, guess) {
    this.character = character;
    this.guess = guess;
    this.pick = function (userGuess) {
        if (userGuess === this.character) {
            this.guess = true;
        } else {
            this.guess = false;
        }
    };
    this.flip = function () {
        if (this.guess == true) {
            return character;
        } else {
            return "-";
        }
    };
}

// module.exports = {
//     Letter: Letter
// }