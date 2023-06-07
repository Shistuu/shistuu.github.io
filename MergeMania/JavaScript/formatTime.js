export function formatTime(time) {
  const MINUTES = Math.floor(time / 60)
    .toString()
    .padStart(2, "0"); //ensure that the string representation of minutes is always at least two characters long. If the string is less than two characters, it adds leading zeros ("0") to make it exactly two characters
  const SECONDS = (time % 60).toString().padStart(2, "0");
  return `${MINUTES}:${SECONDS}`;
}
