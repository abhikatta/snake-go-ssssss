export const foods = {
  small: { value: 1, rarity: 1, color: "#dedede" },
  medium: { value: 3, rarity: 0.6, color: "green" },
  large: { value: 5, rarity: 0.2, color: "red" },
  Epic: { value: 15, rarity: 0.08, color: "purple" },
};

// TODO
export class Food {
  isSpawnedfood: boolean = false;
  maxFoodItems = 4;
  canvasWidth = 0;
  canvasHeight = 0;
  //   constructor({
  //     canvasWidth,
  //     canvasHeight,
  //   }: {
  //     canvasWidth: number;
  //     canvasHeight: number;
  //   }) {
  //     this.canvasHeight = canvasHeight;
  //     this.canvasWidth = canvasWidth;
  //   }
  spawnFood() {}
}
