window.onload = () => {
  var car = document.getElementById("a");
  function run() {
    car.play();
  }
  function endrun() {
    car.pause();
  }

  const score = document.querySelector(".score");
  const gameStart = document.querySelector(".gameStart");
  const gameArea = document.querySelector(".gameArea");

  gameStart.addEventListener("click", start);
  gameStart.addEventListener("click", run);

  let player = { speed: 2.5, score: 0 };

  let keys = {
    ArrowLeft: false,
    ArrowRight: false,
  };

  function isCollide(a, b) {
    Rectangle_l = a.getBoundingClientRect();
    Rectangle_b = b.getBoundingClientRect();

    return !(
      Rectangle_l.bottom < Rectangle_b.top ||
      Rectangle_l.top > Rectangle_b.bottom ||
      Rectangle_l.right < Rectangle_b.left ||
      Rectangle_l.left > Rectangle_b.right
    );
  }

  function moveLines() {
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function (item) {
      if (item.y >= 750) {
        item.y = -50;
      }
      item.y += player.speed;
      item.style.top = item.y + "px";
    });
  }

  function endGame() {
    player.start = false;
    gameStart.classList.remove("hide");
  }

  function moveEnemy(car) {
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function (item) {
      if (isCollide(car, item)) {
        endGame();
        gameStart.innerHTML =
          "Oops! Game Over!! Your current score is " +
          player.score + "." +
          "<br>" +
          " Click here to play again! ";
      }

      if (item.y >= 700) {
        item.y = -300;
        item.style.left = Math.floor(Math.random() * 250) + "px";
      }
      item.y += player.speed;
      item.style.top = item.y + "px";
    });
  }

  function gamePlay() {
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();

    if (player.start) {
      moveLines();
      moveEnemy(car);
      if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
      }
      if (keys.ArrowRight && player.x < road.width - 50) {
        player.x += player.speed;
      }

      car.style.top = player.y + "px";
      car.style.left = player.x + "px";

      window.requestAnimationFrame(gamePlay);
      score.innerText = "Your score:   " + player.score;
      player.score++;
    }
  }

  function start() {
    gameStart.classList.add("hide");

    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;

    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {
      let roadLine = document.createElement("div");
      roadLine.setAttribute("class", "lines");
      roadLine.y = x * 150;
      roadLine.style.top = roadLine.y + "px";
      gameArea.appendChild(roadLine);
    }

    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {
      let enemyCar = document.createElement("div");
      enemyCar.setAttribute("class", "enemy");
      enemyCar.y = (x + 1) * 350 * -1;
      enemyCar.style.top = enemyCar.y + "px";
      enemyCar.style.backgroundImage = "url('obstacle.png')";
      enemyCar.style.left = Math.floor(Math.random() * 250) + "px";
      gameArea.appendChild(enemyCar);
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") {
      keys.ArrowLeft = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
      keys.ArrowLeft = false;
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight") {
      keys.ArrowRight = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowRight") {
      keys.ArrowRight = false;
    }
  });
};
