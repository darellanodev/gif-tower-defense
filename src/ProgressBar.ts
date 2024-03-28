import { Position, Size } from './types'

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
    strokeWeight(1)
    stroke('black')
    fill('green')
    rect(
      this.#position.x + 10,
      this.#position.y + 20,
      this.#size.w,
      this.#size.h,
    )
  }

  _drawProgressBar() {
    strokeWeight(0)
    fill('red')
    const progressLevel = (this.#progress * this.#maxProgress) / 100
    rect(
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
