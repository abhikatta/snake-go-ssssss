// TODO: update snake direction to not to change by 180deg directly

import { Direction } from "./types";

export class Snake {
  centerX = 0;
  centerY = 0;

  // static
  worldWidth = window.innerWidth - 100;
  worldHeight = window.innerHeight - 100;

  ctx: CanvasRenderingContext2D | null = null;

  // physics
  direction: Direction = { x: 0, y: 0 };
  velocity = 0.6;
  displacement = this.velocity * 10;
  constructor(canvas: HTMLCanvasElement) {
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.ctx = canvas.getContext("2d");
  }

  detectWallCollision() {
    if (this.centerX > this.worldWidth) {
      this.centerX = this.centerX - (this.worldWidth + this.displacement);
    }
    if (this.centerY > this.worldHeight) {
      this.centerY = this.centerY - (this.worldHeight + this.displacement);
    }
    if (this.centerX < this.displacement * 2) {
      this.centerX = this.centerX + (this.worldWidth + this.displacement);
    }
    if (this.centerY < this.displacement * 2) {
      this.centerY = this.centerY + (this.worldHeight + this.displacement);
    }
  }

  moveSnake(direction: Direction) {
    this.direction = direction;
    this.velocity = 0.7;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.worldWidth, this.worldHeight);

      this.ctx.beginPath();
      this.ctx.roundRect(
        (this.centerX += this.displacement * this.direction.x * this.velocity),
        (this.centerY += this.displacement * this.direction.y * this.velocity),
        50,
        50,
        14
      );
      this.ctx.fillStyle = "red";
      this.ctx.fill();
      this.ctx.closePath();
      this.detectWallCollision();
    }
  }
}
