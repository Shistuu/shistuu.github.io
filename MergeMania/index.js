import { startGame } from "./startGame.js";

export function initializeLevels() {
  let score = 0;
  // Add event listeners to the level buttons
  const LEVEL_BUTTONS = document.querySelectorAll(".level-button");
  const LEVEL_CONTAINER = document.querySelector(".level-container");
  const GAME_CONTAINER = document.getElementById("container");
  const TIMER = document.getElementById("timer");
  const SCORE_CONTAINER = document.getElementById("score-container");
  const TITLE_CONTAINER = document.querySelector(".title");

  // Add event listeners to each level button
  LEVEL_BUTTONS.forEach((button) => {
    button.addEventListener("click", handleLevelButtonClick);
  });

  function handleLevelButtonClick(e) {
    const LEVEL_BUTTON = e.target;
    const DATA_LEVEL = LEVEL_BUTTON.getAttribute("data-level");

    TITLE_CONTAINER.style.display = "none";
    // Hide the level buttons
    LEVEL_CONTAINER.style.display = "none";
    // Show the game container and score container
    GAME_CONTAINER.style.display = "grid";
    SCORE_CONTAINER.style.display = "flex";

    // Start the game or perform any other actions based on the selected level
    if (DATA_LEVEL === "2") {
      TIMER.style.display = "block";
    } else if (DATA_LEVEL === "3") {
      TIMER.style.display = "block";
    }
    startGame(DATA_LEVEL, GAME_CONTAINER);
  }
  return {
    initializeLevels,
  };
}
