const CHOICES = {
  rock: {
    beats: "scissors",
  },
  paper: {
    beats: "rock",
  },
  scissors: {
    beats: "paper",
  },
};

const gameContainer = document.querySelector(".game-container");
const roundBoard = document.querySelector(".round");
const scoreBoard = document.querySelector(".score");
const resultBoard = document.querySelector(".result");
const plays = document.querySelectorAll(".choice");
const playAgainBtn = document.querySelector(".play-again");

playAgainBtn.addEventListener("click", resetGame);

plays.forEach((play) => {
  play.addEventListener("click", getPlayerChoice);
});

let round = 1;
let playerWins = 0;
let machineWins = 0;

function getPlayerChoice(e) {
  let choice = e.target.id;
  updateGame(choice);
}

function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3) + 1;
  switch (choice) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
}

function playRound(playerSelection, computerSelection) {
  let playerChoice = playerSelection;
  let computerChoice = computerSelection;

  let result =
    CHOICES[playerChoice].beats === computerChoice
      ? "won"
      : CHOICES[computerChoice].beats === playerChoice
      ? "lost"
      : "tie";
  let message = result === "tie" ? "Tie!" : `You ${result}!`;

  return {
    message: message,
    result: result,
  };
}

function checkWinner() {
  if (playerWins === 5 || machineWins === 5 || round > 5) {
    let warResult =
      playerWins >= machineWins
        ? "Humans survived machines rebelation!"
        : "Humans were destroyed...";
    resultBoard.textContent = warResult;

    playAgainBtn.style.display = "block";

    plays.forEach((play) => {
      play.removeEventListener("click", getPlayerChoice);
    });
  }
}

function resetGame() {
  round = 1;
  playerWins = 0;
  machineWins = 0;
  roundBoard.textContent = `Round ${round}`;
  scoreBoard.textContent = `Player's wins: ${playerWins} - Machine's wins: ${machineWins}`;
  resultBoard.textContent = "";
  playAgainBtn.style.display = "none";

  plays.forEach((play) => {
    play.addEventListener("click", getPlayerChoice);
  });
}

function updateGame(choice) {
  roundBoard.textContent = `Round ${round}`;
  round++;

  let playerSelection = choice;
  let computerSelection = getComputerChoice();

  console.log(`Player choice: ${playerSelection}`);
  console.log(`Computer choice: ${computerSelection}`);

  let result = playRound(playerSelection, computerSelection);
  resultBoard.textContent = result.message;

  if (result.result === "won") {
    playerWins++;
  } else if (result.result === "lost") {
    machineWins++;
  }
  scoreBoard.textContent = `Player's wins: ${playerWins} - Machine's wins: ${machineWins}`;

  checkWinner();
}
