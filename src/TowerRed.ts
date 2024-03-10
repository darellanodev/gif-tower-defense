import { Position } from './types'
import { MathUtils } from './MathUtils'
import { Image } from 'p5'
import { ProgressBar } from './ProgressBar'
import { Enemy } from './Enemy'
import { ConstColor } from './ConstColor'
import { Const } from './Const'
import { Tower } from './Tower'

export class TowerRed extends Tower {
  static ID = 2
  static PROFIT_SELL_UPGRADE = [80, 110, 190, 420, 1200, 2880]
  static COST_UPGRADE = [100, 150, 250, 500, 1300, 3000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA = 240

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

    this.#progressBar = new this.#ProgressBarClass(
      this.#position,
      ProgressBar.WIDTH,
      ProgressBar.HEIGHT,
    )
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
    fill(ConstColor.RED)
    rect(
      this.#position.x + 4,
      this.#position.y + 4,
      Const.TILE_SIZE,
      Const.TILE_SIZE,
    )
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
    return TowerRed.UPGRADE_INFLUENCE_AREA[this.#upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
      return TowerRed.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL]
    }
    return TowerRed.COST_UPGRADE[selectedUpgradeLevel]
  }

  get sellProfit() {
    return TowerRed.PROFIT_SELL_UPGRADE[this.upgradeLevel]
  }

  get type() {
    return TowerRed.ID
  }

  selectTarget(enemies: Enemy[]) {
    //TODO
  }
}
