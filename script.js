const CHOICES = {
  rock: {
    beats: "scissors",
    message: "Rock beats scissors.",
  },
  paper: {
    beats: "rock",
    message: "Paper beats rock.",
  },
  scissors: {
    beats: "paper",
    message: "Scissors beats paper.",
  },
};

// Esta accion genera un numero random entre el 1 y el 3, segun el numero retorna roca, papel o tijeras
function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3) + 1;

  return getChoice(choice);
}

// Esta accion pregunta al usuario un numero del 1 al 3, segun el numero retorna piedra, papel o tijeras
function getPlayerChoice() {
  let choice = +prompt("Choose your number:\n1. Rock\n2. Paper\n3. Scissors");

  return getChoice(choice);
}

// Esta accion retorna piedra, papel o tijeras segun numero
function getChoice(choice) {
  switch (choice) {
    case 1:
      return "Rock";
    case 2:
      return "Paper";
    case 3:
      return "Scissors";
  }
}

// Esta accion crea la variable playerChoice y computerChoice y almacena en ellas las elecciones del jugador (param1) y la computadora (param2), transforma el string a minus, luego se comparan las elecciones del jugador y la computadora, retorna un string con el resultado
function playRound(playerSelection, computerSelection) {
  let playerChoice = playerSelection.toLowerCase();
  let computerChoice = computerSelection.toLowerCase();

  let result =
    CHOICES[playerChoice].beats === computerChoice
      ? "won"
      : CHOICES[computerChoice].beats === playerChoice
      ? "lost"
      : "tie";
  let message =
    result === "tie"
      ? "Tie!"
      : `You ${result}! ${CHOICES[playerChoice].message}`;

  return {
    message: message,
    result: result
  };
}

// Accion que pregunta al usuario si quiere jugar de nuevo
function playAgain() {
  let playAgain = confirm("Play again?");

  if (playAgain === true) {
    game();
  } else {
    console.log("Thanks for playing!");
  }
}

// Accion principal. Ejecuta 5 rondas de juego
function game() {
  let playerWins = 0;
  let machineWins = 0;

  for (let round = 1; round <= 5; round++) {
    console.log(`Round ${round}`);

    console.log(`Player wins: ${playerWins} - Machine wins: ${machineWins}`)

    let playerSelection = getPlayerChoice();
    let computerSelection = getComputerChoice();

    if (!playerSelection) {
      console.log("Thanks for playing!");
      return;
    }

    console.log(`Player choice: ${playerSelection}`);
    console.log(`Computer choice: ${computerSelection}`);

    let result = playRound(playerSelection, computerSelection);
    console.log(result.message);

    if (result.result === 'won') {
      playerWins++;
    } else if (result.result === 'lost') {
      machineWins++;
    }
  }

  let warResult = playerWins >= machineWins ? "Humans survived machine's rebelation!" : "Humans were destroyed...";
  console.log(warResult);

  playAgain();
}

game();
