let board = Array(9).fill(null); // The board is a 1D array of size 9
let currentPlayer = 'X'; // Player starts as 'X'
let gameOver = false;

// Elements
const cells = document.querySelectorAll('.cell');
const messageDiv = document.getElementById('message');
const restartButton = document.getElementById('restart');

// Check if there is a winner or if the game is a draw
const checkWinner = (player) => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
        if (combination.every(index => board[index] === player)) {
            return true;
        }
    }
    return false;
};

// Handle user clicks
const handleClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (board[index] || gameOver) return; // Ignore if the cell is already taken or game is over

    // Mark the cell with the current player's symbol
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check for winner
    if (checkWinner(currentPlayer)) {
        gameOver = true;
        if (currentPlayer === 'X') {
            messageDiv.textContent = "Player won!";
        } else if (currentPlayer === 'O') {
            messageDiv.textContent = "Player lose!";
            messageDiv.style.color = 'red'; 
        }
        return;
    }

    // Check for a draw
    if (board.every(cell => cell !== null)) {
        gameOver = true;
        messageDiv.textContent = "It's a Draw!";
        messageDiv.style.color = 'grey';
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // If it's computer's turn ('O'), make a move
    if (currentPlayer === 'O' && !gameOver) {
        setTimeout(computerMove, 500); // Make computer move after a short delay
    }
};

// Computer makes a random move
const computerMove = () => {
    const emptyCells = board
        .map((value, index) => value === null ? index : -1)
        .filter(index => index !== -1);
    
    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomMove] = 'O';
    cells[randomMove].textContent = 'O';

    if (checkWinner('O')) {
        gameOver = true;
        messageDiv.textContent = "Player lose!";
        messageDiv.style.color = 'red';  
    } else if (board.every(cell => cell !== null)) {
        gameOver = true;
        messageDiv.textContent = "It's a Draw!";
        messageDiv.style.color = 'grey';
    } else {
        currentPlayer = 'X'; 
    }
};

const restartGame = () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => cell.textContent = ''); 
    messageDiv.textContent = '';
    messageDiv.style.color = ''; 
};

cells.forEach(cell => cell.addEventListener('click', handleClick));


restartButton.addEventListener('click', restartGame);
