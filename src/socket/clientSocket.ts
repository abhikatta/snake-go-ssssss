import { foodItem, newSnake, snake } from "../game/main";

import { getSnakeColor } from "../lib/SnakeColor";
import { SnakeData } from "../types";
const webSocket = new WebSocket("ws://localhost:3000");

webSocket.onopen = () => {
  console.log("WebSocket connection established");
};

webSocket.onmessage = (event: MessageEvent<any>) => {
  const data = JSON.parse(event.data);

  const foodData = data.foodData;
  foodItem.spawnFoodItem();

  foodItem.foodItemCenterX = foodData.foodItemCenterX;
  foodItem.foodItemCenterY = foodData.foodItemCenterY;
  foodItem.foodItem = foodData.foodItem;

  foodItem.drawFood();

  const snakeData = JSON.parse(data.snakeData);
  if (snakeData.color !== getSnakeColor()) {
    newSnake.centerX = snakeData.x;
    newSnake.centerY = snakeData.y;
    newSnake.snakeColor = snakeData.color;
    newSnake.direction = snakeData.direction;
    snake.updateFoodItem(
      foodData.foodItem,
      foodData.foodItemCenterX,
      foodData.foodItemCenterY,
      foodData.foodItemSize
    );
    newSnake.updateFoodItem(
      foodData.foodItem,
      foodData.foodItemCenterX,
      foodData.foodItemCenterY,
      foodData.foodItemSize
    );
  }
};

export const sendSnakeDirection = async (snake: SnakeData) => {
  if (webSocket.readyState === webSocket.OPEN) {
    const snakeData = JSON.stringify(snake);
    webSocket.send(snakeData);
  }
};
