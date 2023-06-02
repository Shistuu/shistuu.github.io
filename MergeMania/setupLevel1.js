import {tile_MoveUp, tile_MoveDown, tile_MoveLeft, tile_MoveRight } from './script.js';

export function setupLevel1() {
    
  if (
    !tile_MoveUp() &&
    !tile_MoveDown() &&
    !tile_MoveLeft() &&
    !tile_MoveRight()
  ) {
    newTile.waitForTransition(true).then(() => {
      const modal = document.getElementById("game-over-modal");
      modal.style.display = "flex";

      const playAgainBtn = document.getElementById("play-again-btn");
      playAgainBtn.addEventListener("click", () => {
        location.reload(); // Refresh the page
      });
    });
    return;
  }
}