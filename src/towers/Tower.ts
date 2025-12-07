import { Position } from '../types/position'
import { RGBType } from '../types/rgb'
import { Const } from '../constants/Const'
import { ProgressBar } from '../hud/progressbar/ProgressBar'
import { Enemy } from '../enemies/Enemy'
import { P5 } from '../utils/P5'
import { TileOrange } from '../levels/tiles/TileOrange'
import { Obj } from '../Obj'
import { PositionUtils } from '../utils/PositionUtils'
import { Size } from '../types/size'

export class Tower extends Obj {
  static OFFSET_X: number = 3
  static OFFSET_Y: number = 4
  static UPGRADE_INCREMENT: number = 1
  static INSTANT_UPGRADING: boolean = false // for testing purposes is set to true

  upgrading: boolean = false
  upgradeLevel: number = 0
  progressBar: ProgressBar
  upgradeProgress: number = 0
  delayUpgradeProgress: number = 0
  tileOrange: TileOrange

  enemyTarget: Enemy | null = null
  distanceToEnemyTarget: number = 0

  constructor(position: Position, tileOrange: TileOrange) {
    super(position)
    this.progressBar = this.#createTowerProgressBar()
    this.tileOrange = tileOrange
  }

  #createTowerProgressBar() {
    const position: Position = {
      x: this.position.x + Const.TOWER_OFFSET + 10,
      y: this.position.y + Const.TOWER_OFFSET + 20,
    }
    const size: Size = { w: 27, h: 7 }

    return new ProgressBar(position, size)
  }

  upgrade() {
    this.upgrading = true
    this.upgradeLevel++
  }

  get notUpgrading() {
    return !this.upgrading
  }

  get sellProfit() {
    // this method is overridden by child classes
    return 0
  }

  get isMaxUpgraded() {
    return this.upgradeLevel === Const.UPGRADE_MAX_LEVEL
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number): number {
    // To implement in child export classes
    return 0
  }

  get cost(): number {
    return this.getCostWhenUpgradeLevelIs(this.upgradeLevel)
  }

  get nextLevelUpgradeCost() {
    if (this.isMaxUpgraded) {
      return this.getCostWhenUpgradeLevelIs(Const.UPGRADE_MAX_LEVEL - 1)
    }
    return this.getCostWhenUpgradeLevelIs(this.upgradeLevel + 1)
  }

  isDistanceIntoInfluenceArea(minDistance: number): boolean | null {
    // to implement in child export classes
    return null
  }

  selectTarget(enemies: Enemy[]) {
    let minDistance = 99999
    let enemyTarget = null

    enemies.forEach((enemy) => {
      if (!enemy.isAbducted) {
        const distance = PositionUtils.distance(
          { x: this.position.x, y: this.position.y },
          {
            x: enemy.position.x,
            y: enemy.position.y,
          },
        )
        if (distance < minDistance) {
          minDistance = distance
          enemyTarget = enemy
        }
      }
    })

    if (this.isDistanceIntoInfluenceArea(minDistance)) {
      this.enemyTarget = enemyTarget
      this.distanceToEnemyTarget = minDistance
    } else {
      this.enemyTarget = null
      this.distanceToEnemyTarget = 0
    }
  }
  get upgradeIncrement() {
    return Tower.UPGRADE_INCREMENT / (this.upgradeLevel + 1)
  }

  #reInitUpgrading() {
    this.upgrading = false
    this.progressBar.reInitProgress()
  }

  update() {
    if (this.upgrading) {
      if (Tower.INSTANT_UPGRADING) {
        this.#reInitUpgrading()
      } else {
        if (!this.progressBar.isFullOfProgress()) {
          this.progressBar.increaseProgress(this.upgradeIncrement)
        } else {
          this.#reInitUpgrading()
        }
      }
    }
  }

  get type() {
    // this method is overridden by child classes
    return 0
  }

  _drawUpgradeBackground(color: RGBType, offset: number) {
    P5.p5.strokeWeight(1)
    P5.p5.stroke('black')
    P5.p5.fill(color)
    P5.p5.rect(
      this.position.x + offset,
      this.position.y + offset,
      Const.TILE_SIZE,
      Const.TILE_SIZE,
    )
  }
}
