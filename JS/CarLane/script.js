
// window.onload = () => {
//   var car = document.getElementById("a");
//   function run() {
//     car.play();
//   }
//   function endrun() {
//     car.pause();
//   }

//   const score = document.querySelector(".score");
//   const gameStart = document.querySelector(".gameStart");
//   const gameArea = document.querySelector(".gameArea");

//   gameStart.addEventListener("click", start);
//   gameStart.addEventListener("click", run);

//   let player = { speed: 2.5, score: 0 };

//   let keys = {
//     ArrowLeft: false,
//     ArrowRight: false,
//     Space: false,
//   };

//   let bullet;
//   let bulletInterval;

//   function isCollide(a, b) {
//     Rectangle_l = a.getBoundingClientRect();
//     Rectangle_b = b.getBoundingClientRect();

//     return !(
//       Rectangle_l.bottom < Rectangle_b.top ||
//       Rectangle_l.top > Rectangle_b.bottom ||
//       Rectangle_l.right < Rectangle_b.left ||
//       Rectangle_l.left > Rectangle_b.right
//     );
//   }

//   function moveLines() {
//     let lines = document.querySelectorAll(".lines");
//     lines.forEach(function (item) {
//       if (item.y >= 750) {
//         item.y = -50;
//       }
//       item.y += player.speed;
//       item.style.top = item.y + "px";
//     });
//   }

//   function endGame() {
//     player.start = false;
//     gameStart.classList.remove("hide");
    
//   }

//   function moveEnemy(car) {
//     let enemy = document.querySelectorAll(".enemy");
//     enemy.forEach(function (item) {
//       if (isCollide(car, item)) {
//         item.style.display = "none";
//         clearInterval(bulletInterval);
//         bullet.style.display = "none";
//         bullet = null;
//       }
  
//       if (item.y >= 700) {
//         item.y = -300;
//         item.style.left = Math.floor(Math.random() * 250) + "px";
//         item.style.display = "block";
//       }
//       item.y += player.speed;
//       item.style.top = item.y + "px";
  
//       // Check for collision between bullet and enemy
//       if (bullet && isCollide(bullet, item)) {
//         item.style.display = "none";
//         clearInterval(bulletInterval);
//         bullet.style.display = "none";
//         bullet = null;
//       }
//     });
  
//     // Generate new obstacle cars
//     if (player.start && enemy.length < 3) {
//       let enemyCar = document.createElement("div");
//       enemyCar.setAttribute("class", "enemy");
//       enemyCar.y = -300;
//       enemyCar.style.top = enemyCar.y + "px";
//       enemyCar.style.backgroundImage = "url('obstacle.png')";
//       enemyCar.style.left = Math.floor(Math.random() * 250) + "px";
//       gameArea.appendChild(enemyCar);
//     }
//   }
  

//   function gamePlay() {
//     let car = document.querySelector(".car");
//     let road = gameArea.getBoundingClientRect();

//     if (player.start) {
//       moveLines();
//       moveEnemy(car);
//       if (keys.ArrowLeft && player.x > 0) {
//         player.x -= player.speed;
//       }
//       if (keys.ArrowRight && player.x < road.width - 50) {
//         player.x += player.speed;
//       }

//       car.style.top = player.y + "px";
//       car.style.left = player.x + "px";

//       if (keys.Space && !bullet) {
//         shoot();
//       }

//       window.requestAnimationFrame(gamePlay);
//       score.innerText = "Your score:   " + player.score;
//       player.score++;
//     }
//   }

//   function shoot() {
//     bullet = document.createElement("div");
//     bullet.classList.add("bullet");
//     bullet.style.left = player.x + 20 + "px";
//     bullet.style.top = player.y - 10 + "px";
//     gameArea.appendChild(bullet);

//     bulletInterval = setInterval(() => {
//       if (bullet && bullet.offsetTop > -50) {
//         bullet.style.top = bullet.offsetTop - player.speed * 2 + "px";
//       } else {
//         clearInterval(bulletInterval);
//         bullet.style.display = "none";
//         bullet = null;
//       }
//     }, 20);
//   }

//   function start() {
//     gameStart.classList.add("hide");

//     gameArea.innerHTML = "";

//     player.start = true;
//     player.score = 0;

//     window.requestAnimationFrame(gamePlay);

