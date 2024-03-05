import { ConstType, Position } from './types'
import { Distance } from './Distance'
import { Enemy } from './Enemy'
import { Image } from 'p5'
import { ProgressBar } from './ProgressBar'

export class GreenTower {
  images: Image[]
  position: Position
  Const: ConstType
  DistanceClass: typeof Distance
  ProgressBarClass: typeof ProgressBar

  upgradeLevel: number
  enemyTarget: Enemy
  distanceToEnemyTarget: number
  upgrading: boolean
  progressBar: ProgressBar
  upgradeProgress: number
  delayUpgradeProgress: number

  constructor(
    images: Image[],
    position: Position,
    Const: ConstType,
    DistanceClass: typeof Distance,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.images = images
    this.position = { ...position }
    this.Const = Const
    this.DistanceClass = DistanceClass
    this.ProgressBarClass = ProgressBarClass

    this.upgradeLevel = 0
    this.enemyTarget = null
    this.distanceToEnemyTarget = 0
    this.upgrading = false
    this.progressBar = new this.ProgressBarClass(
      {
        x: this.position.x + this.Const.TOWER_OFFSET,
        y: this.position.y + this.Const.TOWER_OFFSET,
      },
      this.Const.PROGRESSBAR_WIDTH,
      this.Const.PROGRESSBAR_HEIGHT,
    )
    this.upgradeProgress = 0
  }

  upgrade() {
    if (!this.upgrading) {
      this.upgrading = true
      this.upgradeLevel++
      this.delayUpgradeProgress =
        this.Const.DELAY_UPGRADE_MULTIPLIER * this.upgradeLevel
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

  _drawShotToEnemy() {
    strokeWeight(3)
    stroke(this.Const.RED_COLOR)
    line(
      -1,
      -18,
      7 - this.distanceToEnemyTarget / 7,
      -this.distanceToEnemyTarget,
    )
  }

  _drawUpgradeBackground() {
    strokeWeight(1)
    stroke('black')
    fill(this.Const.GREEN_COLOR)
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
        if (this.delayUpgradeProgress == 0) {
          this.upgradeProgress++
          this.progressBar.setProgress(this.upgradeProgress)
          this.delayUpgradeProgress =
            this.Const.DELAY_UPGRADE_MULTIPLIER * this.upgradeLevel
        } else {
          this.delayUpgradeProgress--
        }
        this.progressBar.draw()
      } else {
        this.upgrading = false
        this.upgradeProgress = 0
        this.progressBar.setProgress(0)
      }
    } else {
      if (this.enemyTarget) {
        let r_dx = this.enemyTarget.getPosition().x - this.position.x
        let r_dy = this.enemyTarget.getPosition().y - this.position.y
        let angle = Math.atan2(r_dy, r_dx) + 1.55

        let cos_a = cos(angle)
        let sin_a = sin(angle)

        imageMode(CENTER)
        applyMatrix(
          cos_a,
          sin_a,
          -sin_a,
          cos_a,
          this.position.x + 30,
          this.position.y + 30,
        )

        this._drawShotToEnemy()
        this.enemyTarget.addDamage(
          this.Const.DAMAGE_UPGRADE_GREEN_TOWER[this.upgradeLevel],
        )
        image(this.images[this.upgradeLevel], 0, 0)

        resetMatrix()
        imageMode(CORNER)
      } else {
        image(this.images[this.upgradeLevel], this.position.x, this.position.y)
      }
    }
  }

  getInfluenceArea() {
    return this.Const.GREEN_TOWER_UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > this.Const.UPGRADE_MAX_LEVEL) {
      return this.Const.COST_UPGRADE_GREEN_TOWER[this.Const.UPGRADE_MAX_LEVEL]
    }
    return this.Const.COST_UPGRADE_GREEN_TOWER[selectedUpgradeLevel]
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
    return this.Const.PROFIT_SELL_UPGRADE_GREEN_TOWER[this.getUpgradeLevel()]
  }

  getType() {
    return this.Const.GREEN_TOWER
  }

  getColor() {
    return this.Const.GREEN_COLOR
  }

  _isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <=
      this.Const.GREEN_TOWER_UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65
    )
  }

  selectTarget(enemies: Enemy[]) {
    let minDistance = 99999
    let enemyTarget = null

    enemies.forEach((enemy) => {
      const distance = this.DistanceClass.twoPoints(
        { x: this.position.x, y: this.position.y },
        {
          x: enemy.getPosition().x,
          y: enemy.getPosition().y,
        },
      )
      if (distance < minDistance) {
        minDistance = distance
        enemyTarget = enemy
      }
    })

    if (this._isDistanceIntoInfluenceArea(minDistance)) {
      this.enemyTarget = enemyTarget
      this.distanceToEnemyTarget = minDistance
    } else {
      this.enemyTarget = null
      this.distanceToEnemyTarget = 0
    }
  }
}
