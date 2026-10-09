const moves = ["rock", "paper", "scissors"];

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const roundNumberEl = document.getElementById("round-number");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const resultEl = document.getElementById("result");
const resetBtn = document.getElementById("reset-btn");
const moveButtons = document.querySelectorAll(".move-btn");

const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const tieSound = document.getElementById("tie-sound");

let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;

const emojis = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

function getRandomMove() {
  return moves[Math.floor(Math.random() * moves.length)];
}

function playSound(type) {
  const soundMap = {
    win: winSound,
    lose: loseSound,
    tie: tieSound,
  };

  const sound = soundMap[type];
  if (!sound) return;

  sound.currentTime = 0;
  sound.play().catch(() => {
    // Ignore autoplay restrictions until user interaction starts the game.
  });
}

function updateScoreDisplay() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  roundNumberEl.textContent = roundNumber;
}

function determineWinner(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return "tie";
  }

  const winningPairs = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winningPairs[playerMove] === computerMove ? "win" : "lose";
}

function handleMove(playerMove) {
  const computerMove = getRandomMove();
  const outcome = determineWinner(playerMove, computerMove);

  playerChoiceEl.textContent = emojis[playerMove];
  computerChoiceEl.textContent = emojis[computerMove];

  if (outcome === "win") {
    playerScore += 1;
    resultEl.textContent = `You win! ${playerMove} beats ${computerMove}.`;
    resultEl.style.color = "#86efac";
    playSound("win");
  } else if (outcome === "lose") {
    computerScore += 1;
    resultEl.textContent = `Computer wins! ${computerMove} beats ${playerMove}.`;
    resultEl.style.color = "#fca5a5";
    playSound("lose");
  } else {
    resultEl.textContent = `It's a tie! Both picked ${playerMove}.`;
    resultEl.style.color = "#fcd34d";
    playSound("tie");
  }

  roundNumber += 1;
  updateScoreDisplay();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 1;
  playerChoiceEl.textContent = "?";
  computerChoiceEl.textContent = "?";
  resultEl.textContent = "Make your move!";
  resultEl.style.color = "#e2e8f0";
  updateScoreDisplay();
}

moveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const move = button.dataset.move;
    handleMove(move);
  });
});

resetBtn.addEventListener("click", resetGame);

updateScoreDisplay();

