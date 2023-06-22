var gameContainer = document.getElementById("game-container");
var buttons = document.querySelectorAll(".button");
var gameOverContainer = document.getElementById("gameover");
var restartButton = document.getElementById("restart-button");
var activeCircles = [];
var isGamePaused = false;

restartButton.addEventListener("click", function () {
  restartGame();
});

function showGameOver() {
  console.log("game over");
  gameOverContainer.classList.add("active");
  isGamePaused = true;
  document.removeEventListener("keydown", handleKeyPress);
}

function restartGame() {
  gameOverContainer.classList.remove("active");
  gameOverContainer.removeEventListener("click", restartGame);
  document.addEventListener("keydown", handleKeyPress);

  // Create a copy of activeCircles to avoid modifying the array while iterating
  var circlesCopy = activeCircles.slice();
  circlesCopy.forEach(function (circle) {
    if (circle.parentElement === gameContainer) {
      gameContainer.removeChild(circle);
    }
  });

  activeCircles = [];
  isGamePaused = false;
}

function createCircle(button) {
  var circle = document.createElement("div");
  circle.classList.add("circle");

  var buttonRect = button.getBoundingClientRect();
  var buttonCenterX = buttonRect.left + buttonRect.width / 2;

  circle.style.left = buttonCenterX - 20 + "px";
  circle.style.top = "-20px";

  gameContainer.appendChild(circle);

  setTimeout(function () {
    circle.style.top = gameContainer.offsetHeight + "px";

    circle.addEventListener("transitionend", function (event) {
      if (
        event.propertyName === "top" &&
        circle.parentElement === gameContainer
      ) {
        gameContainer.removeChild(circle);
        showGameOver();
      }
    });
  }, 100);

  activeCircles.push(circle);

  return circle;
}

function checkCollision(circle, button) {
  var circleRect = circle.getBoundingClientRect();
  var buttonRect = button.getBoundingClientRect();

  return (
    circleRect.bottom >= buttonRect.top &&
    circleRect.top <= buttonRect.bottom &&
    circleRect.left >= buttonRect.left &&
    circleRect.right <= buttonRect.right
  );
}

function handleKeyPress(event) {
  if (isGamePaused) return; // Exit the function if the game is paused
  var key = event.key.toUpperCase();

  buttons.forEach(function (button) {
    if (button.dataset.key === key) {
      button.classList.add("pressed");

      activeCircles.forEach(function (circle) {
        if (checkCollision(circle, button)) {
          gameContainer.removeChild(circle);
          activeCircles.splice(activeCircles.indexOf(circle), 1);
        }
      });

      setTimeout(function () {
        button.classList.remove("pressed");
      }, 100);
    }
  });
}

function spawnCircle() {
  if (isGamePaused) return; // Exit the function if the game is paused
  var randomButton = buttons[Math.floor(Math.random() * buttons.length)];
  createCircle(randomButton);
}

document.addEventListener("keydown", handleKeyPress);
setInterval(spawnCircle, 1000);
