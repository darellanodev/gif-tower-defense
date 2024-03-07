import { ConstType, Position } from './types'
import { MathUtils } from './MathUtils'
import { Image } from 'p5'
import { ProgressBar } from './ProgressBar'
import { Enemy } from './Enemy'
import { Color } from './Color'

export class RedTower {
  static ID = 2
  static PROFIT_SELL_UPGRADE = [80, 110, 190, 420, 1200, 2880]
  static COST_UPGRADE = [100, 150, 250, 500, 1300, 3000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA = 240

  images: Image[]
  position: Position
  Const: ConstType
  MathUtilsClass: typeof MathUtils
  ProgressBarClass: typeof ProgressBar

  upgradeLevel: number = 0
  upgrading: boolean = false
  progressBar: ProgressBar
  upgradeProgress: number = 0

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

    this.progressBar = new this.ProgressBarClass(
      this.position,
      ProgressBar.WIDTH,
      ProgressBar.HEIGHT,
    )
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
    fill(Color.RED)
    rect(
      this.position.x + 4,
      this.position.y + 4,
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
    return RedTower.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > this.Const.UPGRADE_MAX_LEVEL) {
      return RedTower.COST_UPGRADE[this.Const.UPGRADE_MAX_LEVEL]
    }
    return RedTower.COST_UPGRADE[selectedUpgradeLevel]
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
    return RedTower.PROFIT_SELL_UPGRADE[this.getUpgradeLevel()]
  }

  getType() {
    return RedTower.ID
  }

  getColor() {
    return Color.RED
  }

  selectTarget(enemies: Enemy[]) {
    //TODO
  }
}
