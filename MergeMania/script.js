import Grid from "./Cell.js";
import Tile from "./tiles.js";
import { initializeLevels } from "./levels.js";

// let score = 0;
var gameActive = true; //flag to track the game state

// Get the high score from local storage
let highScore = localStorage.getItem("highScore");
if (highScore !== null) {
  highScore = parseInt(highScore, 10);
  const highScoreElement = document.getElementById("high-score");
  highScoreElement.innerText = highScore.toString();
}

initializeLevels();

const gameBoard = document.getElementById("container");
const levelButtons = document.querySelectorAll(".level-button");
const gameContainer = document.getElementById("container");
// const container = document.getElementById('container');
const cells = document.getElementsByClassName("cell");

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();

// levelButtons.forEach((button) => {
//   button.addEventListener("click", function () {
//     const level = this.dataset.level;
//     startGame(level);
//   });
// });

// function formatTime(time) {
//   const minutes = Math.floor(time / 60)
//     .toString()
//     .padStart(2, "0");
//   const seconds = (time % 60).toString().padStart(2, "0");
//   return `${minutes}:${seconds}`;
// }

// function startGame(level) {
//   gameContainer.classList.remove("hide");

//   // Set up the game based on the selected level
//   switch (level) {
//     case "1":
//       setupLevel1();
//       break;
//     case "2":
//       setupLevel2();
//       break;
//     case "3":
//       setupLevel3();
//       break;
//     default:
//       console.log("Invalid level");
//   }
// }

// function setupLevel1() {
//   // Add your Level 1 game logic here
//   console.log("Level 1");
// }

// function setupLevel2() {
//   const timerDuration = 0.25 * 60; // 2 minutes
//   let remainingTime = timerDuration;

//   const timerElement = document.getElementById("timer");
//   timerElement.textContent = formatTime(remainingTime);

//   const timer = setInterval(() => {
//     remainingTime--;
//     timerElement.textContent = formatTime(remainingTime);

//     if (
//       remainingTime <= 0 ||
//       (!tile_MoveUp() &&
//         !tile_MoveDown() &&
//         !tile_MoveLeft() &&
//         !tile_MoveRight())
//     ) {
//       clearInterval(timer);

//       const modal = document.getElementById("game-over-modal");
//       modal.style.display = "flex";

//       const playAgainBtn = document.getElementById("play-again-btn");
//       playAgainBtn.addEventListener("click", () => {
//         location.reload(); // Refresh the page
//       });
//       gameActive = false; // Disable tile movement
//       return;
//     } else if (remainingTime === 30) {
//       // Additional requirement for Level 2: Display a warning or trigger an event when 30 seconds are remaining
//       console.log("30 seconds remaining!");
//     }
//   }, 1000);

//   // Add your Level 2 game logic here
//   console.log("Level 2");
// }


// //
// function setupLevel3() {
//   // Add your Level 3 game logic here
//   console.log("Level 3");
// }

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
  if (!gameActive) return false;
  return tile_Move(grid.Column);
}

function tile_MoveDown() {
  if (!gameActive) return false;
  return tile_Move(grid.Column.map((column) => [...column].reverse()));
}

function tile_MoveLeft() {
  if (!gameActive) return false;
  return tile_Move(grid.Row);
}

function tile_MoveRight() {
   if (!gameActive) return false;
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
