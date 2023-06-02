import { formatTime } from './formatTime.js';

export function setupLevel3() {
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

    }, 1000);
  
    
  }