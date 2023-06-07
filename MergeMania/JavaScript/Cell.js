let score = 0;  // Variable to keep track of the game score
export default class Cell {
  #x;
  #y;
  #tile;
  #mergeTile;
  #obstacleIndex;
  #level;

  constructor(x, y, obstacleIndex,level) {
    this.#x = x;  // Private property: x coordinate of the cell
    this.#y = y;  // Private property: Y coordinate of the cell
    this.#obstacleIndex=obstacleIndex // Private property: x,y coordinate array of the obstacle
    this.#level = level;
  }

  get x() {
    return this.#x; // Returns the x coordinate of the cell
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile; // Returns the tile object associated with the cell
  }

  set tile(value) {
    this.#tile = value; // Sets the tile object associated with the cell
    if (value == null) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;

      // Check if the cell is an obstacle based on the level and obstacle coordinates

    if(this.#level == 3){
      for(const element of this.#obstacleIndex){
        const coordinates = element;
        if((this.#x==coordinates[0]) && (this.#y==coordinates[1])){
          this.#tile.isObstacle = true; // Mark the tile as an obstacle
          value.tileElement.classList.add("obstacleBorder");
          break;
        } else{
          this.#tile.isObstacle = false;
          value.tileElement.classList.remove("obstacleBorder");
        }
      }
    }
  }

  // Getters and setters for mergeTile property 
  get mergeTile() {
    return this.#mergeTile;
  }

  set mergeTile(value) {
    this.#mergeTile = value;
    if (value == null) return;
    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  canAccept(tile) {
    return (
      this.tile == null ||
      (this.mergeTile == null && this.tile.value === tile.value && !this.tile.isObstacle) 
    );
  }

  mergeTiles() {
    if (this.tile == null || this.mergeTile == null) return;

    const MERGED_VALUE = this.mergeTile.value;
    this.tile.value += MERGED_VALUE;
    score += MERGED_VALUE * 2;
    this.mergeTile.remove();
    this.mergeTile = null;
    updateScore();
    updateHighScore(score);
  }
}

let highScore = localStorage.getItem("highScore");
if (highScore === null) {
  highScore = 0;
} else {
  highScore = parseInt(highScore, 10);
}
function updateScore() {
  const SCORE_ELEMENT = document.getElementById("current-score");
  SCORE_ELEMENT.innerText = score.toString();
}
// Display the initial high score
const highScoreElement = document.getElementById("high-score");
highScoreElement.innerText = highScore.toString();

// Function to update the high score during gameplay
function updateHighScore(score) {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreElement.innerText = highScore.toString();
  }
}