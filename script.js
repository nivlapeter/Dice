'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

//starting conditions
let scores, currentScore, activePlayer, playing;
const init = () => {
  scores = [0, 0]; // stores the scores of player 0 & 1
  currentScore = 0; // stores the current score
  activePlayer = 0; // gets the correct score of the active player
  playing = true; // boolean for active player

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

const switchPl = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the dice
btnroll.addEventListener('click', () => {
  if (playing) {
    //generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //checking if dice roll is 1
    if (dice !== 1) {
      //go to the next player
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //set score element dynamically based on the active player
      // current0El.textContent = currentScore; // display current score of the current player
    } else {
      //switch to the next player
      switchPl();
    }
  }
});

btnhold.addEventListener('click', () => {
  if (playing) {
    //Add current score to active players score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if score is greater than or equal to 100
    //finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the other player
      switchPl();
    }
  }
});

btnnew.addEventListener('click', init);
