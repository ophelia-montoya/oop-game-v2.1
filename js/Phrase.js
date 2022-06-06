/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

//Variables
let phrase = document.getElementById("phrase");
let listOfLetters = phrase.firstElementChild;

//Initiates a Phrase object literal
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase(); //sets phrase to lowercase
  }

//Creates an HTML string based on randomly selected phrase's characters (space vs letter)
  addPhraseToDisplay() {
    let phraseCharacters = this.phrase.split(""); //splits phrase into separate characters, including spaces
    let charactersHTML = ""; //initiates empty HTML string to build on
    phraseCharacters.map((character) => {
      if (character === " ") {
        charactersHTML += `<li class="space"> </li>`;
      } else {
        charactersHTML += ` <li class="hide letter ${character}">${character}</li>`;
      }
    });
    listOfLetters.innerHTML = charactersHTML; //HTML string added to ul, is displayed on screen
  }

  //If phrase includes letter selected, returns true
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }
 
  //If letter matches letter in activePhrase, changes class name to "show," revealing the letter
  showMatchedLetter(letter) {
    let matches = document.getElementsByClassName(`${letter}`);
    [...matches].forEach((match) => {
      match.classList.replace("hide", "show");
    });
  }
};
