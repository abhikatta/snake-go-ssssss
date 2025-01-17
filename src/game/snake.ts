import { getSnakeColor } from "../lib/SnakeColor";
import { sendSnakeDirection } from "../socket/clientSocket";
import { Direction, FoodItem, snakeColorType, SnakeData } from "../types";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./data";
// import { Food } from "./food";
import { Score } from "./score";

export class Snake extends Score {
  //   snakeProps
  private size = { length: 50, width: 50 };
  snakeColor: snakeColorType = "gray";

  foodItem: FoodItem | null = null;
  foodItemCenterX: number | null = null;
  foodItemCenterY: number | null = null;
  foodItemSize: { width: number; height: number } | null = null;
  // static
  private worldWidth = CANVAS_WIDTH;
  private worldHeight = CANVAS_HEIGHT;
  ctx: CanvasRenderingContext2D | null = null;

  // physics
  direction: Direction = { x: 0, y: 0 };
  private velocity = 0.4;
  private displacement = this.velocity * 10;

  centerX = 0;
  centerY = 0;
  canvas: HTMLCanvasElement | null = null;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.ctx = canvas.getContext("2d");
    this.worldHeight = canvas.height;
    this.worldWidth = canvas.width;
    this.canvas = canvas;
    this.snakeColor = getSnakeColor();
  }

  private detectWallCollision() {
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
        (this.centerX += this.displacement * this.direction?.x * this.velocity),
        (this.centerY += this.displacement * this.direction?.y * this.velocity),
        this.size.length,
        this.size.width,
        14
      );
      this.ctx.fillStyle = this.snakeColor;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }

    this.moveSnake(direction);
  }

  async moveSnake(direction: Direction) {
    this.direction = direction;
    this.centerX += this.displacement * this.direction?.x * this.velocity;
    this.centerY += this.displacement * this.direction?.y * this.velocity;

    this.detectWallCollision();
    this.isEaten();

    await sendSnakeDirection(this.getSnakeData());
  }
  updateFoodItem(
    foodItemCenterX: number,
    foodItemCenterY: number,
    foodItemSize: { width: number; height: number },
    foodItem: FoodItem
  ) {
    this.foodItem = foodItem;
    this.foodItemCenterX = foodItemCenterX;
    this.foodItemCenterY = foodItemCenterY;
    this.foodItemSize = foodItemSize;
    this.foodItem = foodItem;
  }

  isEaten(): boolean {
    if (this.foodItem) {
      const snakePosition = { x: this.centerX, y: this.centerY };
      const foodPosition = {
        x: this.foodItemCenterX,
        y: this.foodItemCenterY,
      };
      if (
        this.foodItem &&
        foodPosition.x &&
        foodPosition.y &&
        this.foodItemSize &&
        Math.abs(snakePosition.x - foodPosition.x) <= this.foodItemSize.width &&
        Math.abs(snakePosition.y - foodPosition.y) <= this.foodItemSize.height
      ) {
        this.increaseScore(this.foodItem.value);
        // this.unspawnFoodItem(true);
        return true;
      }
    }
    return false;
  }

  getSnakeData(): SnakeData {
    return {
      color: this.snakeColor,
      x: this.centerX,
      y: this.centerY,
      direction: this.direction,
      score: this.score,
    };
  }
}
