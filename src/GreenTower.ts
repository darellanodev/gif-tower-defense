import { Const } from '../src/Const'
import { Distance } from '../src/Distance'

export class GreenTower {
  UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]

  images: any[]
  x: number
  y: number
  upgradeLevel: number
  enemyTarget: any
  distanceToEnemyTarget: number

  constructor(images: any[], x: number, y: number) {
    this.images = images
    this.x = x
    this.y = y
    this.upgradeLevel = 0
    this.enemyTarget = null
    this.distanceToEnemyTarget = 0
  }

  upgrade() {
    this.upgradeLevel++
  }

  getUpgradeLevel() {
    return this.upgradeLevel
  }

  _drawShotToEnemy() {
    strokeWeight(3)
    stroke(Const.RED_COLOR)
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
  }

  getInfluenceArea() {
    return this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
      return Const.COST_UPGRADE_GREEN_TOWER[Const.UPGRADE_MAX_LEVEL]
    }
    return Const.COST_UPGRADE_GREEN_TOWER[selectedUpgradeLevel]
  }

  getCost() {
    return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel())
  }

  getType() {
    return Const.GREEN_TOWER
  }

  getColor() {
    return Const.GREEN_COLOR
  }

  _isDistanceIntoInfluenceArea(distance: number) {
    return distance <= this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65
  }

  selectTarget(enemies: any[]) {
    let minDistance = 99999
    let enemyTarget = null

    enemies.forEach((enemy) => {
      const distance = Distance.twoPoints(
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
