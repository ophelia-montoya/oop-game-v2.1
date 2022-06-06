/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

//Variables
let letters = listOfLetters.children;
let overlay = document.getElementById("overlay");
let lives = document.querySelectorAll("#scoreboard img");

//Initiates a Game object literal
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [ //5 possible phrase objects
      new Phrase("Nothing compares to you"),
      new Phrase("Take me anywhere"),
      new Phrase("In the land of my dreams"),
      new Phrase("Black hearted love"),
      new Phrase("Words fail me"),
    ];
    this.activePhrase = null;
  }

  //Returns random phrase by passing in a randomNum[ber]
  getRandomPhrase() {
    let randomNum = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomNum].phrase;
  }

  //Resets game state after clicking on "Start Game" button
  startGame() {
    listOfLetters.innerHTML = ""; //Resets chosen/wrong/disabled keys
    [...keys].forEach((key) => {
      key.className = "key";
      key.disabled = false;
    });
    lives.forEach((life) => { //Resets lives/hearts for player
      life.src = "images/liveHeart.png";
    });

    overlay.style.display = "none";
    this.activePhrase = new Phrase(this.getRandomPhrase()); //Sets new active phrase
    this.activePhrase.addPhraseToDisplay(); 
  }

  //Checks if player has won game by checking if there are any hidden letters remaining
  checkForWin() {
    let hiddenLetters = 0;
    [...letters].forEach((l) => {
      if (l.className.includes("hide")) {
        hiddenLetters++;
      }
    });
    if (hiddenLetters === 0) {
      return true; //returns true if 0
    } else {
      return false;
    }
  }

  //If player selects letter not in phrase, removes a life
  removeLife() {
    lives[this.missed].src = "images/lostHeart.png";
    this.missed++;
    if (this.missed >= 5) {
      this.gameOver(false); //Game ends if 5+ misses
    }
  }

  //If player has won the game by revealing all letters, winning message is displayed
  gameOver(win) {
    let gameOverMessage = document.getElementById("game-over-message");
    if (win) {
      overlay.style.display = "flex";
      overlay.className = "win";
      gameOverMessage.innerText = "You won :) Woot woot!";
    } else {
      overlay.style.display = "flex";
      overlay.className = "lose";
      gameOverMessage.innerText = "You lost :( Try again?"; //Losing message if false 
    }
  }

  //Compares button (with class) to letters in active phrase and...
  handleInteraction(button) {
    button.disabled = true;
    if (this.activePhrase.phrase.includes(button.innerHTML)) {
      button.className = "chosen"; //sets the class to "chosen" if true 
      this.activePhrase.showMatchedLetter(button.innerHTML); 

      if (this.checkForWin()) { //if all characters matched, game ends
        this.gameOver(true); 
      }
    } else {
      button.className = "wrong"; //else sets class to "wrong" 
      this.removeLife(); 
    }
  }
};
