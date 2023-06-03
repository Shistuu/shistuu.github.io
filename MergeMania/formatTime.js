
export function formatTime(time) {
    const MINUTES = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const SECONDS = (time % 60).toString().padStart(2, "0");
    return `${MINUTES}:${SECONDS}`;
  }