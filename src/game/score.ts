import { GetHighestScore, SetHighestScore } from "../lib/HighScore";

export class Score {
  score = 0;
  increaseScore(scoreValue: number): void {
    this.score += scoreValue;
    const highScore = GetHighestScore();
    if (this.score > highScore) {
      SetHighestScore(this.score);
    }
  }
  getScore(): number {
    return this.score;
  }
}
