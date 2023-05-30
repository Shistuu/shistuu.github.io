export function initializeLevels() {
  let score = 0;
  // Add event listeners to the level buttons
const levelButtons = document.querySelectorAll(".level-button");
const levelContainer = document.querySelector('.level-container');
const gameContainer = document.getElementById('container');
const container = document.getElementById('container');

levelButtons.forEach((button) => {
  button.addEventListener("click", handleLevelButtonClick);
});

function handleLevelButtonClick(e) {
  const levelButton = e.target;
  const dataLevel = levelButton.getAttribute('data-level');

  // Hide the level buttons
  const levelContainer = document.querySelector(".level-container");
  levelContainer.style.display = "none";

  // Start the game or perform any other actions based on the selected level
  if (dataLevel === '1' || dataLevel === '3') {
    const timer = document.getElementById('timer');
    timer.style.display = 'none';
  }

  startGame(dataLevel);
}

levelButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const level = this.dataset.level;
    startGame(level);
  });
});

function formatTime(time) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function startGame(level) {
  gameContainer.classList.remove("hide");
  
  // Set up the game based on the selected level
  switch (level) {
    case "1":
      setupLevel1();
      break;
    case "2":
      setupLevel2();
      break;
    case "3":
      setupLevel3();
      break;
    default:
      console.log("Invalid level");
  }
  if (dataLevel === '1' || dataLevel === '3') {
        const timer = document.getElementById('timer');
        timer.style.display = 'none';
      }
}

function setupLevel1() {
  // Add your Level 1 game logic here
  console.log("Level 1");
}

function setupLevel2() {
  const timerDuration = 0.25 * 60; // x minutes
  let remainingTime = timerDuration;

  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(remainingTime);

  const timer = setInterval(() => {
    remainingTime--;
    timerElement.textContent = formatTime(remainingTime);

    if (
      remainingTime <= 0 ||
      (!tile_MoveUp() &&
        !tile_MoveDown() &&
        !tile_MoveLeft() &&
        !tile_MoveRight())
    ) {
      debugger;
      clearInterval(timer);

      const modal = document.getElementById("game-over-modal");
      modal.style.display = "flex";

      const playAgainBtn = document.getElementById("play-again-btn");
      playAgainBtn.addEventListener("click", () => {
        location.reload(); // Refresh the page
      });

      gameActive = false; // Disable tile movement
    
      return;
    } else if (remainingTime === 30) {
      // Additional requirement for Level 2: Display a warning or trigger an event when 30 seconds are remaining
      console.log("30 seconds remaining!");
    }
  }, 1000);
}


//
function setupLevel3() {
  // Add your Level 3 game logic here
  console.log("Level 3");
}
}

