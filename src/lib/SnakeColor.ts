import { snakeColorType } from "../types";

export const selectColor = (e: Event) => {
  const color = (e.target as HTMLSelectElement).value;
  localStorage.setItem("snakeColor", color);
};

export const getSnakeColor = (): snakeColorType | "gray" => {
  const snakeColor = localStorage.getItem("snakeColor");
  if (snakeColor) return snakeColor as snakeColorType;
  else return "gray";
};
