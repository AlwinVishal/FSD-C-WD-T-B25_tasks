// Available card emojis (pairs)
const symbols = ["🍎","🍇","🍓","🍒","🍊","🍍","🥝","🍌"];
let cards = [...symbols, ...symbols];

const board = document.getElementById("gameBoard");
const restartButton = document.getElementById("restartButton");
const movesCounter = document.getElementById("movesCounter");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const popupRestart = document.getElementById("popupRestart");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0; // count of pairs found

// Shuffle cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create card elements
function generateBoard() {
  board.innerHTML = "";
  shuffle(cards);
  moves = 0;
  matchedPairs = 0;
  movesCounter.textContent = `Moves: 0`;
  popup.style.display = "none";

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="inner-card">
        <div class="front">${symbol}</div>
        <div class="back">❓</div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card, symbol));
    board.appendChild(card);
  });
}

// Flip logic
function flipCard(card, symbol) {
  const innerCard = card.querySelector(".inner-card");

  if (lockBoard || innerCard.classList.contains("flip")) return;

  innerCard.classList.add("flip");

  if (!firstCard) {
    firstCard = { card, symbol };
  } else {
    secondCard = { card, symbol };
    moves++; // increment moves on every pair attempt
    movesCounter.textContent = `Moves: ${moves}`;
    checkMatch();
  }
}

// Match check
function checkMatch() {
  if (firstCard.symbol === secondCard.symbol) {
    firstCard = secondCard = null;
    matchedPairs++;
    if (matchedPairs === symbols.length) {
      // Game finished
      setTimeout(() => {
        popupMessage.textContent = `🎉 You won the game in ${moves} moves!`;
        popup.style.display = "block";
      }, 1000);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.card.querySelector(".inner-card").classList.remove("flip");
      secondCard.card.querySelector(".inner-card").classList.remove("flip");
      firstCard = secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

// Restart game
restartButton.addEventListener("click", generateBoard);
popupRestart.addEventListener("click", generateBoard);

// Start game immediately
generateBoard();
