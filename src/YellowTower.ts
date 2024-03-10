import { Position } from './types'
import { MathUtils } from './MathUtils'
import { ProgressBar } from './ProgressBar'
import { Image } from 'p5'
import { Enemy } from './Enemy'
import { ConstColor } from './ConstColor'
import { Const } from './Const'

export class YellowTower {
  static ID = 3
  static PROFIT_SELL_UPGRADE = [680, 2460, 7440, 21920, 66900, 199880]
  static COST_UPGRADE = [700, 2500, 7500, 22000, 67000, 200000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA = 290

  #images: Image[]
  #position: Position
  #MathUtilsClass: typeof MathUtils
  #ProgressBarClass: typeof ProgressBar

  #upgradeLevel: number = 0
  #upgrading: boolean = false
  #progressBar: ProgressBar
  #upgradeProgress: number = 0

  constructor(
    images: Image[],
    position: Position,
    MathUtilsClass: typeof MathUtils,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.#images = images
    this.#position = { ...position }
    this.#MathUtilsClass = MathUtilsClass
    this.#ProgressBarClass = ProgressBarClass

    this.#progressBar = new this.#ProgressBarClass(this.#position, 27, 7)
  }

  upgrade() {
    if (!this.#upgrading) {
      this.#upgrading = true
      this.#upgradeLevel++
    }
  }

  get notUpgrading() {
    return !this.#upgrading
  }

  get position() {
    return this.#position
  }

  get upgradeLevel() {
    return this.#upgradeLevel
  }

  get maxUpgraded() {
    return this.#upgradeLevel === Const.UPGRADE_MAX_LEVEL - 1
  }

  _drawUpgradeBackground() {
    strokeWeight(1)
    stroke('black')
    fill(ConstColor.YELLOW)
    rect(this.#position.x, this.#position.y, Const.TILE_SIZE, Const.TILE_SIZE)
  }

  draw() {
    if (this.#upgrading) {
      this._drawUpgradeBackground()
      if (!this.#progressBar.isFullOfProgress()) {
        this.#upgradeProgress++
        this.#progressBar.setProgress(this.#upgradeProgress)
        this.#progressBar.draw()
      } else {
        this.#upgrading = false
        this.#upgradeProgress = 0
        this.#progressBar.setProgress(0)
      }
    } else {
      image(
        this.#images[this.#upgradeLevel],
        this.#position.x,
        this.#position.y,
      )
    }
  }

  getInfluenceArea() {
    return YellowTower.UPGRADE_INFLUENCE_AREA[this.#upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
      return YellowTower.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL]
    }
    return YellowTower.COST_UPGRADE[selectedUpgradeLevel]
  }

  getCost() {
    return this.getCostWhenUpgradeLevelIs(this.upgradeLevel)
  }

  getNextLevelUpgradeCost() {
    if (this.maxUpgraded) {
      return this.getCostWhenUpgradeLevelIs(Const.UPGRADE_MAX_LEVEL - 1)
    } else {
      return this.getCostWhenUpgradeLevelIs(this.upgradeLevel + 1)
    }
  }

  getSellProfit() {
    return YellowTower.PROFIT_SELL_UPGRADE[this.upgradeLevel]
  }

  getType() {
    return YellowTower.ID
  }

  getColor() {
    return ConstColor.YELLOW
  }

  selectTarget(enemies: Enemy[]) {
    //TODO
  }
}
