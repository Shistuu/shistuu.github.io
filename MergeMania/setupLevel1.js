import {tile_MoveUp, tile_MoveDown, tile_MoveLeft, tile_MoveRight,setupInput, sendGrid } from './script.js';
import Grid from "./Grid.js";
import Tile from "./tiles.js";



export function setupLevel1() {
  const gridSize=4;
  const level=1;
  const GAMEBOARD = document.getElementById("container");
  const GRID = new Grid(GAMEBOARD,gridSize,level);
  GRID.randomEmptyCell().tile = new Tile(GAMEBOARD);
  sendGrid(GRID,GAMEBOARD);
  setupInput();


  if (
    !tile_MoveUp(GRID) &&
    !tile_MoveDown(GRID) &&
    !tile_MoveLeft(GRID) &&
    !tile_MoveRight(GRID)
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