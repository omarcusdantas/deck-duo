// Declare variables
let firstCard = "",
    secondCard = "";
const restartButtom = document.querySelector("#restart-buttom");
const cancelButtom = document.querySelector("#cancel-buttom");

// Function to toggle the visibility of game screens
function changeScreen() {
    document.querySelector(".counter").classList.toggle("hide");
    document.querySelector(".end-game").classList.toggle("hide");
    cardsContainer.classList.toggle("hide");
}

// Function to restart the game
function restart() {
    cardsContainer.innerHTML = "";

    for (let i = 4; i <= 20; i += 2) {
        if (i <= 20) {
            cardsContainer.innerHTML += `<li class="card-number">${i}</li>`;
            continue;
        }
        cardsContainer.innerHTML += `<li class="card-number limit-cards">${i}</li>`;
    }

    restartButtom.removeEventListener("click", restart);
    cancelButtom.removeEventListener("click", cancel);

    prepareGame();
    changeScreen();
}

// Function to cancel the restart confirmation
function cancel() {
    document.querySelector(".restart").classList.add("hide");
    document.querySelector("#restart-question").classList.add("hide");

    restartButtom.removeEventListener("click", restart);
    cancelButtom.removeEventListener("click", cancel);
}

// Function to handle game completion
function gameCompleted() {
    counter.innerText = "00:00";

    restartButtom.addEventListener("click", restart);
    cancelButtom.addEventListener("click", cancel);
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

    if (points === pointsNeeded) {
        clearInterval(intervalId);
        setTimeout(gameCompleted, 1000);
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
    firstCard = secondCard = "";
}

// Function to compare flipped cards and check for match
function compareCards() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard = secondCard = "";
        managePoints();
        return;
    }

    setTimeout(resetCards, 1000);
}

// Function to handle click on a card
function manageCards() {
    if (firstCard !== "" && secondCard !== "") {
        return;
    } else if (firstCard === "") {
        flipCard(this);
        firstCard = this;
        return;
    } else if (firstCard === this) {
        return;
    }

    flipCard(this);
    secondCard = this;
    turns++;
    compareCards();
}