export const SetHighestScore = (score: number) => {
  localStorage.setItem("highScore", JSON.stringify(score));
};

export const GetHighestScore = (): number => {
  const highScore = localStorage.getItem("highScore");
  if (highScore) return Number(highScore);
  else return 0;
};
