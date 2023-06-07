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

export function setupLevel2() {
  const gridSize = 4;
  const level = 2;

  const GAMEBOARD = document.getElementById("container");
  const GRID = new Grid(GAMEBOARD, gridSize, level);
  GRID.randomEmptyCell().tile = new Tile(GAMEBOARD);
  sendGrid(GRID, GAMEBOARD);
  setupInput();

  const timerDuration = 55; // x seconds
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

      return;
    } else if (remainingTime <= 30 && remainingTime >= 27) {
      warningMessage.innerHTML = remainingTime + " seconds remaining!";
    } else {
      warningMessage.innerHTML = "";
    }
  }, 1000);
}
