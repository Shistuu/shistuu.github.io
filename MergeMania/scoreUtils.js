export function updateScore(score) {
    const scoreElement = document.getElementById("current-score");
    scoreElement.innerText = score.toString();
  }
  
  export function updateHighScore(score) {
    let highScore = localStorage.getItem("highScore");
    if (highScore === null || score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    const highScoreElement = document.getElementById("high-score");
    highScoreElement.innerText = highScore.toString();
  }