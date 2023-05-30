export function initializeLevels() {
  let score = 0;
  // Add event listeners to the level buttons
  const levelButtons = document.querySelectorAll(".level-button");
  const levelContainer = document.querySelector(".level-container");
  const gameContainer = document.getElementById("container");
  const timer = document.getElementById("timer");
  const SCORE_CONTAINER = document.getElementById("score-container");

  gameContainer.style.display = "none";
  timer.style.display = "none";
  SCORE_CONTAINER.style.display = "none";

  levelButtons.forEach((button) => {
    button.addEventListener("click", handleLevelButtonClick);
  });

  function handleLevelButtonClick(e) {
    const levelButton = e.target;
    const dataLevel = levelButton.getAttribute("data-level");

    // Hide the level buttons

    levelContainer.style.display = "none";
    // Show the game container

    gameContainer.style.display = "grid";
    SCORE_CONTAINER.style.display = "block";
    // Start the game or perform any other actions based on the selected level
    if (dataLevel === "2") {
      timer.style.display = "block";
    } else if (dataLevel === "3") {
      timer.style.display = "block";
    }

    startGame(dataLevel);
  }

  levelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const level = this.dataset.level;
      startGame(level);
    });
  });

  function formatTime(time) {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function startGame(level) {
    gameContainer.classList.remove("hide");

    // Set up the game based on the selected level
    switch (level) {
      case "1":
        setupLevel1();
        break;
      case "2":
        setupLevel2();
        break;
      case "3":
        setupLevel3();
        break;
      default:
        console.log("Invalid level");
    }
  }

  function setupLevel1() {}

  function setupLevel2() {
    const timerDuration = 35; // x minutes
    let remainingTime = timerDuration;
    const warningMessage = document.getElementById("warning-message");

    const timerElement = document.getElementById("timer");
    timerElement.textContent = formatTime(remainingTime);

    const timer = setInterval(() => {
      remainingTime--;
      timerElement.textContent = formatTime(remainingTime);

      if (
        remainingTime <= 0
        // (!tile_MoveUp() &&
        //   !tile_MoveDown() &&
        //   !tile_MoveLeft() &&
        //   !tile_MoveRight())
      ) {
        clearInterval(timer);

        const modal = document.getElementById("game-over-modal");
        modal.style.display = "flex";

        const playAgainBtn = document.getElementById("play-again-btn");
        playAgainBtn.addEventListener("click", () => {
          location.reload(); // Refresh the page
        });

        gameActive = false; // Disable tile movement

        return;
      } else if (remainingTime <= 30 && remainingTime >= 27) {
        warningMessage.innerHTML = remainingTime + " seconds remaining!";
      } else {
        warningMessage.innerHTML = "";
      }
    }, 1000);
  }

  
  function setupLevel3() {
    const timerDuration = 65; // x minutes
    let remainingTime = timerDuration;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = formatTime(remainingTime);

    const warningMessage = document.getElementById("warning-message");

    const timer = setInterval(() => {
      remainingTime--;
      timerElement.textContent = formatTime(remainingTime);

      if (
        remainingTime <= 0
        // (!tile_MoveUp() &&
        //   !tile_MoveDown() &&
        //   !tile_MoveLeft() &&
        //   !tile_MoveRight())
      ) {
        clearInterval(timer);

        const modal = document.getElementById("game-over-modal");
        modal.style.display = "flex";

        const playAgainBtn = document.getElementById("play-again-btn");
        playAgainBtn.addEventListener("click", () => {
          location.reload(); // Refresh the page
        });

        // gameActive = false; // Disable tile movement
        return;
      } else if (remainingTime <= 30 && remainingTime >= 27) {
        warningMessage.innerHTML = remainingTime + " seconds remaining!";
      } else {
        warningMessage.innerHTML = "";
      }

      if (remainingTime % 12 === 0) {
        createObstacleTile();
      }
    }, 1000);
  }
  function createObstacleTile() {
    const gridCells = grid.cells;
    const emptyCells = gridCells.filter((cell) => cell.tile == null);

    if (emptyCells.length >= 2) {
      const randomIndices = getRandomIndices(emptyCells.length, 2);

      randomIndices.forEach((index) => {
        const cell = emptyCells[index];
        const obstacleTile = new Tile(gameBoard);
        obstacleTile.value = 2; // Assigning a value for the obstacle tile
        obstacleTile.isObstacle = true; // Adding a property to identify obstacle tiles
        cell.tile = obstacleTile;

        // Adding a CSS class to style the obstacle tiles as gray
        const tileElement = document.querySelector(
          `.tile-position-${cell.x}-${cell.y}`
        );
        tileElement.classList.add("obstacle-tile");
      });
    }
  }

  function getRandomIndices(length, count) {
    const indices = Array.from(Array(length).keys());
    shuffleArray(indices);
    return indices.slice(0, count);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
