import { ConstType } from './types'
import { Distance } from './Distance'
import { Image } from 'p5'
import { ProgressBar } from './ProgressBar'

export class RedTower {
  images: Image[]
  x: number
  y: number
  Const: ConstType
  DistanceClass: typeof Distance
  ProgressBarClass: typeof ProgressBar

  upgradeLevel: number
  isUpgrading: boolean
  progressBar: ProgressBar
  upgradeProgress: number

  constructor(
    images: Image[],
    x: number,
    y: number,
    Const: ConstType,
    DistanceClass: typeof Distance,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.images = images
    this.x = x
    this.y = y
    this.Const = Const
    this.DistanceClass = DistanceClass
    this.ProgressBarClass = ProgressBarClass

    this.upgradeLevel = 0
    this.isUpgrading = false
    this.progressBar = new this.ProgressBarClass(
      this.x + this.Const.TOWER_OFFSET,
      this.y + this.Const.TOWER_OFFSET,
      this.Const.PROGRESSBAR_WIDTH,
      this.Const.PROGRESSBAR_HEIGHT,
    )
    this.upgradeProgress = 0
  }

  upgrade() {
    if (!this.isUpgrading) {
      this.isUpgrading = true
      this.upgradeLevel++
    }
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  getUpgradeLevel() {
    return this.upgradeLevel
  }

  _drawUpgradeBackground() {
    strokeWeight(1)
    stroke('black')
    fill(this.Const.RED_COLOR)
    rect(this.x + 4, this.y + 4, this.Const.TILE_SIZE, this.Const.TILE_SIZE)
  }

  draw() {
    if (this.isUpgrading) {
      this._drawUpgradeBackground()
      if (!this.progressBar.isFullOfProgress()) {
        this.upgradeProgress++
        this.progressBar.setProgress(this.upgradeProgress)
        this.progressBar.draw()
      } else {
        this.isUpgrading = false
        this.upgradeProgress = 0
        this.progressBar.setProgress(0)
      }
    } else {
      image(this.images[this.upgradeLevel], this.x, this.y)
    }
  }

  getInfluenceArea() {
    return this.Const.RED_TOWER_UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > this.Const.UPGRADE_MAX_LEVEL) {
      return this.Const.COST_UPGRADE_RED_TOWER[this.Const.UPGRADE_MAX_LEVEL]
    }
    return this.Const.COST_UPGRADE_RED_TOWER[selectedUpgradeLevel]
  }

  getCost() {
    return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel())
  }

  getType() {
    return this.Const.RED_TOWER
  }

  getColor() {
    return this.Const.RED_COLOR
  }

  selectTarget(enemies: any[]) {
    //TODO
  }
}
