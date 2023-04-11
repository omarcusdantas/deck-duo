let pointsNeeded, turns, points, seconds, minutes, secondsDisplay, minutesDisplay, intervalId;
let firstCard = '', secondCard = '';

const numberCards = document.querySelectorAll('.card-number');
numberCards.forEach(card => card.addEventListener('click', startGame));

function startGame() {
    turns = points = 0;

    this.classList.toggle('flip-number');
    const numberPairs = parseInt(this.innerHTML)/2;
    pointsNeeded = numberPairs;
    fetchCards(numberPairs);
}

async function fetchCards(numberPairs) {
    try {
        const response1 = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data1 = await response1.json();
        const deckId = data1.deck_id;

        const response2 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberPairs}`);
        const data2 = await response2.json();
        const cards = data2.cards;

        createPairs(cards);
    } catch (error) {
        console.error(error);
    }
}

function createPairs(cards){
    const listCards = cards.concat(cards);
    listCards.sort(randomShuffle);
    renderCards(listCards);
}

function randomShuffle() {
    return Math.random() - 0.5;
}

function renderCards(listCards) {
    const cardImages = listCards.map(card => card.image)
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML='';

    for (let i = 0; i < cardImages.length; i++) {
        cardsContainer.innerHTML += `
            <li class="card">
                <img class="front-face" src=${cardImages[i]} alt="front of the card">
                <img class="back-face" src="./src/img/back.png" alt="back of the card">
            </li>
            `;
    }
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', manageGame));
    startCounter();
}

function startCounter() {
    seconds = 0;
    minutes = 0;
    intervalId = setInterval(updateCounter, 1000);
}

function updateCounter() {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    minutesDisplay = minutes.toString().padStart(2, "0");
    secondsDisplay = seconds.toString().padStart(2, "0");
    document.querySelector("h4").innerText = `${minutesDisplay}:${secondsDisplay}`;
}

function flipCard(card) {
    card.classList.toggle('flip');
}

function manageGame() {  
    if (firstCard !== '' && secondCard !== '') {
        return;
    }
    else if (firstCard === '') {
        flipCard(this);
        firstCard = this;
        return;
    } 
    else if (firstCard === this) {
        return;
    }
  
    flipCard(this);
    secondCard = this;
    turns++;
    setTimeout(compareCards, 1000);
}

function compareCards() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard = secondCard = '';
        managePoints();
        return;
    }
  
    flipCard(firstCard);
    flipCard(secondCard);
    firstCard = secondCard = '';
}

function managePoints() {
    points++;

    if (points === pointsNeeded) {
      alert(
        `Você ganhou em ${turns} jogadas!`
      );
    }
}