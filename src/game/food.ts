import { CANVAS_HEIGHT, CANVAS_WIDTH, foods, RarityValues } from "./data";
import { Score } from "./score";
import { Snake } from "./snake";
import { FoodItem, Rarity } from "../types";

// this is the entire food context, not just an item that will be destroyed after the snake eats it, should be
// probably refactored

//  requirments:
// 1. spawn food, max one item at a time
// 2. after a said time, the food vanishes
// 3. as rarity increases, food spawn and lifetime decrease // TODO

export class Food {
  foodItemCenterX = 0;
  foodItemCenterY = 0;
  canvasWidth = CANVAS_WIDTH;
  canvasHeight = CANVAS_HEIGHT;
  ctx: CanvasRenderingContext2D | null = null;
  worldWidth = window.innerWidth - 100;
  worldHeight = window.innerHeight - 100;
  foodItemSize = { height: 50, width: 50 };
  foodItem: FoodItem | null = null;
  foodTimeout: any | null = null;
  score: Score | null = null;
  snakes: Snake[] | null = null;
  constructor(canvas: HTMLCanvasElement, snakes: Snake[], score: Score) {
    this.ctx = canvas.getContext("2d");
    this.score = score;
    this.snakes = snakes;
  }

  createNewFoodItem() {
    const randomRarity = RarityValues[
      Math.floor(Math.random() * RarityValues.length)
    ] as Rarity;
    this.foodItemCenterX = Math.floor(
      Math.random() * (this.canvasWidth - this.foodItemSize.width)
    );
    this.foodItemCenterY = Math.floor(
      Math.random() * (this.canvasHeight - this.foodItemSize.height)
    );
    this.foodItem = foods[randomRarity];
  }

  spawnFoodItem() {
    if (this.foodTimeout) {
      clearInterval(this.foodTimeout);
      this.foodTimeout = null;
      this.foodItem = null;
    }
    this.createNewFoodItem();
    if (this.foodItem) {
      this.foodTimeout = setTimeout(() => {
        this.foodItem = null;
        this.spawnFoodItem();
      }, this.foodItem?.lifetime * 1000);
    }
  }

  drawFood() {
    if (this.ctx && this.foodItem) {
      this.isEaten();
      this.ctx.beginPath();
      this.ctx.roundRect(
        this.foodItemCenterX,
        this.foodItemCenterY,
        this.foodItemSize.width,
        this.foodItemSize.height,
        10
      );
      this.ctx.fillStyle = this.foodItem.color;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  isEaten(): boolean {
    if (this.snakes && this.snakes?.length > 0 && this.score && this.foodItem) {
      this.snakes.forEach((snake) => {
        const snakePosition = { x: snake.centerX, y: snake.centerY };
        const foodPosition = {
          x: this.foodItemCenterX,
          y: this.foodItemCenterY,
        };
        if (
          this.foodItem &&
          Math.abs(snakePosition.x - foodPosition.x) <=
            this.foodItemSize.width &&
          Math.abs(snakePosition.y - foodPosition.y) <= this.foodItemSize.height
        ) {
          snake.increaseScore(this.foodItem.value);
          this.unspawnFoodItem(true);
          return true;
        }
      });
    }
    return false;
  }

  unspawnFoodItem(isAlreadyEaten: boolean) {
    if (this.foodTimeout) {
      clearTimeout(this.foodTimeout);
      this.foodTimeout = null;
    }
    this.foodItem = null;
    if (isAlreadyEaten) {
      this.spawnFoodItem();
    }
  }
}
