import { ERROR_MESSAGE } from "../data";
import { Direction } from "../types";

export const ChangeDirection = (
  direction: Direction,
  key: KeyboardEvent
): [Direction, string] => {
  const { code } = key;

  const PossibleDirections: {
    [key: string]: {
      newDirection: Direction;
      isError: boolean;
    };
  } = {
    KeyW: { newDirection: { x: 0, y: -1 }, isError: direction.y === 1 },
    KeyS: { newDirection: { x: 0, y: 1 }, isError: direction.y === -1 },
    KeyA: { newDirection: { x: -1, y: 0 }, isError: direction.x === 1 },
    KeyD: { newDirection: { x: 1, y: 0 }, isError: direction.x === -1 },
  };

  const newDirection = PossibleDirections[code as string];

  if (newDirection) {
    return [
      newDirection.isError ? direction : newDirection.newDirection,
      newDirection.isError ? ERROR_MESSAGE : "",
    ];
  }

  return [direction, ""];
};
