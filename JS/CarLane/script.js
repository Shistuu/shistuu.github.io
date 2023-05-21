// const gamearea=document.querySelector(".gamearea");
// const startscreen=document.querySelector(".startscreen");
// const score=document.querySelector(".score");

// let player={score:0, speed:6};
// let keys={ArrowUp:false , ArrowDown:false ,  ArrowLeft:false , ArrowRight:false,};

// // document.addEventListener("keydown", KeyDown);
// // document.addEventListener("keyup", KeyUp);

// function keyDown(e)
// {
//   e.preventDefault();
//   keys[e.key]=true;
// }

// function keyUp(e)
// {
//   e.preventDefault();
//   keys[e.key]=false;
// }


// startscreen.addEventListener("click", start);

// function start()
// {
//   startscreen.classList.add("hide");

//   let car=document.createElement("div");
//   car.setAttribute("class", "car"); 
//   gamearea.appendChild(car);
  
//   for(i=0;i<5;i++)
//   {
//     let roadLine=document.createElement("div");
//     roadLine.setAttribute("class", "lines");
//     roadLine.y=(x*150); //distance between two continious line
//     roadLine.style.top=roadLine.y + "px"; 
//     gamearea.appendChild(roadLine);
//   }

// }
const ROAD_DIMENSION = {
  width: 400,
  height: 600
};
const ROAD_SPEED = 1;
const ROAD_DY = 0.002;
const ROAD_SPEED_LIMIT = 10;

const LANE_WIDTH = 90;
const LANE_GAP = 20;
const LANES = {
  1: {
    x1: 8 + LANE_GAP,
    x2: 98 - LANE_GAP
  },
  2: {
    x1: 102 + LANE_GAP,
    x2: 192 - LANE_GAP
  },
  3: {
    x1: 208 + LANE_GAP,
    x2: 298 - LANE_GAP
  },
  4: {
    x1: 302 + LANE_GAP,
    x2: 392 - LANE_GAP
  }
};

const CAR_DIMENSION = {
  width: 50,
  height: 100
};
const CAR_START_POSITION = {
  x: LANES[2].x1,
  y: ROAD_DIMENSION.height - CAR_DIMENSION.height - 20
};
const CAR_SPEED_INC = 0.01;
const CAR_SPEED_LIMIT = 120;

const OPPONENT_GAP = 280;

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ENTER_KEY = 13;

class Car {
  constructor(parent) {
    this.parent = parent;
    this.width = CAR_DIMENSION.width;
    this.height = CAR_DIMENSION.height;

    this.init();
  }

  init() {
    this.carEl = document.createElement('div');
    this.carEl.style.width = `${this.width}px`;
    this.carEl.style.height = `${this.height}px`;
    this.carEl.style.position = 'absolute';
    this.carEl.style.backgroundImage = 'url(assets/images/car.png)';

    this.parent.appendChild(this.carEl);
  }
}

class Game {
  constructor() {
    this.init();
  }

  init() {
    this.opponents = [];
    this.space = 0;
    this.road = new Road();
    this.player = new Player(this.road.road, this);
    this.score = new Score(this.road.road);

    this.interval = setInterval(this.animate.bind(this), 1000 / 60);
  }

  animate() {
    this.road.move(this.player);
    this.player.move();

    if (this.space >= OPPONENT_GAP) {
      const opponent = new Opponent(this.road.road);
      this.opponents.push(opponent);
      this.space = 0;
    }
    this.space++;
    for (let i = 0; i < this.opponents.length; i++) {
      this.opponents[i].move(this);
    }

    this.score.draw();

    CollisionDetection(this);
  }

  reset() {
    window.removeEventListener('keydown', this.player._carMoveEvent);
    document.body.removeChild(this.road.container);
  }
}

class Menu {
  constructor() {
    this.init();
  }

