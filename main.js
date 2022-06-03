// const computerBoard = document.getElementById('computer-cards');
// const playerBoard = document.getElementById('player-cards');

// const dealBtn = document.getElementById('hit-btn');
// const stayBtn = document.getElementById('stay-btn');

// let playerPoint = 0;
// let computerPoint = 0;

// function firstDeal(who, whose) {
//     fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
//         .then(res => res.json())
//         .then(data => {
//             let cardValue = data.cards[0].value;
//             who.innerHTML = `<p class="drawn-card">${cardValue}</p>`
//             pointsCheck(whose, cardValue);
//         });
// }

// dealBtn.addEventListener('click', () => {
//     fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
//         .then(res => res.json())
//         .then(data => {
//             let cardValue = data.cards[0].value;
//             let newCard = document.createElement('p');
//             newCard.classList = "drawn-card";
//             newCard.textContent = `${cardValue}`
//             playerBoard.appendChild(newCard);
//             pointsCheck(playerPoint, cardValue);
//         });
// });

// function pointsCheck(whose, cardValue) {
//     if(isNaN(cardValue)) {
//         whose += 10;
//     } else {
//         whose += parseInt(cardValue);
//     }
// }

// firstDeal(computerBoard, computerPoint);
// firstDeal(playerBoard, playerPoint);

//************************************************************ */

let playerPoint = 0;
let computerPoint = 0;

const startGame = async (whose) => {
    let url = `https://deckofcardsapi.com/api/deck/new/draw/?count=1`;
    let res = await fetch(url);
    let data = await res.json();
    let cardValue = data.cards[0].value;
    // who.innerHTML = `<p class="drawn-card">${cardValue}</p>`
    // pointsCheck(whose, cardValue);
    if(isNaN(cardValue)) {
        whose += 10;
    } else {
        whose += parseInt(cardValue);
    }
}

startGame(playerPoint);
console.log(playerPoint);
// startGame(computerPoint);

