import { startGame } from "./startGame.js";

export function initializeLevels() {
  let score = 0;
  // Add event listeners to the level buttons
  const levelButtons = document.querySelectorAll(".level-button");
  const levelContainer = document.querySelector(".level-container");
  const gameContainer = document.getElementById("container");
  const timer = document.getElementById("timer");
  const SCORE_CONTAINER = document.getElementById("score-container");

  gameContainer.style.display = "none";
  timer.style.display = "none";
  SCORE_CONTAINER.style.display = "none";

  levelButtons.forEach((button) => {
    button.addEventListener("click", handleLevelButtonClick);
  });

  function handleLevelButtonClick(e) {
    const levelButton = e.target;
    const dataLevel = levelButton.getAttribute("data-level");

    // Hide the level buttons
    levelContainer.style.display = "none";
    // Show the game container
    gameContainer.style.display = "grid";
    SCORE_CONTAINER.style.display = "block";

    // Start the game or perform any other actions based on the selected level
    if (dataLevel === "2") {
      timer.style.display = "block";
    } else if (dataLevel === "3") {
      timer.style.display = "block";
    }
    startGame(dataLevel, gameContainer);
  }
  return {
    initializeLevels,
  };
}
