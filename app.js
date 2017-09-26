/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // hide dice from view at the start of the application and scores sets to 0
  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//init the game
init();

// add event listener to the button to change number when clicking
document.querySelector(".btn-roll").addEventListener("click", function() {
  // check if we can play whit gameplaying function
  if (gamePlaying) {
    // 1. calculate a number between 1 - 6
    dice = Math.floor(Math.random() * 6 + 1);

    // 2. calculate result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. update the score IF the dice was NOT 1
    if (dice !== 1) {
      // add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      alert('you sort a 1!!! next player turn');
      nexPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add current score to global score
    console.log(scores[activePlayer]);
    scores[activePlayer] += roundScore;

    // update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= 20) {
      // show text if player won and hide dice
      document.getElementById("name-" + activePlayer).textContent = "winner!";
      document.querySelector(".dice").style.display = "none";

      // change class of winner panel to see custom css for winner and remove active class
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      //finish game
      gamePlaying = false;
    } else {
      nexPlayer();
    }
  }
});

function nexPlayer() {
  //next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //set current score to 0
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //change active class player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Hide dice when next player turn
  document.querySelector(".dice").style.display = "none";
}

// reload game with init function when clicking new game button
document.querySelector(".btn-new").addEventListener("click", init);
