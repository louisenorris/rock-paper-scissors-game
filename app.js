const startGameBtn = document.getElementById('start-game-btn');
const rockSelectionBtn = document.getElementById('rock-btn');
const paperSelectionBtn = document.getElementById('paper-btn');
const scissorsSelectionBtn = document.getElementById('scissors-btn');
const selectionBtns = document.querySelectorAll('.choice-btn-container button')
const rightHand = document.querySelector('#right-hand img'); //player
const leftHand = document.querySelector('#left-hand img'); //computer
const scoreContainer = document.querySelector('.score-container');
const scoreContainerText = document.querySelector('.score-container h3');

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let gameIsRunning = false;
let playerChoice;
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;

// const gameOver = () => {
//     alert('game over')
// }

const getPlayerChoice = () => {
    console.log(event.target.value, 'chosen');
    rightHand.classList.add('animate');
    leftHand.classList.add('animate');
    // event.target.style.backgroundColor = 'rgb(160, 144, 196)';
    playerChoice = event.target.value;
    playRound(playerChoice);
}

rockSelectionBtn.addEventListener('click', getPlayerChoice);
paperSelectionBtn.addEventListener('click', getPlayerChoice);
scissorsSelectionBtn.addEventListener('click', getPlayerChoice);


const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return 'rock';
    } else if (randomValue < 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
};

// const startShake = () => {
//     debugger
//     rightHand.classList.add('animate');
//     leftHand.classList.add('animate');
//     debugger
// }

const changeHandImgs = () => {

}

const getWinner = (cChoice, pChoice) =>
    cChoice === pChoice 
    ? RESULT_DRAW 
    :  cChoice === 'rock' && pChoice === 'paper' ||
    cChoice === 'paper' && pChoice === 'scissors' ||
    cChoice === 'scissors' && pChoice === 'rock' 
    ? RESULT_PLAYER_WINS 
    : RESULT_COMPUTER_WINS;


const nextRound = () => {
    gameIsRunning = false;
    // for (btn of selectionBtns) {
    //     btn.style.backgroundColor = 'white';
    // }
    rightHand.classList.remove('animate');
    leftHand.classList.remove('animate');
}

const playRound = (playerChoice) => {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log('Game is starting...');
    // debugger
    // rightHand.classList.add('animate');
    // leftHand.classList.add('animate');
    const computerChoice = getComputerChoice();
    let winner;
    if (playerChoice) {
        console.log(computerChoice, playerChoice);
        rightHand.src = `assets/right_${playerChoice}.png`;
        leftHand.src = `assets/left_${computerChoice}.png`;
        winner = getWinner(computerChoice, playerChoice);
    } else {
        winner = getWinner(computerChoice);
    }
    let message =`You picked ${playerChoice || DEFAULT_USER_CHOICE}, computer picked ${computerChoice}, therefore you `
    if (winner === RESULT_DRAW) {
        message = message + 'had a draw.';
    } else if (winner === RESULT_PLAYER_WINS) {
        message = message + 'won!';
        playerScore++;
    } else {
        message = message + 'lost.';
        computerScore++;
    }
    currentRound++;
    console.log(message, 'round ' + currentRound);
    // console.log(`Player score: ${playerScore}. Computer score: ${computerScore}.`)
    gameIsRunning = false;
    scoreContainer.innerText = `Score: computer ${computerScore} player ${playerScore}`
    if (currentRound >= 3) {
        let result;
        computerScore === playerScore ? result = scoreContainer.innerText = `Game Over - it's a draw.`:
        computerScore > playerScore ? result = scoreContainer.innerText = `Game Over - Computer wins!` :
        result = scoreContainer.innerText = `Game Over - You win!`
        scoreContainer.append(result);
    } else {
        nextRound();
    }
};