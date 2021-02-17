// Ping Pong Score Keeper

// Player object construction
const p1 = {
    name: 'Player One',
    score: 0,
    setScore: 0,
    display: document.querySelector('#p1Display'),
    setDisplay: document.querySelector('#p1SetDisplay'),
    button: document.querySelector('#p1Button')
}

const p2 = {
    name: 'Player Two',
    score: 0,
    setScore: 0,
    display: document.querySelector('#p2Display'),
    setDisplay: document.querySelector('#p2SetDisplay'),
    button: document.querySelector('#p2Button')
}

// Non player object references
const resetButton = document.querySelector('#resetButton');
const nextSetButton = document.querySelector('#nextSetButton');
nextSetButton.style.display = 'none';
nextSetButton.disabled = 'true';

const playingToSelect = document.querySelector('#playingTo');
const playingToSetSelect = document.querySelector('#playingToSet');
const setScoreDisplay = document.querySelector('#setScoreDisplay');
setScoreDisplay.style.display = 'none';

const message = document.querySelector('#message');

// Default end-game limit
let targetScore = 3;
let targetSet = 1;

// Game status handling
let isGameOver = false;
let isMultipleSets = false;

// Indicates winner of game, disables score increase buttons
function endGame(player, opponent) {
    player.button.disabled = true;
    opponent.button.disabled = true;
    nextSetButton.disabled = false;

    player.display.classList.add('has-text-success');
    opponent.display.classList.add('has-text-danger');
}

function reset() {
    isGameOver = false;

    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;

        p.setScore = 0;
        p.setDisplay.textContent = 0;
        p.setDisplay.classList.remove('has-text-success', 'has-text-danger');
    }
}

function nextSet() {
    isGameOver = false;

    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }

    nextSetButton.disabled = true;
}

// Calculates scores, handles win conditions
// Player must meet target score, and have two more points than opponent
function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score++;
        if (player.score >= targetScore) {
            if (player.score > opponent.score + 1) {
                isGameOver = true;
                endGame(player, opponent);

                if (isMultipleSets) {
                    if (player.setScore < targetSet) {
                        player.setScore++;

                        if (player.setScore === targetSet) {
                            player.setDisplay.classList.add('has-text-success');
                            opponent.setDisplay.classList.add('has-text-danger');
                            nextSetButton.disabled = true;
                        }
                    }
                }
            }
        }
        player.display.textContent = player.score;
        player.setDisplay.textContent = player.setScore;
    }
}

// Event listeners

// Player score buttons
p1.button.addEventListener('click', () => {
    updateScores(p1, p2)
});

p2.button.addEventListener('click', () => {
    updateScores(p2, p1)
});

// Reset buttons
resetButton.addEventListener('click', reset);
nextSetButton.addEventListener('click', nextSet);

// Allows players to select a score limit
playingToSelect.addEventListener('change', function (e) {
    targetScore = parseInt(this.value);
    reset();
});

// Allows players to select a SET score limit
playingToSetSelect.addEventListener('change', function () {
    targetSet = parseInt(this.value);

    if (targetSet === 1) {
        isMultipleSets = false;
        setScoreDisplay.style.display = 'none';
        nextSetButton.style.display = 'none';
    } else {
        isMultipleSets = true;
        setScoreDisplay.style.display = 'flex';
        nextSetButton.style.display = 'flex';
    }
    reset();
})