let numberOfCardsChoice,
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

function updateCounter() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    const displayWidth = 2;
    minutesDisplay = minutes.toString().padStart(displayWidth, "0");
    secondsDisplay = seconds.toString().padStart(displayWidth, "0");
    counter.innerText = `${minutesDisplay}:${secondsDisplay}`;
}

function startCounter() {
    seconds = minutes = 0;
    intervalId = setInterval(updateCounter, 1000);
}

function renderCards(cards) {
    const cardsImages = cards.map((card) => card.image);
    cardsContainer.innerHTML = "";

    const cardsHTML = cardsImages.map(
        (cardImage) => `
        <li tabindex="0" role="button" class="card">
            <img class="front-face" src="${cardImage}" alt="front of the card">
            <img class="back-face" src="./src/img/back.png" alt="back of the card">
        </li>`
    );

    cardsContainer.innerHTML = cardsHTML.join("");

    const renderedCards = document.querySelectorAll(".card");
    renderedCards.forEach((card) => card.addEventListener("click", manageCards));
    startCounter();
}

function randomShuffle() {
    return Math.random() - 0.5;
}

function createPairs(cards) {
    const duplicatedCards = cards.concat(cards);
    duplicatedCards.sort(randomShuffle);
    renderCards(duplicatedCards);
}

async function fetchCards(numberOfPairs) {
    try {
        const newDeckRequest = await fetch(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        const newDeck = await newDeckRequest.json();
        const deckId = newDeck.deck_id;

        const drawRequest = await fetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfPairs}`
        );
        const drawnCards = await drawRequest.json();
        const cards = drawnCards.cards;

        createPairs(cards);
    } catch (error) {
        alert(error);
    }
}

function startGame() {
    turns = points = 0;
    this.classList.toggle("flip-number");

    const numberOfPairs = parseInt(this.innerHTML) / 2;
    pointsNeeded = numberOfPairs;
    fetchCards(numberOfPairs);
}

function prepareGame() {
    numberOfCardsChoice = cardsContainer.querySelectorAll(".card-number");
    numberOfCardsChoice.forEach((card) => card.addEventListener("click", startGame));
}

window.onload = function () {
    prepareGame();
};
