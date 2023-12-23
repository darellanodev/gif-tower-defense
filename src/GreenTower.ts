import { ConstType } from './types'
import { Distance } from './Distance'
import { Enemy } from './Enemy'
import { Image } from 'p5'
import { ProgressBar } from './ProgressBar'

export class GreenTower {
  images: Image[]
  x: number
  y: number
  Const: ConstType
  DistanceClass: typeof Distance
  ProgressBarClass: typeof ProgressBar

  upgradeLevel: number
  enemyTarget: Enemy
  distanceToEnemyTarget: number
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
    this.enemyTarget = null
    this.distanceToEnemyTarget = 0
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

  draw() {
    if (this.enemyTarget) {
      let r_dx = this.enemyTarget.getX() - this.x
      let r_dy = this.enemyTarget.getY() - this.y
      let angle = Math.atan2(r_dy, r_dx) + 1.55

      let cos_a = cos(angle)
      let sin_a = sin(angle)

      imageMode(CENTER)
      applyMatrix(cos_a, sin_a, -sin_a, cos_a, this.x + 30, this.y + 30)

      this._drawShotToEnemy()
      this.enemyTarget.addDamage(1)
      image(this.images[this.upgradeLevel], 0, 0)

      resetMatrix()
      imageMode(CORNER)
    } else {
      image(this.images[this.upgradeLevel], this.x, this.y)
    }

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

  selectTarget(enemies: any[]) {
    let minDistance = 99999
    let enemyTarget = null

    enemies.forEach((enemy) => {
      const distance = this.DistanceClass.twoPoints(
        this.x,
        this.y,
        enemy.getX(),
        enemy.getY(),
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
