/*----- constants -----*/

let colors = {
    "1": "red",
    "-1": "blue",
    "null": "white",
}

let winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/

let board;
let turn;
let winner;

/*----- cached element references -----*/

let squares = document.querySelectorAll("td > div");
let heading = document.querySelector("h1");

/*----- event listeners -----*/

document.querySelector('table').addEventListener("click", handleSquare);
document.querySelector("button").addEventListener("click", init);

/*----- functions -----*/

init();

function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    renderBoard();
    renderMsg();
}

function renderBoard() {
    board.forEach(function (square, index) {
        squares[index].style.background = colors[square];
    });
}

function renderMsg() {
    if (!winner) {
        heading.innerHTML = (`${colors[turn].toUpperCase()}'S TURN`);
    } else if (winner === "T") {
        heading.innerHTML = "Tie Game; There was NO winner...";
    } else {
        heading.innerHTML = (`${colors[turn].toUpperCase()} IS THE WINNER`);
    }
}

function handleSquare(evt) {
    let index = parseInt(evt.target.id.replace("square", ""));
    if (board[index] !== null) return;
    board[index] = turn
    turn *= -1;
    winner = gameWinner();
    renderBoard();
    renderMsg();
}

function gameWinner() {
    winCombos.forEach(function (winCombo) {
        let total = board[winCombo[0]] + board[winCombo[1]] + board[winCombo[2]];
        if (Math.abs(total) === 3) {
            turn *= -1;
            winner = turn;
        } else {
            return;
        }
    })
    console.log(winner);
    return winner;
}
