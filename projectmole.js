let score = 0;
let timeLeft = 30;
let moleInterval;
let timerInterval;

const holes = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start-button');
const moleSound = document.getElementById('mole-sound');
const whackSound = document.getElementById('whack-sound');

// Create holes
for (let i = 0; i < 15; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.dataset.index = i;
    holes.appendChild(hole);
}

// Start the game
startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startButton.disabled = true;

    moleInterval = setInterval(showMole, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

// Show mole in a random hole
function showMole() {
    const holes = document.querySelectorAll('.hole');
    const randomIndex = Math.floor(Math.random() * holes.length);
    const mole = document.createElement('div');
    mole.classList.add('mole');
    holes[randomIndex].appendChild(mole);
    mole.style.display = 'block';
    moleSound.play();

    mole.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        whackSound.play();
        mole.remove();
    });

    setTimeout(() => {
        mole.remove();
    }, 1200);
}

// Update timer
function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(moleInterval);
        clearInterval(timerInterval);
        alert(`Game Over! Your score is ${score*10}`);
        startButton.disabled = false;
        moleSound.remove();
    }
}