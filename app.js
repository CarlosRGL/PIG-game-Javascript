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
3.- DRY principle


*/
