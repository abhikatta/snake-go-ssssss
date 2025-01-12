import { Direction } from "../types";

export const ChangeDirection = (direction: Direction, key: KeyboardEvent) => {
  const { code } = key;
  if (code === "KeyW") {
    return { x: 0, y: -1 };
  }
  if (code === "KeyS") {
    return { x: 0, y: 1 };
  }
  if (code === "KeyA") {
    return { x: -1, y: 0 };
  }
  if (code === "KeyD") {
    return { x: 1, y: 0 };
  }
  return direction;
};
