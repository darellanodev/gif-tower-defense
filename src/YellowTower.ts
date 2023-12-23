import { ConstType } from './types'
import { Distance } from './Distance'
import { ProgressBar } from './ProgressBar'
import { Image } from 'p5'

export class YellowTower {
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
    this.progressBar = new this.ProgressBarClass(this.x, this.y, 27, 7)
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

  draw() {
    image(this.images[this.upgradeLevel], this.x, this.y)
    if (this.isUpgrading) {
      if (!this.progressBar.isFullOfProgress()) {
        this.upgradeProgress++
        this.progressBar.setProgress(this.upgradeProgress)
        this.progressBar.draw()
      } else {
        this.isUpgrading = false
        this.upgradeProgress = 0
      }
    }
  }

  getInfluenceArea() {
    return this.Const.YELLOW_TOWER_UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > this.Const.UPGRADE_MAX_LEVEL) {
      return this.Const.COST_UPGRADE_YELLOW_TOWER[this.Const.UPGRADE_MAX_LEVEL]
    }
    return this.Const.COST_UPGRADE_YELLOW_TOWER[selectedUpgradeLevel]
  }

  getCost() {
    return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel())
  }

  getType() {
    return this.Const.YELLOW_TOWER
  }

  getColor() {
    return this.Const.YELLOW_COLOR
  }

  selectTarget(enemies: any[]) {
    //TODO
  }
}
