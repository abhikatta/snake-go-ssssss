import { newSnake } from "../game/main";

import { getSnakeColor } from "../lib/SnakeColor";
import { SnakeData } from "../types";
const webSocket = new WebSocket("ws://localhost:3000");

webSocket.onopen = () => {
  console.log("WebSocket connection established");
};

webSocket.onmessage = (event: MessageEvent<any>) => {
  const snakeData = JSON.parse(event.data) as SnakeData;

  if (snakeData.color !== getSnakeColor()) {
    newSnake.centerX = snakeData.x;
    newSnake.centerY = snakeData.y;
    newSnake.snakeColor = snakeData.color;
    newSnake.direction = snakeData.direction;
  }
};

export const sendSnakeDirection = async (snake: SnakeData) => {
  if (webSocket.readyState === webSocket.OPEN) {
    const snakeData = JSON.stringify(snake);
    webSocket.send(snakeData);
  }
};
