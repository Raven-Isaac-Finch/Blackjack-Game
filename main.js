const computerBoard = document.getElementById('computer-cards');
const playerBoard = document.getElementById('player-cards');

const dealBtn = document.getElementById('hit-btn');
const stayBtn = document.getElementById('stay-btn');
const resetBtn = document.getElementById('reset-btn');
const notifText = document.getElementById('notif-text');

let playerPoint = 0;
let computerPoint = 0;
let checkCounter = 0;
let computerAceCounter = 0;
let playerAceCounter = 0;

const dealClickFunction = () => {deal(playerBoard)};
const stayClickFunction = () => {
    dealBtn.disabled = true;
    stayBtn.disabled = true;
    setTimeout(computerDecides, 1000);
    
    setTimeout(theWinnerCheck, 2000);
};

function startGame() {
    deal(computerBoard);
    deal(computerBoard);
    deal(playerBoard);
    deal(playerBoard);

    dealBtn.addEventListener('click', dealClickFunction);
    stayBtn.addEventListener('click', stayClickFunction);    
};

function deal(forWho) {
    fetch('https://deckofcardsapi.com/api/deck/os1rrc309dl2/draw/?count=1')
        .then(res => res.json())
        .then(data => {
            let cardValue = data.cards[0].value;
            let cardImage = data.cards[0].image;
            let card = document.createElement('img');
            card.src = cardImage;
            forWho.appendChild(card);
            checkCounter += 1;

            if(isNaN(cardValue) && cardValue !== "ACE" ) {
                forWho == playerBoard ? playerPoint += 10 : computerPoint += 10;
            } else if(cardValue === "ACE" ) {
                if(forWho == playerBoard) {
                    playerPoint += 11;
                    playerAceCounter += 1;
                } else if(forWho == computerBoard) {
                    computerPoint += 11;
                    computerAceCounter += 1;
                }
            } else {
                forWho == playerBoard ? playerPoint += parseInt(cardValue) : computerPoint += parseInt(cardValue);
            }

            blackjackCheck();
            loseCheck();

            console.log(data.remaining);
            console.log(`playerPoint: ${playerPoint}`);
            console.log(`computerPoint: ${computerPoint}`);

            if(checkCounter > 5 && forWho == computerBoard) {
                setTimeout(computerDecides, 1000);
            }
        });
};

function shuffleDeck() {
    fetch('https://deckofcardsapi.com/api/deck/os1rrc309dl2/shuffle');
};

function blackjackCheck() {
    if(checkCounter === 4 && playerPoint === 21 && computerPoint !== 21) {
        notifText.textContent = "You Won! You Have Blackjack!";
        fixBtns();
    } else if(checkCounter === 4 && playerPoint !== 21 && computerPoint === 21) {
        notifText.textContent = "You Lost! Computer Has Blackjack!";
        fixBtns();
    } else if (checkCounter === 4 && playerPoint === 21 && computerPoint === 21) {
        notifText.textContent = "It is a Natural Tie!";
        fixBtns();
    } else {
        return;
    }
}

function loseCheck() {
    if(playerPoint > 21) {
        if(playerAceCounter > 0) {
            playerPoint -= 10;
            playerAceCounter -= 1;
        } else {
            notifText.textContent = "You Lost! You Hit over 21!";
            fixBtns();
        }
    } else if(computerPoint > 21) {
        if(computerAceCounter > 0) {
            computerPoint -= 10;
            computerAceCounter -= 1;
        } else {
            notifText.textContent = "You Won! The Computer Hit over 21!";
            fixBtns();
        }
    } else {
        return;
    }
}

function theWinnerCheck() {
    if(computerPoint > playerPoint && computerPoint <= 21) {
        notifText.textContent = "You lost! Computer Has More Points";
        fixBtns();
    } else if(playerPoint > computerPoint) {
        notifText.textContent = "You Won! You Have More Points";
        fixBtns();
    } else if(playerPoint == computerPoint) {
        notifText.textContent = "It is a Tie!";
        fixBtns();
    } else {
        return;
    }
}

function clearGame() {
    playerPoint = 0;
    computerPoint = 0;
    checkCounter = 0;
    computerAceCounter = 0;
    playerAceCounter = 0;
    computerBoard.innerHTML = "";
    playerBoard.innerHTML = "";
    notifText.textContent = "";
    resetBtn.disabled = true;
    dealBtn.disabled = false;
    dealBtn.removeEventListener('click', dealClickFunction);
    stayBtn.disabled = false;
    stayBtn.removeEventListener('click', stayClickFunction); 
}

function fixBtns() {
    resetBtn.disabled = false;
    dealBtn.disabled = true;
    stayBtn.disabled = true;
}

function computerDecides() {
    console.log(`Stupid Computer Has ${computerPoint}`);
    if(computerPoint < 21) {
        if(computerPoint < playerPoint) {
            deal(computerBoard);
        } else if(computerPoint <= 15 && computerPoint < playerPoint) {
            deal(computerBoard);
        } else {
            return;
        }
    } else {
        return;
    }
}

resetBtn.addEventListener('click', () => {
    clearGame();
    shuffleDeck();
    const gameTimeout = setTimeout(startGame, 500);
});

shuffleDeck();
const gameTimeout = setTimeout(startGame, 500);