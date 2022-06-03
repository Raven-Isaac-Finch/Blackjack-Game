

//************************************************************ */

const computerBoard = document.getElementById('computer-cards');
const playerBoard = document.getElementById('player-cards');

const dealBtn = document.getElementById('hit-btn');
const stayBtn = document.getElementById('stay-btn');

let playerPoint = 0;
let computerPoint = 0;
let checkCounter = 0;

function startGame() {
    deal(computerBoard);
    deal(computerBoard);
    deal(playerBoard);
    deal(playerBoard);

    dealBtn.addEventListener('click', () => {deal(playerBoard)});


    
};

function deal(forWho) {
    fetch('https://deckofcardsapi.com/api/deck/os1rrc309dl2/draw/?count=1')
        .then(res => res.json())
        .then(data => {
            let cardValue = data.cards[0].value;
            let card = document.createElement('p');
            card.classList = "drawn-card";
            card.textContent = `${cardValue}`;
            forWho.appendChild(card);
            checkCounter += 1;

            if(isNaN(cardValue) && cardValue !== "ACE" ) {
                forWho == playerBoard ? playerPoint += 10 : computerPoint += 10;
            } else if(cardValue === "ACE" ) {
                forWho == playerBoard ? playerPoint += 11 : computerPoint += 11;
            } else {
                forWho == playerBoard ? playerPoint += parseInt(cardValue) : computerPoint += parseInt(cardValue);
            }

            blackjackCheck();

            console.log(data.remaining);
            console.log(`playerPoint: ${playerPoint}`);
            console.log(`computerPoint: ${computerPoint}`);
        });
};

function shuffleDeck() {
    fetch('https://deckofcardsapi.com/api/deck/os1rrc309dl2/shuffle');
};

function blackjackCheck() {
    if(checkCounter === 4 && playerPoint === 21 && computerPoint !== 21) {
        alert("You Won! You Have Blackjack!");
    } else if(checkCounter === 4 && playerPoint !== 21 && computerPoint === 21) {
        alert("You Lost! Computer Has Blackjack!");
    }
}

function loseCheck() {
    if(playerPoint >= 21) {
        alert("You Lost!");
    }
}

shuffleDeck();
const gameTimeout = setTimeout(startGame, 500);