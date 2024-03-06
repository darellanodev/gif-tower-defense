import { ConstType, Position, RGBType } from './types'
import { MathUtils } from './MathUtils'
import { ProgressBar } from './ProgressBar'
import { Image } from 'p5'
import { Enemy } from './Enemy'

export class YellowTower {
  static ID = 3
  static COLOR = [202, 191, 24] as RGBType
  static PROFIT_SELL_UPGRADE = [680, 2460, 7440, 21920, 66900, 199880]
  static COST_UPGRADE = [700, 2500, 7500, 22000, 67000, 200000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA = 290

  images: Image[]
  position: Position
  Const: ConstType
  MathUtilsClass: typeof MathUtils
  ProgressBarClass: typeof ProgressBar

  upgradeLevel: number
  upgrading: boolean
  progressBar: ProgressBar
  upgradeProgress: number

  constructor(
    images: Image[],
    position: Position,
    Const: ConstType,
    MathUtilsClass: typeof MathUtils,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.images = images
    this.position = { ...position }
    this.Const = Const
    this.MathUtilsClass = MathUtilsClass
    this.ProgressBarClass = ProgressBarClass

    this.upgradeLevel = 0
    this.upgrading = false
    this.progressBar = new this.ProgressBarClass(this.position, 27, 7)
    this.upgradeProgress = 0
  }

  upgrade() {
    if (!this.upgrading) {
      this.upgrading = true
      this.upgradeLevel++
    }
  }

  isNotUpgrading() {
    return !this.upgrading
  }

  getPosition() {
    return this.position
  }

  getUpgradeLevel() {
    return this.upgradeLevel
  }

  isMaxUpgraded() {
    return this.upgradeLevel === this.Const.UPGRADE_MAX_LEVEL - 1
  }

  _drawUpgradeBackground() {
    strokeWeight(1)
    stroke('black')
    fill(YellowTower.COLOR)
    rect(
      this.position.x,
      this.position.y,
      this.Const.TILE_SIZE,
      this.Const.TILE_SIZE,
    )
  }

  draw() {
    if (this.upgrading) {
      this._drawUpgradeBackground()
      if (!this.progressBar.isFullOfProgress()) {
        this.upgradeProgress++
        this.progressBar.setProgress(this.upgradeProgress)
        this.progressBar.draw()
      } else {
        this.upgrading = false
        this.upgradeProgress = 0
        this.progressBar.setProgress(0)
      }
    } else {
      image(this.images[this.upgradeLevel], this.position.x, this.position.y)
    }
  }

  getInfluenceArea() {
    return YellowTower.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > this.Const.UPGRADE_MAX_LEVEL) {
      return YellowTower.COST_UPGRADE[this.Const.UPGRADE_MAX_LEVEL]
    }
    return YellowTower.COST_UPGRADE[selectedUpgradeLevel]
  }

  getCost() {
    return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel())
  }

  getNextLevelUpgradeCost() {
    if (this.isMaxUpgraded()) {
      return this.getCostWhenUpgradeLevelIs(this.Const.UPGRADE_MAX_LEVEL - 1)
    } else {
      return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel() + 1)
    }
  }

  getSellProfit() {
    return YellowTower.PROFIT_SELL_UPGRADE[this.getUpgradeLevel()]
  }

  getType() {
    return YellowTower.ID
  }

  getColor() {
    return YellowTower.COLOR
  }

  selectTarget(enemies: Enemy[]) {
    //TODO
  }
}
