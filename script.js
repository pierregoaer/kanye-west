const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const kanyes = document.querySelectorAll('.kanye');
const startButton = document.querySelector('.start-button');
const difficulties = document.querySelectorAll('.difficulty');
const difficultySelector = document.querySelector('.difficulty-selector');
let lastHole, score;
let difficulty = [];
let timeUp = true;

const easy = [800, 2000];
const medium = [500, 1500];
const hard = [200, 1000];

// Select difficulty level
function setDifficulty() {
	const element = this === window ? document.querySelector('.easy') : this;
	// const element = this;
	const elementCoords = {
		width: element.getBoundingClientRect().width,
		height: element.getBoundingClientRect().height,
		left: element.getBoundingClientRect().left + window.scrollX,
		top: element.getBoundingClientRect().top + window.scrollY,
	};

	difficultySelector.style.width = `${elementCoords.width}px`;
	difficultySelector.style.height = `${elementCoords.height}px`;
	difficultySelector.style.transform = `translate(${elementCoords.left}px, ${elementCoords.top}px)`;

	if (element.dataset.difficulty === 'easy') difficulty = easy;
	if (element.dataset.difficulty === 'medium') difficulty = medium;
	if (element.dataset.difficulty === 'hard') difficulty = hard;

	// Does not work because dataset.difficulty is a string
	// difficulty = element.dataset.difficulty;
}

// Creation of a function that gives a random duration number between a min and a max. This number will be used to determine how long the kanye comes out for
function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// Function that randomly selects a hole for the kanye to come out of
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

// Function to make the kanye peep
function peep() {
	const time = randomTime(difficulty[0], difficulty[1]);
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

// Detect when we whack a kanye
function bonk(e) {
	if (!e.isTrusted) return; // To prevent fake clicks from happening ???
	score++;
	this.closest('.hole').classList.remove('up');
	scoreBoard.textContent = score;
}

kanyes.forEach(kanye => kanye.addEventListener('click', bonk));

startButton.addEventListener('click', startGame);
difficulties.forEach(difficulty => difficulty.addEventListener('click', setDifficulty));

// Initialize the difficulty selector, not sure why but calling the function without the setTimeout makes the selector takes the wrong shape
setTimeout(setDifficulty, 0);
// setDifficulty();
