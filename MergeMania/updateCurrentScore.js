export function updateScore() {
  const scoreElement = document.getElementById("current-score");
  scoreElement.innerText = score.toString();
}