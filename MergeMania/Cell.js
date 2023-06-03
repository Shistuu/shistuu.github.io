let score = 0;

export default class Cell {
  #cellEl;
  #x;
  #y;
  #tile;
  #mergeTile;

  constructor(cellElement, x, y) {
    this.#cellEl = cellElement;
    this.#x = x;
    this.#y = y;
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
      (this.mergeTile == null && this.tile.value === tile.value)
    );
  }

  mergeTiles() {
    if (this.tile == null || this.mergeTile == null) return;

    const MERGED_VALUE = this.mergeTile.value;
    this.tile.value += MERGED_VALUE;
    score += MERGED_VALUE * 2;
    console.log(score);
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
