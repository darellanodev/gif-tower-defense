import { Position } from '../types/position'
import { Size } from '../types/size'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'

export class ProgressBar extends Obj {
  static WIDTH = 27
  static HEIGHT = 7

  #size: Size

  #progress: number = 0
  #maxProgress: number

  constructor(position: Position, size: Size) {
    super(position)
    this.#size = { ...size }
    this.#maxProgress = this.#size.w - 1
  }

  get progress(): number {
    return this.#progress
  }

  reinitProgress() {
    this.#progress = 0
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
      this.position.x + 10,
      this.position.y + 23,
      this.#size.w,
      this.#size.h,
    )
  }

  _drawProgressBar() {
    P5.p5.strokeWeight(0)
    P5.p5.fill('red')
    const progressLevel = (this.#progress * this.#maxProgress) / 100
    P5.p5.rect(
      this.position.x + 11,
      this.position.y + 24,
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
