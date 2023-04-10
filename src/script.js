const cards = document.querySelectorAll('.card-number');

function startGame() {
    this.classList.toggle('flip-number');
    const numberPairs = parseInt(this.innerHTML)/2;
    fetchCards(numberPairs);
}

cards.forEach(card => card.addEventListener('click', startGame));

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
    console.log(cardImages);
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML='';

    for (let i = 0; i < cardImages.length; i++) {
        cardsContainer.innerHTML += `
            <li class="card" onclick="flipCard(this)">
                <img class="front-face" src=${cardImages[i]} alt="front of the card">
                <img class="back-face" src="./src/img/back.png" alt="back of the card">
            </li>
            `;
    }
}

function flipCard(card) {
    card.classList.toggle('flip');
}

  
