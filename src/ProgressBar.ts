import { Position } from './types'

export class ProgressBar {
  static WIDTH = 27
  static HEIGHT = 7

  position: Position
  width: number
  height: number
  progress: number
  maxProgress: number

  constructor(position: Position, width: number, height: number) {
    this.position = { ...position }
    this.width = width
    this.height = height

    this.progress = 0
    this.maxProgress = this.width - 1
  }

  setPosition(position: Position) {
    this.position = { ...position }
  }

  setProgress(progress: number) {
    this.progress = progress
  }

  getProgress(): number {
    return this.progress
  }

  increaseProgress() {
    this.progress++
  }

  isFullOfProgress() {
    return this.progress >= 100
  }

  _drawBackgroundBar() {
    strokeWeight(1)
    stroke('black')
    fill('green')
    rect(this.position.x + 10, this.position.y + 20, this.width, this.height)
  }

  _drawProgressBar() {
    strokeWeight(0)
    fill('red')
    const progressLevel = (this.progress * this.maxProgress) / 100
    rect(
      this.position.x + 11,
      this.position.y + 21,
      progressLevel,
      this.height - 2,
    )
  }

  draw() {
    this._drawBackgroundBar()
    if (this.progress > 0) {
      this._drawProgressBar()
    }
  }
}
