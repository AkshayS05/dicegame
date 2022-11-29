'use strict';
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const p1 = document.querySelector('#p1--0');
const p2 = document.querySelector('#p1--1');
const score1El = document.getElementById('points--0');
const score2El = document.getElementById('points--1');
const diceEl = document.querySelector('#dice');
const btnNew = document.querySelector('#new-game');
const btnRoll = document.querySelector('#roll-dice');
const btnhold = document.querySelector('#hold');
const current0El = document.getElementById('current-score--0');
const current1El = document.getElementById('current-score--1');
// const holdEl = document.getElementById('hold');

score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');
let scores, currentScore, activePlayer, playing;
const refresh = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  p1.textContent = 'Player 1';
  p2.textContent = 'Player 2';
  p1.classList.remove('player--winner');
  p2.classList.remove('player--winner');
  p1.classList.add('player--active');
  p2.classList.add('player--active');
};
refresh();
const switchPlayer = function () {
  document.getElementById(`current-score--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('active');
  player1El.classList.toggle('active');
};
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);
    //3.Check for rolled 1
    if (dice != 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current-score--${activePlayer}`).textContent =
        currentScore;
      //change later;
    } else {
      //if true, switch to next player
      switchPlayer();
    }
  }
});
btnhold.addEventListener('click', function () {
  if (playing) {
    //add current score to the score of the active player
    scores[activePlayer] += currentScore;
    //scores[1]= scores[1]+ currentScore

    document.getElementById(`points--${activePlayer}`).textContent =
      scores[activePlayer];
    //check score is atleast 100
    //if then finish the game
    if (scores[activePlayer] >= 10) {
      document.getElementById(`p1--${activePlayer}`).textContent = 'Winner 🤴';
      document
        .getElementById(`p1--${activePlayer}`)
        .classList.add('player--winner');
      player0El.classList.remove('active');
      player1El.classList.remove('active');
      playing = false;
      // btnRoll.classList.add('not-active');
      // btnhold.classList.add('not-active');
    } else {
      //3.switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', refresh);
