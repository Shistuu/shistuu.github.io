import Grid from "./Cell.js";
import Tile from "./tiles.js";
// import updateScore from "./updateCurrentScore.js";
import { initializeLevels } from "./levels.js";

let score = 0;

// Get the high score from local storage
let highScore = localStorage.getItem("highScore");
if (highScore !== null) {
  highScore = parseInt(highScore, 10);
  const highScoreElement = document.getElementById("high-score");
  highScoreElement.innerText = highScore.toString();
}

initializeLevels();

const gameBoard = document.getElementById("container");


const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
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

  grid.cells.forEach((cell) => cell.mergeTiles());

  const newTile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = newTile;

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

  setupInput();
}

function Up() {
  return slideTiles(grid.Column);
}

function Down() {
  return slideTiles(grid.Column.map((column) => [...column].reverse()));
}

function Left() {
  return slideTiles(grid.Row);
}

function Right() {
  return slideTiles(grid.Row.map((row) => [...row].reverse()));
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

function tile_MoveUp() {
  return tile_Move(grid.Column);
}

function tile_MoveDown() {
  return tile_Move(grid.Column.map((column) => [...column].reverse()));
}

function tile_MoveLeft() {
  return tile_Move(grid.Row);
}

function tile_MoveRight() {
  return tile_Move(grid.Row.map((row) => [...row].reverse()));
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



