var board;
var context;
var rows = 20;
var cols = 20;
var blockSize = 25;
var snakeX = 5 * blockSize;
var snakeY = 5 * blockSize;
var velocityX = 0;
var velocityY = 0;
var score = 0;

var foodX = 0;
var foodY = 0;
var snakeBody = [];
var alive = 1;

window.onload = function () {
  board = document.getElementById("board");
  board.height = blockSize * rows;
  board.width = blockSize * cols;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keydown", move);
  setInterval(update, 1000 / 8);
};

function update() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "green";
  snakeX += velocityX;
  snakeY += velocityY;
  if (alive) {
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
  }

  eatItself();

  if (snakeX == foodX && snakeY == foodY) {
    score++;
    document.getElementById("title").innerHTML = "YOUR SCORE IS " + score;
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillStyle = "green";
    if (alive) {
      context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
  }

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  wallHit();
  moveAlong();
}

function placeFood() {
  foodX = Math.floor(Math.random() * rows) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
  for (let i = 0; i < snakeBody.length; i++) {
    if (foodX == snakeBody[i][0] && foodY == snakeBody[i][1]) {
      placeFood();
    }
  }
}

function move(e) {
  if (e.key == "ArrowDown") {
    if (velocityY == 0) {
      velocityY = blockSize;
      velocityX = 0;
    }
  } else if (e.key == "ArrowUp") {
    if (velocityY == 0) {
      velocityY = 0 - blockSize;
      velocityX = 0;
    }
  } else if (e.key == "ArrowLeft") {
    if (velocityX == 0) {
      velocityX = 0 - blockSize;
      velocityY = 0;
    }
  } else if (e.key == "ArrowRight") {
    if (velocityX == 0) {
      velocityX = blockSize;
      velocityY = 0;
    }
  }
}

function wallHit() {
  if (
    snakeX < 0 ||
    snakeX == board.width ||
    snakeY > board.height ||
    snakeY < 0
  ) {
    document.getElementById("title").innerHTML =
      "GAME OVER,your score is  " + score;
  }
}

function moveAlong() {
  if (snakeBody) {
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i][0] = snakeBody[i - 1][0];
      snakeBody[i][1] = snakeBody[i - 1][1];
    }
    snakeBody[0][0] = snakeX;
    snakeBody[0][1] = snakeY;
  }
}
function eatItself() {
  for (var i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      document.getElementById("title").innerHTML =
        "GAME  OVER,your score is " + score;
      alive = 0;
    }
  }
}
