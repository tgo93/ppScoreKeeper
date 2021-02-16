// Ping Pong Score Keeper

// Player object construction
const p1 = {
    name: 'Player One',
    score: 0,
    display: document.querySelector('#p1Display'),
    button: document.querySelector('#p1Button')
}

const p2 = {
    name: 'Player Two',
    score: 0,
    display: document.querySelector('#p2Display'),
    button: document.querySelector('#p2Button')
}

// Non player object references
const resetButton = document.querySelector('#resetButton');
const playingToSelect = document.querySelector('#playingTo');

// Default end-game limit
let playingTo = 3;

// Game status handling
let isGameOver = false;

// Indicates winner of game, disables score increase buttons
function endGame(player, opponent) {
    player.button.disabled = true;
    opponent.button.disabled = true;

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
    }
}

// Calculates scores, handles win conditions
function updateScores(player, opponent) {
    if(!isGameOver) {
        player.score ++;
        if (player.score === playingTo) {
            isGameOver = true;
            endGame(player, opponent);
        }
        player.display.textContent = player.score;
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

// Allows players to select a score limit
playingToSelect.addEventListener('change', function(e) {
    playingTo = parseInt(this.value);
    reset();
})