let firstCard = null;
let secondCard = null;
const restartButtom = document.querySelector("#restart-buttom");
const cancelButtom = document.querySelector("#cancel-buttom");

function changeScreen() {
    document.querySelector(".counter").classList.toggle("hide");
    document.querySelector(".end-game").classList.toggle("hide");
    cardsContainer.classList.toggle("hide");
}

function restartGame() {
    cardsContainer.innerHTML = "";

    const minNumberOfCards = 4;
    const maxNumberOfCards = 24;
    const maxNumberOfCardsForSmallScreens = 20;

    for (let i = minNumberOfCards; i <= maxNumberOfCards; i += 2) {
        const choiceOfCardsElement = document.createElement("button");
        choiceOfCardsElement.classList.add("card-number");

        if (i > maxNumberOfCardsForSmallScreens) {
            choiceOfCardsElement.classList.add("limit-cards");
        }

        choiceOfCardsElement.textContent = `${i}`;

        const listItemElement = document.createElement("li");
        listItemElement.appendChild(choiceOfCardsElement);
        cardsContainer.appendChild(listItemElement);
    }

    prepareGame();
    changeScreen();
}

function cancelRestart() {
    document.querySelector(".restart").classList.add("hide");
    document.querySelector("#restart-question").classList.add("hide");
}

function gameCompleted() {
    counter.innerText = "00:00";

    restartButtom.addEventListener("click", restartGame);
    cancelButtom.addEventListener("click", cancelRestart);

    let congratulationMessage = document.querySelector("#result");

    if (minutes === 0) {
        congratulationMessage.innerText = `You finished in ${seconds} seconds, with ${turns} turns. Well done!`;
        changeScreen();
        return;
    } else if (minutes === 1) {
        congratulationMessage.innerText = `You finished in 1 minute and ${seconds} seconds, with ${turns} turns. Well done!`;
        changeScreen();
        return;
    }
    congratulationMessage.innerText = `You finished in ${minutes} minutes and ${seconds} seconds, with ${turns} turns. Well done!`;
    changeScreen();
}

function managePoints() {
    points++;
    const waitTimeToCompleteGameInMs = 1000;

    if (points === pointsNeeded) {
        clearInterval(intervalId);
        setTimeout(gameCompleted, waitTimeToCompleteGameInMs);
    }
}

function flipCard(card) {
    card.classList.toggle("flip");
}

function resetCards() {
    flipCard(firstCard);
    flipCard(secondCard);
    firstCard = secondCard = null;
}

function compareCards() {
    turns ++;

    if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.removeEventListener("click", manageCards);
        secondCard.removeEventListener("click", manageCards);
        firstCard = secondCard = null;
        managePoints();
        return;
    }

    const timeToResetCardsInMs = 1000;
    setTimeout(resetCards, timeToResetCardsInMs);
}

function manageCards() {
    if (firstCard !== null && secondCard !== null) {
        return;
    } else if (firstCard === null) {
        firstCard = this;
        flipCard(this);
        return;
    } else if (secondCard === null && this !== firstCard) {
        secondCard = this;
        flipCard(this);
        compareCards();
        return;
    }
}
