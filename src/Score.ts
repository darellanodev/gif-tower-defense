export class Score {
  static score: number = 0

  static increase(score: number) {
    Score.score += score
  }

  static getPrintScore(): string {
    return String(Score.score).padStart(10, '0')
  }
}
