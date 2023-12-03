const canvas = document.getElementById("juegoPong");
const ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 1;
let ballSpeedY = 1;

let paddle1Y = canvas.height / 2 - 60;
let paddle2Y = canvas.height / 2 - 60;
let paddleWidth = 10;
let paddleHeight = 80;
let paddleSpeed = 10;

let score1 = 0;
let score2 = 0;

function drawGame() {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar las paletas
  ctx.fillStyle = "black";
  ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

  // Dibujar la pelota
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  // Mostrar puntajes
  ctx.fillText(`Puntuación: ${score1} - ${score2}`, canvas.width / 2 - 50, 20);
}

function update() {
  // Mover la pelota
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Colisiones con las paletas
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > paddle1Y &&
    ballY < paddle1Y + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > paddle2Y &&
    ballY < paddle2Y + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Rebotar en los bordes superior e inferior
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Puntuación y reinicio de la pelota
  if (ballX - ballRadius < 0) {
    score2++;
    resetBall();
  }

  if (ballX + ballRadius > canvas.width) {
    score1++;
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.random() > 0.5 ? 3 : -3;
}

document.addEventListener("keydown", function (event) {
  // Mover paletas con las teclas W/S y Flecha arriba/abajo
  if (event.key === "w" && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  } else if (event.key === "s" && paddle1Y < canvas.height - paddleHeight) {
    paddle1Y += paddleSpeed;
  } else if (event.key === "ArrowUp" && paddle2Y > 0) {
    paddle2Y -= paddleSpeed;
  } else if (
    event.key === "ArrowDown" &&
    paddle2Y < canvas.height - paddleHeight
  ) {
    paddle2Y += paddleSpeed;
  }
});

function gameLoop() {
  update();
  drawGame();
  requestAnimationFrame(gameLoop);
}

gameLoop();
