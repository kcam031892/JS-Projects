const choice = document.querySelector(".actions");
const result = document.querySelector(".heading-result p");
const playerScoreBoard = document.querySelector(".player-score p");
const computerScoreBoard = document.querySelector(".computer-score p");
const actions = ["rock", "paper", "scissor"];
let playerScore = 0;
let computerScore = 0;

choice.addEventListener("click", (e) => {
  let playerChoice;
  let compChoice = computerChoice();
  if (e.target.classList.contains("action-wrapper")) {
    playerChoice = e.target.classList[1];
  } else {
    playerChoice = e.target.parentElement.classList[1];
  }

  const winner = checkWin(playerChoice, compChoice);
  let resultContent = `${winner} wins. Player pick ${playerChoice}, Computer pick ${compChoice}`;
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  } else {
    resultContent = `Draw, No one wins. Player pick ${playerChoice}, Computer pick ${compChoice}`;
  }
  playerScoreBoard.textContent = playerScore;
  computerScoreBoard.textContent = computerScore;
  result.textContent = resultContent;
});

function checkWin(playerChoice, compChoice) {
  let winner;
  // const computerChoice = computerChoice();

  if (playerChoice === compChoice) {
    winner = "draw";
  } else {
    if (playerChoice === "rock") {
      if (compChoice === "paper") {
        winner = "computer";
      } else {
        winner = "player";
      }
    }

    if (playerChoice === "paper") {
      if (compChoice === "scissor") {
        winner = "computer";
      } else {
        winner = "player";
      }
    }

    if (playerChoice === "scissor") {
      if (compChoice === "rock") {
        winner = "computer";
      } else {
        winner = "player";
      }
    }
  }

  console.log(playerChoice, compChoice);
  return winner;
}

function computerChoice() {
  return actions[Math.floor(Math.random() * actions.length)];
}
