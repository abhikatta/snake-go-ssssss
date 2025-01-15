import { snakeColorType } from "../types";

export const selectColor = (e: Event) => {
  const snakeColor = getSnakeColor();
  if (Boolean(snakeColor)) {
    return alert(
      `Color already selected as ${snakeColor
        ?.charAt(0)
        .toLocaleUpperCase()}${snakeColor?.slice(1)}!`
    );
  } else {
    const color = (e.target as HTMLSelectElement).value;
    localStorage.setItem("snakeColor", color);
  }
};

export const getSnakeColor = (): snakeColorType | "gray" => {
  const snakeColor = localStorage.getItem("snakeColor");
  if (snakeColor) return snakeColor as snakeColorType;
  else return "gray";
};
