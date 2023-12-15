export class UpgradeDisplay {
  SIZE_UPGRADE_TILE = 48
  TIME_UPGRADE_0_MAX = 2

  MAX_CAPACITY = 23

  x: number
  y: number
  color: number[]
  timeUpgrade: number
  capacity: number
  finished: boolean

  constructor(x: number, y: number, color: number[]) {
    this.x = x
    this.y = y
    this.color = color
    this.timeUpgrade = 0
    this.capacity = 0
    this.finished = false
  }

  _update() {
    if (this.capacity < this.MAX_CAPACITY) {
      this.timeUpgrade++
      if (this.timeUpgrade > this.TIME_UPGRADE_0_MAX) {
        this.timeUpgrade = 0
        this.capacity++
      }
    } else {
      this.finished = true
    }
  }

  isFinished() {
    return this.finished
  }

  _drawBackgroundTile() {
    noStroke()
    fill(this.color)
    rect(this.x, this.y, this.SIZE_UPGRADE_TILE)
  }

  _drawBackgroundBar() {
    fill('white')
    rect(this.x + 10, this.y + 20, 27, 10)
  }

  _drawBar() {
    fill(this.color)
    rect(this.x + 12, this.y + 22, this.capacity, 6)
  }

  draw() {
    this._update()

    this._drawBackgroundTile()
    this._drawBackgroundBar()
    this._drawBar()
  }
}
