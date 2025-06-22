/*
  script.js - Emoji Memory Match Game logic
  Beginner-friendly JavaScript with comments
*/

// List of emojis to use (8 pairs = 16 cards)
const emojis = ['🐶', '🐱', '🍎', '⭐', '❤️', '🌸', '⚽', '🎵'];

// Get references to DOM elements
const gameBoard = document.querySelector('#game-board');
const restartBtn = document.querySelector('#restart-btn');
const winMessage = document.querySelector('#win-message');

let cardValues = [];
let flippedCards = [];
let matchedCards = 0;
let lockBoard = false; // Prevent clicking more than 2 cards

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Function to start or restart the game
function startGame() {
    // Create a new array with two of each emoji
    cardValues = emojis.concat(emojis);
    shuffle(cardValues);
    gameBoard.innerHTML = '';
    winMessage.textContent = '';
    flippedCards = [];
    matchedCards = 0;
    lockBoard = false;

    // Create card elements
    for (let i = 0; i < cardValues.length; i++) {
        // Create card container
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = i;

        // Create inner part for flip animation
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        // Front of card (shows emoji)
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.textContent = cardValues[i];

        // Back of card (hidden side)
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = '❓';

        // Build card structure
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        gameBoard.appendChild(card);

        // Add click event to each card
        card.addEventListener('click', onCardClick);
    }
}

// Function to handle card click
function onCardClick(event) {
    const card = event.currentTarget;
    const index = card.dataset.index;

    // Ignore if already matched, already flipped, or board is locked
    if (card.classList.contains('flipped') || lockBoard) {
        return;
    }

    // Flip the card
    card.classList.add('flipped');
    flippedCards.push(card);

    // If two cards are flipped, check for match
    if (flippedCards.length === 2) {
        lockBoard = true;
        const firstIndex = flippedCards[0].dataset.index;
        const secondIndex = flippedCards[1].dataset.index;
        const firstEmoji = cardValues[firstIndex];
        const secondEmoji = cardValues[secondIndex];

        if (firstEmoji === secondEmoji) {
            // It's a match! Keep them flipped
            matchedCards += 2;
            flippedCards = [];
            lockBoard = false;
            // Check if all pairs are matched
            if (matchedCards === cardValues.length) {
                winMessage.textContent = 'You Win! 🎉';
            }
        } else {
            // Not a match: flip back after 0.75s
            setTimeout(function() {
                flippedCards[0].classList.remove('flipped');
                flippedCards[1].classList.remove('flipped');
                flippedCards = [];
                lockBoard = false;
            }, 750);
        }
    }
}

// Restart button event
restartBtn.addEventListener('click', function() {
    startGame();
});

// Start the game when the page loads
startGame();
