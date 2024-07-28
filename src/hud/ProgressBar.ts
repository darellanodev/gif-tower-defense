import { Position } from '../types/position'
import { Size } from '../types/size'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'

export class ProgressBar extends Obj {
  #size: Size
  #progress: number = 0
  #maxProgress: number

  #offsetPosition: Position = { x: 0, y: 0 }
  constructor(
    position: Position,
    size: Size,
    offsetPosition: Position = { x: 0, y: 0 },
  ) {
    super(position)
    this.#size = { ...size }
    this.#maxProgress = this.#size.w - 1
    this.#offsetPosition = { ...offsetPosition }
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

  #drawBackgroundBar() {
    P5.p5.strokeWeight(1)
    P5.p5.stroke('black')
    P5.p5.fill('green')
    P5.p5.rect(
      this.position.x + this.#offsetPosition.x,
      this.position.y + this.#offsetPosition.y,
      this.#size.w,
      this.#size.h,
    )
  }

  #drawProgressBar() {
    P5.p5.strokeWeight(0)
    P5.p5.fill('red')
    const progressLevel = (this.#progress * this.#maxProgress) / 100
    P5.p5.rect(
      this.position.x + this.#offsetPosition.x + 1,
      this.position.y + this.#offsetPosition.y + 1,
      progressLevel,
      this.#size.h - 2,
    )
  }

  draw() {
    this.#drawBackgroundBar()
    if (this.#progress > 0) {
      this.#drawProgressBar()
    }
  }
}
