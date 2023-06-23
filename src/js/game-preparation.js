// Declare variables
let numberCards,
    pointsNeeded,
    turns,
    points,
    seconds,
    minutes,
    secondsDisplay,
    minutesDisplay,
    intervalId;
const cardsContainer = document.querySelector(".cards-container");
const counter = document.querySelector("#timer");
const restartButtom = document.querySelector("#restart-buttom");
const cancelButtom = document.querySelector("#cancel-buttom");

// Function to update the counter for time tracking
function updateCounter() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    const displayFormatNumbers = 2;
    minutesDisplay = minutes.toString().padStart(displayFormatNumbers, "0");
    secondsDisplay = seconds.toString().padStart(displayFormatNumbers, "0");
    counter.innerText = `${minutesDisplay}:${secondsDisplay}`;
}

// Function to start the counter for time tracking
function startCounter() {
    seconds = minutes = 0;
    intervalId = setInterval(updateCounter, 1000);
}

// Function to render the cards on the page
function renderCards(listCards) {
    const cardImages = listCards.map((card) => card.image);
    cardsContainer.innerHTML = "";

    const cardHTML = cardImages.map((cardImage) => `
        <li tabindex="0" role="button" class="card">
            <img class="front-face" src="${cardImage}" alt="front of the card">
            <img class="back-face" src="./src/img/back.png" alt="back of the card">
        </li>`)
        .join('');

    cardsContainer.innerHTML = cardHTML;

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.addEventListener("click", manageCards));
    startCounter();
}

// Function for random shuffling of cards
function randomShuffle() {
    return Math.random() - 0.5;
}

// Function to create pairs of cards and shuffle them
function createPairs(cards) {
    const listCards = cards.concat(cards);
    listCards.sort(randomShuffle);
    renderCards(listCards);
}

// Function to fetch cards from Deck of Cards API
async function fetchCards(numberPairs) {
    try {
        const response1 = await fetch(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        const data1 = await response1.json();
        const deckId = data1.deck_id;

        const response2 = await fetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberPairs}`
        );
        const data2 = await response2.json();
        const cards = data2.cards;

        createPairs(cards);
    } catch (error) {
        alert(error);
    }
}

// Function to start the game
function startGame() {
    turns = 0;
    points = 0;
    this.classList.toggle("flip-number");

    const numberPairs = parseInt(this.innerHTML) / 2;
    pointsNeeded = numberPairs;
    fetchCards(numberPairs);
}

// Function to prepare the game
function prepareGame() {
    numberCards = cardsContainer.querySelectorAll(".card-number");
    numberCards.forEach((card) => card.addEventListener("click", startGame));
    restartButtom.addEventListener("click", restart);
    cancelButtom.addEventListener("click", cancel);
}

// Function to initialize the game on page load
window.onload = function () {
    prepareGame();
};