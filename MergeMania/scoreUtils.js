export function updateScore(score) {
    const SCORE_ELEMENT = document.getElementById("current-score");
    SCORE_ELEMENT.innerText = score.toString();
  }
  
  export function updateHighScore(score) {
    let highScore = localStorage.getItem("highScore");
    if (highScore === null || score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    const HIGHSCORE_ELEMENT = document.getElementById("high-score");
    HIGHSCORE_ELEMENT.innerText = highScore.toString();
  }