import "./style.css";

import { ChangeDirection } from "./lib/SnakeDirection";
import { Snake } from "./snake";
import { Direction } from "./types";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./data";
import { Score } from "./score";
import { Food } from "./food";
import { GetHighestScore } from "./lib/HighScore";

const app = document.getElementById("app")!;
const canvas = document.createElement("canvas");
const scoreElement = document.createElement("p");
const highScoreElement = document.createElement("h2");

app.append(canvas);
app.append(scoreElement);
app.append(highScoreElement);

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let direction: Direction = { x: 0, y: 0 };
const snake = new Snake(canvas);
const score = new Score();
const foodItem = new Food(canvas, snake, score);

window.addEventListener("keydown", (event: KeyboardEvent) => {
  const [newDirection] = ChangeDirection(direction, event);
  direction = newDirection;
});

window.addEventListener("DOMContentLoaded", () => {
  foodItem.spawnFoodItem();
  direction && snake.drawSnake(direction);
  highScoreElement.innerText = `Highest score: ${GetHighestScore()}`;
});

const initializeGame = () => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  foodItem.drawFood();
  snake.drawSnake(direction);
  scoreElement.innerText = `${score.getScore()}`;

  requestAnimationFrame(initializeGame);
};

initializeGame();
