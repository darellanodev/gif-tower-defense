import { Position } from './types'
import { MathUtils } from './MathUtils'
import { ProgressBar } from './ProgressBar'
import { Image } from 'p5'
import { Enemy } from './Enemy'
import { ConstColor } from './ConstColor'
import { Const } from './Const'
import { Tower } from './Tower'

export class TowerYellow extends Tower {
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
    super(position)
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

  get influenceArea() {
    return TowerYellow.UPGRADE_INFLUENCE_AREA[this.#upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
      return TowerYellow.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL]
    }
    return TowerYellow.COST_UPGRADE[selectedUpgradeLevel]
  }

  get cost() {
    return this.getCostWhenUpgradeLevelIs(this.upgradeLevel)
  }

  get nextLevelUpgradeCost() {
    if (this.maxUpgraded) {
      return this.getCostWhenUpgradeLevelIs(Const.UPGRADE_MAX_LEVEL - 1)
    } else {
      return this.getCostWhenUpgradeLevelIs(this.upgradeLevel + 1)
    }
  }

  get sellProfit() {
    return TowerYellow.PROFIT_SELL_UPGRADE[this.upgradeLevel]
  }

  get type() {
    return TowerYellow.ID
  }

  selectTarget(enemies: Enemy[]) {
    //TODO
  }
}
