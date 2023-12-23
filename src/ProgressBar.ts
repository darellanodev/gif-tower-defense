export class ProgressBar {
  x: number
  y: number
  width: number
  height: number
  progress: number
  maxProgress: number

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.progress = 0
    this.maxProgress = this.width - 1
  }

  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
  }

  setProgress(progress: number) {
    this.progress = progress
  }

  isFullOfProgress() {
    return this.progress >= 100
  }

  _drawBackgroundBar() {
    strokeWeight(1)
    stroke('black')
    fill('green')
    rect(this.x + 10, this.y + 20, this.width, this.height)
  }

  _drawProgressBar() {
    strokeWeight(0)
    fill('red')
    const progressLevel = (this.progress * this.maxProgress) / 100
    rect(this.x + 11, this.y + 21, progressLevel, this.height - 2)
  }

  draw() {
    this._drawBackgroundBar()
    if (this.progress > 0) {
      this._drawProgressBar()
    }
  }
}
