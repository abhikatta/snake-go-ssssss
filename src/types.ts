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