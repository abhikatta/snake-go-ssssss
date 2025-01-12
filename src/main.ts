import "./style.css";

import { ChangeDirection } from "./lib/SnakeDirection";
import { Snake } from "./snake";
import { Direction } from "./types";

const app = document.getElementById("app");
const canvas = document.createElement("canvas");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let direction: Direction = { x: 0, y: 0 };

if (app && canvas) {
  app.append(canvas);
  const snake = new Snake(canvas);

  window.addEventListener("keydown", (KeyboardEvent) => {
    direction = ChangeDirection(direction, KeyboardEvent) as Direction;
  });

  const initializeGame = () => {
    snake.moveSnake(direction);
    requestAnimationFrame(initializeGame);
  };

  initializeGame();
}
