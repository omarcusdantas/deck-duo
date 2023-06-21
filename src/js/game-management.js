// Declare variables
let firstCard = null;
let secondCard = null;

// Function to toggle the visibility of game screens
function changeScreen() {
    document.querySelector(".counter").classList.toggle("hide");
    document.querySelector(".end-game").classList.toggle("hide");
    cardsContainer.classList.toggle("hide");
}

// Function to restart the game
function restart() {
    cardsContainer.innerHTML = "";

    for (let i = 4; i <= 24; i += 2) {
        const cardNumberElement = document.createElement('li');
        cardNumberElement.classList.add('card-number');
        
        if (i > 20) {
            cardNumberElement.classList.add('limit-cards');
        }
        
        const cardNumberText = document.createTextNode(i);
        cardNumberElement.appendChild(cardNumberText);
        
        cardsContainer.appendChild(cardNumberElement);
    }

    prepareGame();
    changeScreen();
}

// Function to cancel the restart confirmation
function cancel() {
    document.querySelector(".restart").classList.add("hide");
    document.querySelector("#restart-question").classList.add("hide");
}

// Function to handle game completion
function gameCompleted() {
    counter.innerText = "00:00";

    let congratulationsMessage = document.querySelector("#result");

    if (minutes === 0) {
        congratulationsMessage.innerText = `You finished in ${seconds} seconds, with ${turns} turns. Well done!`;
        changeScreen();
        return;
    } else if (minutes === 1) {
        congratulationsMessage.innerText = `You finished in 1 minute and ${seconds} seconds, with ${turns} turns. Well done!`;
        changeScreen();
        return;
    }

    congratulationsMessage.innerText = `You finished in ${minutes} minutes and ${seconds} seconds, with ${turns} turns. Well done!`;
    changeScreen();
}

// Function to manage points when cards match
function managePoints() {
    points++;
    const timeCompleteGame = 1000;

    if (points === pointsNeeded) {
        clearInterval(intervalId);
        setTimeout(gameCompleted, timeCompleteGame);
    }
}

// Function to flip a card
function flipCard(card) {
    card.classList.toggle("flip");
}

// Function to reset flipped cards
function resetCards() {
    flipCard(firstCard);
    flipCard(secondCard);
    firstCard = null;
    secondCard = null;
}

// Function to compare flipped cards and check for match
function compareCards() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.removeEventListener("click", manageCards);
        secondCard.removeEventListener("click", manageCards);
        firstCard = null
        secondCard = null;
        managePoints();
        return;
    }

    const timeResetCards = 1000;
    setTimeout(resetCards, timeResetCards);
}

// Function to handle click on a card
function manageCards() {
    if (firstCard !== null && secondCard !== null) {
        return;
    }

    else if(firstCard === null) {
        console.log("oi");
        firstCard = this;
        flipCard(this);
        return;
    }

    else if(secondCard === null && this !== firstCard) {
        secondCard = this;
        flipCard(this);
        compareCards();
        return;
    }
}