  init() {
    this.road = new Road();
    this.message = document.createElement('div');
    this.message.innerHTML = 'Press Enter to Start the Game';
    this.message.style.position = 'absolute';
    this.message.style.top = '50%';
    this.message.style.left = '50%';
    this.message.style.transform = 'translate(-50%, -50%)';
    this.message.style.fontSize = '20px';
    this.message.style.textAlign = 'center';
    this.message.style.color = '#fff';
    this.message.style.padding = '10px';
    this.message.style.backgroundColor = '#222222';
    this.message.style.borderRadius = '12px';
    this.road.road.appendChild(this.message);
    window.addEventListener('keydown', this.start.bind(this));
  }

  start(event) {
    if (event.keyCode === ENTER_KEY) {
      document.body.removeChild(this.road.container);
      window.removeEventListener('keydown', this.start);
      this.game = new Game();
    }
  }
}

class Player extends Car {
  constructor(parent, game) {
    super(parent);
    this.x = CAR_START_POSITION.x;
    this.y = CAR_START_POSITION.y;
    this.speed = 0;
    this.speedInc = CAR_SPEED_INC;
    this.turn = 8;
    this.game = game;

    this.init();
  }

  init() {
    this.carEl.style.zIndex = '100';
    window.addEventListener('keydown', this._carMoveEvent.bind(this));
  }

  move() {
    this._speedUp();
    this._draw();
  }

  _speedUp() {
    this.speed =
      this.speed < CAR_SPEED_LIMIT ? this.speed + this.speedInc : this.speed;
    if (this.speed >= 40) {
      clearInterval(this.game.interval);
      this.game.interval = setInterval(this.game.animate.bind(this.game), 1000 / 80);
    }
    if (this.speed >= 60) {
      clearInterval(this.game.interval);
      this.game.interval = setInterval(this.game.animate.bind(this.game), 1000 / 100);
    }
    if (this.speed >= 80) {
      clearInterval(this.game.interval);
      this.game.interval = setInterval(this.game.animate.bind(this.game), 1000 / 120);
    }
    if (this.speed >= 100) {
      clearInterval(this.game.interval);
      this.game.interval = setInterval(this.game.animate.bind(this.game), 1000 / 144);
    }
  }

  _draw() {
    this.carEl.style.left = `${this.x}px`;
    this.carEl.style.top = `${this.y}px`;
  }

  _carMoveEvent(event) {
    if (event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW) {
      switch (event.keyCode) {
        case LEFT_ARROW:
          this.x -= this.turn;
          break;
        case RIGHT_ARROW:
          this.x += this.turn;
          break;
        default:
          this.x = this.x;
      }
    }
  }
}

class Road {
  constructor() {
    this.width = ROAD_DIMENSION.width;
    this.height = ROAD_DIMENSION.height;
    this.y = 0;
    this.speed = ROAD_SPEED;
    this.speedLimit = ROAD_SPEED_LIMIT;
    this.dy = ROAD_DY;

    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'container';
    document.body.appendChild(this.container);

    this.road = document.createElement('div');
    this.road.style.width = `${this.width}px`;
    this.road.style.height = `${this.height}px`;
    this.road.style.position = 'relative';
    this.road.style.overflow = 'hidden';
    this.road.style.boxShadow =
      '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)';
    this.road.style.backgroundImage = 'url(assets/images/low-road.png)';
    this.road.style.backgroundPositionY = `${this.y}px`;

    this.container.appendChild(this.road);
  }

  move(car) {
    this.y = this.y >= this.height ? 0 : this.y;
    this.y += this.speed;
    this.speed = this.speed > this.speedLimit ? this.speedLimit : this.speed;
    this._speedInc(car.speedInc);
    this._draw();
  }

  _speedInc(speedInc) {
    this.speed += speedInc / 20;
  }

  _draw() {
    this.road.style.backgroundPositionY = `${this.y}px`;
  }
}

const isInBetween = (x, min, max) => {
  return (x - min) * (x - max) <= 0;
};

const findLane = x => {
  const keys = Object.keys(LANES);
  let keyName = null;
  keys.map(key => {
    const find = isInBetween(x, LANES[key].x1, LANES[key].x2);
    keyName = find ? +key : keyName;
  });

  return keyName;
};

const NumberGenerator = max => {
  return Math.floor(Math.random() * max) + 1;
};

new Menu();
