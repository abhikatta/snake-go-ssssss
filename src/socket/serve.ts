import { newSnake } from "../game/main";
import { Snake } from "../game/snake";
import { getSnakeColor } from "../lib/SnakeColor";
import { SnakeData } from "../types";
const webSocket = new WebSocket("wss://spicy-maddening-relative.glitch.me/");
webSocket.onopen = () => {
  console.log("WebSocket connection established");
};

webSocket.onmessage = (event: MessageEvent<any>) => {
  const snakeData = JSON.parse(event.data) as SnakeData;

  console.log(snakeData);

  if (snakeData.color !== getSnakeColor()) {
    newSnake.direction = snakeData.direction;
    newSnake.snakeColor = snakeData.color;
  }
};

export const sendSnakeDirection = async (snake: Snake) => {
  if (webSocket.readyState === webSocket.OPEN) {
    const snakeData = JSON.stringify(snake.getSnakeData());
    webSocket.send(snakeData);
  }
};
