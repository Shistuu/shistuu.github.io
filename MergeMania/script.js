import Tile from "./tiles.js";
import { initializeLevels } from "./index.js";
import Grid from "./Grid.js";
initializeLevels();

export var game = {
  active: true,
};
// Get the high score from local storage
let highScore = localStorage.getItem("highScore");
if (highScore !== null) {
  highScore = parseInt(highScore, 10);
  const highScoreElement = document.getElementById("high-score");
  highScoreElement.innerText = highScore.toString();
}

const GAMEBOARD = document.getElementById("container");

const GRID = new Grid(GAMEBOARD);
GRID.randomEmptyCell().tile = new Tile(GAMEBOARD);
setupInput();

function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

async function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!tile_MoveUp()) {
        setupInput();
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

  GRID.cells.forEach((cell) => cell.mergeTiles());

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

function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }

        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition());
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
  return tile_Move(GRID.Row.map((row) => [...row].reverse()));
}

function tile_Move(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}
