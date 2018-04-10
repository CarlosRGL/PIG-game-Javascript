/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
Hints to dev

1.- Create variables (score(array), active player, roundscore, dice(math function num 1-6))
2.- DOM manipulation -> document.querySelector
  2.1- select all the DOM elements
    -scores
    -set scores to 0 using JS and getElementById
  2.2 hide Dice at game starts (in JS)
  2.3 display dice when roll dice button is clicked use event Listener (click)
    -random number
    -change Dice img to match Dice math result
    -update round score if the rolled number was NOT 1 (GAME RULES)
      -use if / else (if dice > 1) add score
      -else change active player with ternary operators (? :)
        -reset round score
        -change active class to active plauer -> classList method toggle
        -display none Dice
  2.4 hold the roundScore at score array
    -add current score to global score
    -update the UI
    -check if player won the game
    -change to next player if active player dont won
    -hide Dice and circle active player (winner class)
3.- add functionality to new game button (init function)
  3.1 reset all scores / hide Dice
  3.2 change names to init state
  3.3 remove winner class and active class
  3.4 set player 0 to active player
4.- State variable -> is game playing
5.- DRY principle
*/

var scores, activePlayer, roundScore, dice, nextPlayer;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //Get Random number to the dice
    dice = Math.floor(Math.random() * 6) + 1;

    // Show Dice
    document.querySelector('.dice').style.display = 'block';

    // Change Dice img
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    // Add Score to Round score if dice isnt 1 else, change active player
    if (dice !== 1) {
      roundScore += dice;
      document.getElementById(
        'current-' + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add round score to global score
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!!!';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      document.querySelector('.dice').style.display = 'none';
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

// Create function Nextplayer
nextPlayer = function() {
  document.getElementById('current-' + activePlayer).textContent = '0';
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
};

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // Set Global score to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  // Set Round Score to 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Hide dice
  document.querySelector('.dice').style.display = 'none';

  document.getElementById('name-1').textContent = 'player 2';
  document.getElementById('name-0').textContent = 'player 1';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

  console.log('name-' + activePlayer);
}
