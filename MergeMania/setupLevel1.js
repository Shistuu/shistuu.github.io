import Grid from "./Grid.js";
import Tile from "./tiles.js";
import { 
  tile_MoveUp,
  tile_MoveDown,
  tile_MoveLeft,
  tile_MoveRight,
  setupInput,
  sendGrid,
} from "./script.js";

export function setupLevel1() {
  const gridSize = 4;
  const level = 1;
  const GAMEBOARD = document.getElementById("container");

  // Create a new Grid instance
  const GRID = new Grid(GAMEBOARD, gridSize, level);

  // Set a random empty cell with a new Tile
  GRID.randomEmptyCell().tile = new Tile(GAMEBOARD);
  // Send the grid and gameboard to the server
  sendGrid(GRID, GAMEBOARD);
  setupInput();
  // Check if there are no valid moves
  if ( 
    (!tile_MoveUp(GRID) &&
      !tile_MoveDown(GRID) &&
      !tile_MoveLeft(GRID) &&
      !tile_MoveRight(GRID))
  ) {
  
    const modal = document.getElementById("game-over-modal");
    modal.style.display = "flex";

    const playAgainBtn = document.getElementById("play-again-btn");
    playAgainBtn.addEventListener("click", () => {
      location.reload(); // Refresh the page
      
    });
  }
  return;
}
