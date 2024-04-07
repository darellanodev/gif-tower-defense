import { Position } from '../utils/types'
import { Const } from '../constants/Const'
import { ProgressBar } from '../hud/ProgressBar'
import { Enemy } from '../enemies/Enemy'
import { MathUtils } from '../utils/MathUtils'

export class Tower {
  static OFFSET_X: number = 3
  static OFFSET_Y: number = 4

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

  get maxUpgraded() {
    return this.upgradeLevel === Const.UPGRADE_MAX_LEVEL - 1
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number): number | null {
    // To implement in child export classes
    return null
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
}
