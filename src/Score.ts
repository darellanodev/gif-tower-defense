export class Score {
  score: number

  constructor() {
    this.score = 0
  }

  increase(score: number) {
    this.score = score
  }

  getPrintScore(): string {
    return String(this.score).padStart(6, '0')
  }
}
