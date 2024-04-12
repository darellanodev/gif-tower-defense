import { Position, RGBType } from '../utils/types'
import { Const } from '../constants/Const'
import { ProgressBar } from '../hud/ProgressBar'
import { Enemy } from '../enemies/Enemy'
import { MathUtils } from '../utils/MathUtils'
import { P5 } from '../utils/P5'

export class Tower {
  static OFFSET_X: number = 3
  static OFFSET_Y: number = 4
  static UPGRADE_INCREMENT: number = 1
  static INSTANT_UPGRADING: boolean = false // for testing purposes is set to true

  position: Position
  upgrading: boolean = false
  upgradeLevel: number = 0
  progressBar: ProgressBar
  upgradeProgress: number = 0
  delayUpgradeProgress: number = 0

  enemyTarget: Enemy | null = null
  distanceToEnemyTarget: number = 0

  constructor(position: Position) {
    this.position = { ...position }

    this.progressBar = new ProgressBar(
      {
        x: this.position.x + Const.TOWER_OFFSET,
        y: this.position.y + Const.TOWER_OFFSET,
      },
      { w: ProgressBar.WIDTH, h: ProgressBar.HEIGHT },
    )
  }

  get notUpgrading() {
    return !this.upgrading
  }

  get isMaxUpgraded() {
    return this.upgradeLevel === Const.UPGRADE_MAX_LEVEL
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number): number | null {
    // To implement in child export classes
    return null
  }

  get cost() {
    return this.getCostWhenUpgradeLevelIs(this.upgradeLevel)
  }

  get nextLevelUpgradeCost() {
    if (this.isMaxUpgraded) {
      return this.getCostWhenUpgradeLevelIs(Const.UPGRADE_MAX_LEVEL - 1)
    } else {
      return this.getCostWhenUpgradeLevelIs(this.upgradeLevel + 1)
    }
  }

  isDistanceIntoInfluenceArea(minDistance: number): boolean | null {
    // to implement in child export classes
    return null
  }

  selectTarget(enemies: Enemy[]) {
    let minDistance = 99999
    let enemyTarget = null

    enemies.forEach((enemy) => {
      const distance = MathUtils.distance(
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

  #reinitUpgrading() {
    this.upgrading = false
    this.progressBar.reinitProgress()
  }

  update() {
    if (this.upgrading) {
      if (Tower.INSTANT_UPGRADING) {
        this.#reinitUpgrading()
      } else {
        if (!this.progressBar.isFullOfProgress()) {
          this.progressBar.increaseProgress(this.upgradeIncrement)
        } else {
          this.#reinitUpgrading()
        }
      }
    }
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
