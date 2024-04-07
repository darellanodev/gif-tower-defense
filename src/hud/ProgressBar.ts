import { Position, Size } from '../utils/types'
import { P5 } from '../utils/P5'

export class ProgressBar {
  static WIDTH = 27
  static HEIGHT = 7

  #position: Position
  #size: Size

  #progress: number = 0
  #maxProgress: number

  constructor(position: Position, size: Size) {
    this.#position = { ...position }
    this.#size = { ...size }

    this.#maxProgress = this.#size.w - 1
  }

  setPosition(position: Position) {
    this.#position = { ...position }
  }

  setProgress(progress: number) {
    this.#progress = progress
  }

  getProgress(): number {
    return this.#progress
  }

  increaseProgress(increment: number = 1) {
    this.#progress += increment
    if (this.#progress > 100) {
      this.#progress = 100
    }
  }

  isFullOfProgress() {
    return this.#progress >= 100
  }

  _drawBackgroundBar() {
    P5.p5.strokeWeight(1)
    P5.p5.stroke('black')
    P5.p5.fill('green')
    P5.p5.rect(
      this.#position.x + 10,
      this.#position.y + 20,
      this.#size.w,
      this.#size.h,
    )
  }

  _drawProgressBar() {
    P5.p5.strokeWeight(0)
    P5.p5.fill('red')
    const progressLevel = (this.#progress * this.#maxProgress) / 100
    P5.p5.rect(
      this.#position.x + 11,
      this.#position.y + 21,
      progressLevel,
      this.#size.h - 2,
    )
  }

  draw() {
    this._drawBackgroundBar()
    if (this.#progress > 0) {
      this._drawProgressBar()
    }
  }
}
