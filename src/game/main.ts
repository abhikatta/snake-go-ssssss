import "../styles/style.css";

import { ChangeDirection } from "../lib/SnakeDirection";
import { Snake } from "./snake";
import { Direction } from "../types";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./data";
// import { Score } from "./score";
import { Food } from "./food";
import { getSnakeColor, selectColor } from "../lib/SnakeColor";

const app = document.getElementById("app")!;
export const canvas = document.createElement("canvas");
const scoreElement = document.createElement("p");
export const highScoreElement = document.createElement("h2");
const colorSelector = document.getElementById(
  "selectColor"
) as HTMLSelectElement;

app.append(canvas);
app.append(scoreElement);
app.append(highScoreElement);

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let direction: Direction = { x: 0, y: 0 };

let lastUpdateTime = 0;
const updateInterval = 1000;

export const snake = new Snake(canvas);
export const newSnake = new Snake(canvas);
export const foodItem = new Food(canvas);

window.addEventListener("keydown", (event: KeyboardEvent) => {
  const [newDirection] = ChangeDirection(direction, event);
  direction = newDirection;
});

window.addEventListener("DOMContentLoaded", () => {
  foodItem.spawnFoodItem();
  snake.drawSnake(direction);
});

if (colorSelector) {
  colorSelector.addEventListener("change", selectColor);
}

const initializeGame = () => {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.drawSnake(direction);
    foodItem.drawFood();
    if (newSnake.snakeColor !== getSnakeColor()) {
      newSnake.drawSnake(newSnake.direction);
    }

    const currentTime = Date.now();
    if (currentTime - lastUpdateTime > updateInterval) {
      highScoreElement.innerText = `${snake.snakeColor} score: ${snake.score} | ${newSnake.snakeColor} score: ${newSnake.score}`;
      lastUpdateTime = currentTime;
    }
  }

  requestAnimationFrame(initializeGame);
};

requestAnimationFrame(initializeGame);
