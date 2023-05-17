class Ball {  //class ball with constructor  func to initialize ball obj 
  constructor(x, y, dx, dy, size) {
    this.x = x; //position
    this.y = y; 
    this.dx = dx; //velocity
    this.dy = dy;
    this.size = size; //size
  }

  createBall() {
    const ball = document.createElement("div"); //creates ball on page
    ball.className = "ball";
    ball.style.width = this.size + "px";
    ball.style.height = this.size + "px";
    this.element = ball; //stored in element property
    document.getElementById("container").appendChild(ball);
    this.moveBall();
  }
  
  moveBall() { //moves the position of ball 
    this.x += this.dx;
    this.y += this.dy;
    this.element.style.left = this.x + "px"; //updates left in css
    this.element.style.top = this.y + "px"; //updates top in css
}
}

const ballCount = 50; //number of balls to create
const balls = []; //stores instances of the ball class

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomDirection() { //returns random int (-1, 0, 1)
  return Math.floor(Math.random() * 3) - 1; //generates random values for x and y of dx and dy
}

for (let i = 0; i < ballCount; i++) {
  const size = getRandomNumber(10, 30);
  const x = getRandomNumber(size, 480 - size);
  const y = getRandomNumber(size, 480 - size);
  const dx = getRandomDirection();
  const dy = getRandomDirection();
  const ball = new Ball(x, y, dx, dy, size);
  balls.push(ball);
}

function init() {
  for (let i = 0; i < balls.length; i++) { //to check collision in walls
    const ball = balls[i];

    if (ball.x <= 0 || ball.x + ball.size >= 480) {
      ball.dx *= -1; //horizontal velocity is reversed
    }

    if (ball.y <= 0 || ball.y + ball.size >= 480) {
      ball.dy *= -1;
    }

    for (let j = 0; j < balls.length; j++) { //to check collision within balls
      if (i !== j) {
        const otherBall = balls[j];
        const dx = otherBall.x - ball.x; //velocity to simulate a bounce
        const dy = otherBall.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = ball.size + otherBall.size;

        if (distance < minDistance) { //direction and magnitude of force needed to separated balls by their sizes
            const dxx = dx / distance;
            const dyy = dy / distance;
            
            const X = ball.x + dxx * minDistance;
            const Y = ball.y + dyy * minDistance;
            
            const ax = (X - otherBall.x) * 0.05;
            const ay = (Y - otherBall.y) * 0.05;
            
            ball.dx -= ax;
            ball.dy -= ay;
            otherBall.dx += ax;
            otherBall.dy += ay;
          }
      }
    }

    ball.moveBall(); //moves the position of the ball
  }

  setTimeout(init, 25); //ball movement and collision detection are continously updated 
}

for (let i = 0; i < ballCount; i++) {
  balls[i].createBall(); 
}

init(); 
