class FlappyBird {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.img = new Image();
    this.img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

    // general settings
    this.gamePlaying = false;
    this.gravity = 0.5;
    this.speed = 3.2;
    this.size = [50, 36];
    this.jump = -11.5;
    this.cTenth = (this.canvas.width / 10);

    this.index = 0;
    this.bestScore = 0;
    this.flight = 0;
    this.flyHeight = 0;
    this.currentScore = 0;
    this.pipes = [];

    // pipe settings
    this.pipeWidth = 78;
    this.pipeGap = 270;
  }

  setup() {
    this.currentScore = 0;
    this.flight = this.jump;

    // set initial flyHeight (middle of screen - size of the bird)
    this.flyHeight = (this.canvas.height / 2) - (this.size[1] / 2);

    // setup first 3 pipes
    this.pipes = Array(3).fill().map((a, i) => [this.canvas.width + (i * (this.pipeGap + this.pipeWidth)), this.pipeLoc()]);
  }

  pipeLoc() {
    return (Math.random() * ((this.canvas.height - (this.pipeGap + this.pipeWidth)) - this.pipeWidth)) + this.pipeWidth;
  }

  render() {
    // make the pipe and bird moving 
    this.index++;
    // background first part 
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height, -((this.index * (this.speed / 2)) % this.canvas.width) + this.canvas.width, 0, this.canvas.width, this.canvas.height);
    // background second part
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height, -(this.index * (this.speed / 2)) % this.canvas.width, 0, this.canvas.width, this.canvas.height);

    // pipe display
    if (this.gamePlaying) {
      this.pipes.map(pipe => {
        // pipe moving
        pipe[0] -= this.speed;

        // top pipe
        this.ctx.drawImage(this.img, 432, 588 - pipe[1], this.pipeWidth, pipe[1], pipe[0], 0, this.pipeWidth, pipe[1]);
        // bottom pipe
        this.ctx.drawImage(this.img, 432 + this.pipeWidth, 108, this.pipeWidth, this.canvas.height - pipe[1] + this.pipeGap, pipe[0], pipe[1] + this.pipeGap, this.pipeWidth, this.canvas.height - pipe[1] + this.pipeGap);

        // give 1 point & create new pipe
        if (pipe[0] <= -this.pipeWidth) {
          this.currentScore++;
          // check if it's the best score
          this.bestScore = Math.max(this.bestScore, this.currentScore);

          // remove & create new pipe
          this.pipes = [...this.pipes.slice(1), [this.pipes[this.pipes.length - 1][0] + this.pipeGap + this.pipeWidth, this.pipeLoc()]];
          console.log(this.pipes);
        }

        // if hit the pipe, end
        if (
          pipe[0] <= this.cTenth + this.size[0] &&
          pipe[0] + this.pipeWidth >= this.cTenth &&
          (pipe[1] > this.flyHeight || pipe[1] + this.pipeGap < this.flyHeight + this.size[1])
        ) {
          this.gamePlaying = false;
          this.setup();
        }
      })
    }

    // draw bird
    if (this.gamePlaying) {
      this.ctx.save();
      this.ctx.translate(this.cTenth + this.size[0] / 2, this.flyHeight + this.size[1] / 2);
      this.ctx.rotate((this.flight / 10) * Math.PI / 180);
      this.ctx.drawImage(this.img, 432, Math.floor((this.index % 9) / 3) * this.size[1], ...this.size, -this.size[0] / 2, -this.size[1] / 2, ...this.size);
      this.ctx.restore();

      this.flight += this.gravity;
      this.flyHeight = Math.min(this.flyHeight + this.flight, this.canvas.height - this.size[1]);
    } else {
      this.ctx.drawImage(this.img, 432, Math.floor((this.index % 9) / 3) * this.size[1], ...this.size, ((this.canvas.width / 2) - this.size[0] / 2), this.flyHeight, ...this.size);
      this.flyHeight = (this.canvas.height / 2) - (this.size[1] / 2);
      this.ctx.fillText(`Your best score: ${this.bestScore}`, 35, 245);
      this.ctx.fillText('Press space to play', 30, 535);
      this.ctx.font = "bold 30px courier";
    }

    document.getElementById('bestScore').innerHTML = `Best: ${this.bestScore}`;
    document.getElementById('currentScore').innerHTML = `Current: ${this.currentScore}`;

    // tell the browser to perform anim
    window.requestAnimationFrame(() => this.render());
  }

  startGame() {
    this.setup();
    this.img.onload = () => this.render();
  }

  handleKeyPress(event) {
    if (event.code === 'Space') {
      if (!this.gamePlaying) {
        this.gamePlaying = true;
        this.flight = this.jump;
      } else {
        this.flight = this.jump;
      }
    }
  }
}

// Usage
const flappyBird = new FlappyBird('canvas');
flappyBird.startGame();
document.addEventListener('keydown', (event) => flappyBird.handleKeyPress(event));

