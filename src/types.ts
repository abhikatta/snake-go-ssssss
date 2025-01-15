import { Score } from "./game/score";

export type DirectionValueType = 0 | -1 | 1;

export type Direction = {
  x: DirectionValueType;
  y: DirectionValueType;
};

export type Rarity = "small" | "medium" | "large" | "epic";

export type FoodItem = {
  value: number;
  rarity: number;
  color: string;
  lifetime: number;
};

export type snakeColorType = "black" | "white" | "gray";
export interface SnakeData {
  color: snakeColorType;
  x: number;
  y: number;
  direction: Direction;
  score: Score["score"];
}
