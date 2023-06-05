import Tile from "./tiles.js";
import { initializeLevels } from "./index.js";
// import Grid from "./Grid.js";

initializeLevels();

//object that has property active set to true
export var game = {
  active: true,
};
// Get the high score from local storage
let highScore = localStorage.getItem("highScore");
if (highScore !== null) {
  highScore = parseInt(highScore, 10); //convert from string to decimal value
  const highScoreElement = document.getElementById("high-score");
  highScoreElement.innerText = highScore.toString();
}
var GRID;
var GAMEBOARD;
export function sendGrid(grid, gameBoard){
  GRID = grid;
  GAMEBOARD = gameBoard;
}

export function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true }); // Each time setupInput() is called, a new event listener is registered, and they are not automatically removed after the first trigger.
}

async function handleInput(e) { //called when a key is pressed
  switch (e.key) {
    case "ArrowUp":
      if (!tile_MoveUp()) {
        setupInput(); //the input setup is re-established before further processing.
        return;
      }
      await Up();
      break;
    case "ArrowDown":
      if (!tile_MoveDown()) {
        setupInput();
        return;
      }
      await Down();
      break;
    case "ArrowLeft":
      if (!tile_MoveLeft()) {
        setupInput();
        return;
      }
      await Left();
      break;
    case "ArrowRight":
      if (!tile_MoveRight()) {
        setupInput();
        return;
      }
      await Right();
      break;
    default:
      setupInput();
      return;
  }

  GRID.cells.forEach((cell) => cell.mergeTiles()); //invokes merge tile method on each cell of the grid merging adjacent tiles if possible

  const newTile = new Tile(GAMEBOARD);
  GRID.randomEmptyCell().tile = newTile;
  setupInput();
}

function Up() {
  return slideTiles(GRID.Column);
}

function Down() {
  return slideTiles(GRID.Column.map((column) => [...column].reverse()));
}

function Left() {
  return slideTiles(GRID.Row);
}

function Right() {
  return slideTiles(GRID.Row.map((row) => [...row].reverse()));
}

function slideTiles(cells) { //handles the sliding of tiles in the specified cells array.
  return Promise.all( 
    cells.flatMap((group) => { // maps each element of the array to a new array of promises.
      const promises = []; //tracks the transition of tiles during the sliding process
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) { //checks backward in the group
          const moveToCell = group[j]; //moveToCell is the preceeding cell
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }

        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition()); //promise is pushed in array
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
      return promises;
    })
  );
}

export function tile_MoveUp() {
  if (!game.active) return false;
  return tile_Move(GRID.Column);
}

export function tile_MoveDown() {
  if (!game.active) return false;
  return tile_Move(GRID.Column.map((column) => [...column].reverse()));
}

export function tile_MoveLeft() {
  if (!game.active) return false;
  return tile_Move(GRID.Row);
}

export function tile_MoveRight() {
  if (!game.active) return false;
  return tile_Move(GRID.Row.map((row) => [...row].reverse())); //This maps each row of the grid and reverses the order of cells within each row, effectively simulating the rightward movement.
}

function tile_Move(cells) { //checks if there is any group of cells that contains at least one tile that can be moved
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}
