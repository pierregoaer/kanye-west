const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('.start-button');
let lastHole, score;
let timeUp = true;

// Creation of a function that gives a random duration number between a min and a max. This number will be used to determine how long the mole comes out for
function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// Function that randomly selects a hole for the mole to come out of
function randomHole(holes) {
	const idx = Math.floor(Math.random() * holes.length);
	const hole = holes[idx];
	// If statement to make sure we're not in the same hole as we just were
	if (hole === lastHole) {
		return randomHole(holes);
	}

	lastHole = hole;
	return hole;
}

// Function to make the mole peep
function peep() {
	const time = randomTime(200, 1000);
	const hole = randomHole(holes);
	hole.classList.add('up');
	setTimeout(() => {
		hole.classList.remove('up');
		if (!timeUp) peep();
	}, time);
}

// function timeUp
function startGame() {
	scoreBoard.textContent = '0';
	score = 0;
	timeUp = false;
	peep();
	setTimeout(() => (timeUp = true), 10000);
}

// Detect when we whack a mole
function bonk(e) {
	if (!e.isTrusted) return; // To prevent fake clicks from happening ???
	score++;
	this.classList.remove('up');
	scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));

startButton.addEventListener('click', startGame);
