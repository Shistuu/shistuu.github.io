let score = 0;

export default class Cell {
  #x;
  #y;
  #tile;
  #mergeTile;
  //change
  #obstacleIndexX;
  #obstacleIndexY;
  #level;

  constructor(x, y, obstacleIndexX, obstacleIndexY,level) {
    this.#x = x;
    this.#y = y;
    //change
    this.#obstacleIndexX=obstacleIndexX;
    this.#obstacleIndexY=obstacleIndexY;
    this.#level = level;
    // console.log(this.#obstacleIndexX+" is X\n",this.#obstacleIndexY+" is y");
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  set tile(value) {
    this.#tile = value;
    if (value == null) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
    //change
    if(this.#level == 3){
      if((this.#x==this.#obstacleIndexX) && (this.#y==this.#obstacleIndexY)){
        this.#tile.isObstacle = true;
        value.tileElement.classList.add("obstacleBorder");
      } else{
        this.#tile.isObstacle = false;
        value.tileElement.classList.remove("obstacleBorder");
      }
    }
  }

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
      (this.mergeTile == null && this.tile.value === tile.value && !this.tile.isObstacle) //change
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

function updateScore() {
  const SCORE_ELEMENT = document.getElementById("current-score");
  SCORE_ELEMENT.innerText = score.toString();
}
function updateHighScore(score) {
  let highScore = localStorage.getItem("highScore");
  if (highScore === null || score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
  const HIGHSCORE_ELEMENT = document.getElementById("high-score");
  HIGHSCORE_ELEMENT.innerText = highScore.toString();
}
