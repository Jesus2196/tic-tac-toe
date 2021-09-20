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
}

function renderBoard() {
    board.forEach(function (square, index) {
        squares[index].style.background = colors[square];
    });
    if (!winner) {
        heading.innerHTML = (`${colors[turn].toUpperCase()}'S TURN`);
    } else if (winner === "T") {
        heading.innerHTML = "Tie Game; There was NO winner...";
    } else {
        heading.innerHTML = (`${colors[turn]} IS THE WINNER`);
    }
}

function handleSquare(evt) {
    let index = parseInt(evt.target.id.replace("square", ""));
    if (board[index] || winner) return;
    board[index] = turn;
    turn *= -1;
    winner = gameWinner();
    renderBoard();
}

function gameWinner() {
    for (let i = 0; i < winCombos.length; i++) {
        if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
        if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
        if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
        if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
        if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
        if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
        if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
        if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
        winner = board[winCombos[i][0]];
    }
    // }
    // if (board.includes(null)) {
    //     winner = "T";
    // };
    renderBoard();
}