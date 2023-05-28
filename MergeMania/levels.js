export function initializeLevels() {
  // Add event listeners to the level buttons
const levelButtons = document.querySelectorAll(".level-button");
const levelContainer = document.querySelector('.level-container');
const gameContainer = document.getElementById('container');
const container = document.getElementById('container');

levelButtons.forEach((button) => {
  button.addEventListener("click", handleLevelButtonClick);
});

// Handle level button click
function handleLevelButtonClick(e) {
  const levelButton = e.target;
  const level = levelButton.dataset.level;
  console.log("Level:", level);
  
  // Hide the level buttons
  const levelContainer = document.querySelector(".level-container");
  levelContainer.style.display = "none";

  // Start the game or perform any other actions based on the selected level
  // ...
}
}