//     for (x = 0; x < 5; x++) {
//       let roadLine = document.createElement("div");
//       roadLine.setAttribute("class", "lines");
//       roadLine.y = x * 150;
//       roadLine.style.top = roadLine.y + "px";
//       gameArea.appendChild(roadLine);
//     }

//     let car = document.createElement("div");
//     car.setAttribute("class", "car");
//     gameArea.appendChild(car);

//     player.x = car.offsetLeft;
//     player.y = car.offsetTop;

//     for (x = 0; x < 3; x++) {
//       let enemyCar = document.createElement("div");
//       enemyCar.setAttribute("class", "enemy");
//       enemyCar.y = (x + 1) * 350 * -1;
//       enemyCar.style.top = enemyCar.y + "px";
//       enemyCar.style.backgroundImage = "url('obstacle.png')";
//       enemyCar.style.left = Math.floor(Math.random() * 250) + "px";
//       gameArea.appendChild(enemyCar);
//     }
//   }

//   window.addEventListener("keydown", (e) => {
//     if (e.code == "ArrowLeft") {
//       keys.ArrowLeft = true;
//     }
//     if (e.code == "Space") {
//       keys.Space = true;
//     }
//   });
//   window.addEventListener("keyup", (e) => {
//     if (e.code == "ArrowLeft") {
//       keys.ArrowLeft = false;
//     }
//     if (e.code == "Space") {
//       keys.Space = false;
//     }
//   });

//   window.addEventListener("keydown", (e) => {
//     if (e.code == "ArrowRight") {
//       keys.ArrowRight = true;
//     }
//   });

//   window.addEventListener("keyup", (e) => {
//     if (e.code == "ArrowRight") {
//       keys.ArrowRight = false;
//     }
//   });
// };
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
    Space: false,
  };

  let bullet;
  let bulletInterval;
  let elapsedTime = 0;
  const speedIncrementInterval = 10000; // Increase speed every 10 seconds

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
          "Oops! Game Over!!" +
          "<br>" +
          " Click here to play again! ";
        item.style.display = "none";
        clearInterval(bulletInterval);
        bullet.style.display = "none";
        bullet = null;
      }

      if (item.y >= 700) {
        item.y = -300;
        item.style.left = Math.floor(Math.random() * 250) + "px";
        item.style.display = "block";
      }
      item.y += player.speed;
      item.style.top = item.y + "px";

      // Check for collision between bullet and enemy
      if (bullet && isCollide(bullet, item)) {
        item.style.display = "none";
        clearInterval(bulletInterval);
        bullet.style.display = "none";
        bullet = null;
      }
    });

    // Generate new obstacle cars
    if (player.start && enemy.length < 3) {
      let enemyCar = document.createElement("div");
      enemyCar.setAttribute("class", "enemy");
      enemyCar.y = -300;
      enemyCar.style.top = enemyCar.y + "px";
      enemyCar.style.backgroundImage = "url('obstacle.png')";
      enemyCar.style.left = Math.floor(Math.random() * 250) + "px";
      gameArea.appendChild(enemyCar);
    }
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

      if (keys.Space && !bullet) {
        shoot();
      }

      window.requestAnimationFrame(gamePlay);
      score.innerText = "Your score:   " + player.score;
      player.score++;

      // Increase speed every 10 seconds
      elapsedTime += 16; // Assuming 60 FPS
      if (elapsedTime >= speedIncrementInterval) {
        player.speed += 0.5;
        elapsedTime = 0;
      }
    }
  }

  function shoot() {
    bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = player.x + 20 + "px";
    bullet.style.top = player.y - 10 + "px";
    gameArea.appendChild(bullet);

    bulletInterval = setInterval(() => {
      if (bullet && bullet.offsetTop > -50) {
        bullet.style.top = bullet.offsetTop - player.speed * 2 + "px";
      } else {
        clearInterval(bulletInterval);
        bullet.style.display = "none";
        bullet = null;
      }
    }, 20);
  }

  function start() {
    gameStart.classList.add("hide");

    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    player.speed = 2.5;
    elapsedTime = 0;

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
    if (e.code == "Space") {
      keys.Space = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
      keys.ArrowLeft = false;
    }
    if (e.code == "Space") {
      keys.Space = false;
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
