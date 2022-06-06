/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//Variables
const qwerty = document.getElementById("qwerty");
const keys = qwerty.getElementsByTagName("button");
const resetButton = document.getElementById("btn__reset");

//Instantiates new game object
resetButton.addEventListener("click", () => {
  game = new Game();
  game.startGame();
});

//If e.target has class of "key," e.target is passed to game object's handleInteraction() method as an argument
qwerty.addEventListener("click", (e) => {
  if (e.target.className === "key") {
    game.handleInteraction(e.target);
  }
});

//Adds keyboard funtionality on keydown event only if key pressed is in the on-screen keyboard...
document.addEventListener("keydown", (e) => {
    [...keys].forEach(key => {
        if (e.key === key.innerText && key.disabled === false) { //...and has not already been pressed (guessed)
            game.handleInteraction(key);
        }
    });

});