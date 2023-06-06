import { formatTime } from "./formatTime.js";
import {
  game,
  tile_MoveUp,
  tile_MoveDown,
  tile_MoveLeft,
  tile_MoveRight,
  setupInput,
  sendGrid,
} from "./script.js";
import Grid from "./Grid.js";
import Tile from "./tiles.js";

// Function to set up Level 3
export function setupLevel3() {
  // Create the necessary elements
  const gridSizeInput = document.createElement("input");
  gridSizeInput.type = "number";
  gridSizeInput.placeholder = "Enter the number of grids you want to play";

  const TIMER = document.getElementById("timer");
  TIMER.style.display = "none";

  const SCORE_CONTAINER = document.getElementById("score-container");
  SCORE_CONTAINER.style.display = "none";

  const submitButton = document.createElement("button");
  submitButton.textContent = "Start Game";

  // Create a container div and append the input and submit button to it
  const gridbox = document.createElement("div");
  gridbox.appendChild(gridSizeInput);
  gridbox.appendChild(submitButton);

  // Append the gridbox to the body
  document.body.appendChild(gridbox);

  // Event listener for the submit button
  submitButton.addEventListener("click", () => {
    // Get the entered grid size from the input
    const gridSize = parseInt(gridSizeInput.value);

    // Check if the entered value is valid
    if (isNaN(gridSize) || gridSize <= 4 ||gridSize>=10) {
      alert("Invalid grid size. Please enter a number between  5 to 10.");
    } else {
      // Remove the UI elements from the DOM
      document.body.removeChild(gridbox);
      TIMER.style.display = "block";
      SCORE_CONTAINER.style.display = "flex";

      // Use the entered grid size to set up the game
      const level = 3;
      const GAMEBOARD = document.getElementById("container");
      const GRID = new Grid(GAMEBOARD, gridSize, level);
      GRID.randomEmptyCell().tile = new Tile(GAMEBOARD);
      sendGrid(GRID, GAMEBOARD);
      setupInput();

      const timerDuration = 500; // x seconds
      let remainingTime = timerDuration;
      const warningMessage = document.getElementById("warning-message");

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
          clearInterval(timer);

          const modal = document.getElementById("game-over-modal");
          modal.style.display = "flex";

          const playAgainBtn = document.getElementById("play-again-btn");
          playAgainBtn.addEventListener("click", () => {
            location.reload(); // Refresh the page
          });

          game.active = false; // Disable tile movement
        } else if (remainingTime <= 30 && remainingTime >= 27) {
          warningMessage.innerHTML = remainingTime + " seconds remaining!";
        } else {
          warningMessage.innerHTML = "";
        }
      }, 1000);

 
    }
  });
}