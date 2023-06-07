import { setupLevel1 } from "./setupLevel1.js";
import { setupLevel2 } from "./setupLevel2.js";
import { setupLevel3 } from "./setupLevel3.js";

export function startGame(level, gameContainer) {
  //makes the game container visible
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
