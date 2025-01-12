// TODO: update snake direction to not to change by 180deg directly

import { Direction } from "./types";

export class Snake {
  centerX = 0;
  centerY = 0;

  //   snakeProps
  size = { length: 50, width: 50 };

  // static
  worldWidth = window.innerWidth - 100;
  worldHeight = window.innerHeight - 100;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;

  // physics
  direction: Direction = { x: 0, y: 0 };
  velocity = 0.4;
  displacement = this.velocity * 10;
  constructor(canvas: HTMLCanvasElement) {
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.ctx = canvas.getContext("2d");
    this.worldHeight = canvas.height;
    this.worldWidth = canvas.width;
    this.canvas = canvas;
  }

  detectWallCollision() {
    if (this.centerX > this.worldWidth) {
      this.centerX = this.centerX - this.worldWidth;
    }
    if (this.centerY > this.worldHeight) {
      this.centerY = this.centerY - this.worldHeight;
    }
    if (this.centerX < 0) {
      this.centerX = this.centerX + this.worldWidth;
    }
    if (this.centerY < 0) {
      this.centerY = this.centerY + this.worldHeight;
    }
  }

  drawSnake(direction: Direction) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.roundRect(
        (this.centerX += this.displacement * this.direction.x * this.velocity),
        (this.centerY += this.displacement * this.direction.y * this.velocity),
        this.size.length,
        this.size.width,
        14
      );
      this.ctx.fillStyle = "red";
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
    this.moveSnake(direction);
  }

  moveSnake(direction: Direction) {
    this.direction = direction;
    this.centerX += this.displacement * this.direction.x * this.velocity;
    this.centerY += this.displacement * this.direction.y * this.velocity;

    this.detectWallCollision();
  }
}
