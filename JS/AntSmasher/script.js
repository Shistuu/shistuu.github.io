let score = 0;
class Ant {
  constructor(x, y, dx, dy, size) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
  }

  createAnt() {
    const ant = document.createElement("div");
    ant.className = "ant";
    ant.style.width = this.size + "px";
    ant.style.height = this.size + "px";
    this.element = ant;
    document.getElementById("container").appendChild(ant);
    this.moveAnt();
  }

  moveAnt() {
    this.x += this.dx;
    this.y += this.dy;
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    if (this.x <= 0 || this.x + this.size >= 780) {
      this.dx *= -1; // Reverse the direction horizontally
      this.x += this.dx; // Move the ant back inside the container
    }

    if (this.y <= 0 || this.y + this.size >= 480) {
      this.dy *= -1; // Reverse the direction vertically
      this.y += this.dy; // Move the ant back inside the container
    }
  }

  smashAnt() {
    this.element.remove();
    score++;
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.textContent = "Your Score: " + score;
    const blood = document.createElement("div");
    blood.className = "blood";
    blood.style.width = this.size * 2 + "px"; // Increase the blood size
    blood.style.height = this.size * 2 + "px"; // Increase the blood size
    blood.style.left = this.x - this.size / 2 + "px"; // Center the blood position
    blood.style.top = this.y - this.size / 2 + "px"; // Center the blood position
    document.getElementById("container").appendChild(blood);
    scoreContainer.classList.add("hover-effect");
    setTimeout(() => {
      blood.remove();
    }, 1000); // Adjust the duration as desired (in milliseconds)
  }
}

const antCount = 50;
const ants = [];
const fixedSize = 25;

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomDirection() {
  return Math.random() < 0.5 ? -1 : 1;
}

for (let i = 0; i < antCount; i++) {
  const size = getRandomNumber(10, 30);
  const x = getRandomNumber(fixedSize, 480 - fixedSize);
  const y = getRandomNumber(fixedSize, 480 - fixedSize);
  const dx = getRandomDirection();
  const dy = getRandomDirection();
  const ant = new Ant(x, y, dx, dy, fixedSize);
  ants.push(ant);
}

function init() {
  for (let i = 0; i < ants.length; i++) {
    const ant = ants[i];

    if (ant.x <= 0 || ant.x + ant.size >= 790) {
      ant.dx *= -1;
    }

    if (ant.y <= 0 || ant.y + ant.size >= 480) {
      ant.dy *= -1;
    }

    for (let j = 0; j < ants.length; j++) {
      if (i !== j) {
        const otherAnt = ants[j];
        const dx = otherAnt.x - ant.x;
        const dy = otherAnt.y - ant.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = ant.size + otherAnt.size;

        if (distance < minDistance) {
          const dxx = dx / distance;
          const dyy = dy / distance;

          const X = ant.x + dxx * minDistance;
          const Y = ant.y + dyy * minDistance;

          const ax = (X - otherAnt.x) * 0.05;
          const ay = (Y - otherAnt.y) * 0.05;

          ant.dx -= ax;
          ant.dy -= ay;
          otherAnt.dx += ax;
          otherAnt.dy += ay;
        }
      }
    }

    ant.moveAnt();
  }

  setTimeout(init, 35);
}

for (let i = 0; i < antCount; i++) {
  const ant = ants[i];
  ant.createAnt();

  ant.element.addEventListener("click", () => {
    ant.smashAnt();
  });
}

init();
