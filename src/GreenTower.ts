import { Position } from './types'
import { MathUtils } from './MathUtils'
import { Enemy } from './Enemy'
import { Image } from 'p5'
import { ProgressBar } from './ProgressBar'
import { ConstColor } from './ConstColor'
import { Const } from './Const'

export class GreenTower {
  static ID = 1
  static PROFIT_SELL_UPGRADE = [30, 35, 65, 220, 900, 1880]
  static DAMAGE_UPGRADE = [1, 2, 4, 6, 12, 24]
  static COST_UPGRADE = [50, 75, 125, 300, 1000, 2000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA = 150

  images: Image[]
  position: Position
  MathUtilsClass: typeof MathUtils
  ProgressBarClass: typeof ProgressBar

  upgradeLevel: number = 0
  enemyTarget: Enemy = null
  distanceToEnemyTarget: number = 0
  upgrading: boolean = false
  progressBar: ProgressBar
  upgradeProgress: number = 0
  delayUpgradeProgress: number

  constructor(
    images: Image[],
    position: Position,
    MathUtilsClass: typeof MathUtils,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.images = images
    this.position = { ...position }
    this.MathUtilsClass = MathUtilsClass
    this.ProgressBarClass = ProgressBarClass

    this.progressBar = new this.ProgressBarClass(
      {
        x: this.position.x + Const.TOWER_OFFSET,
        y: this.position.y + Const.TOWER_OFFSET,
      },
      ProgressBar.WIDTH,
      ProgressBar.HEIGHT,
    )
  }

  upgrade() {
    if (!this.upgrading) {
      this.upgrading = true
      this.upgradeLevel++
      this.delayUpgradeProgress =
        Const.DELAY_UPGRADE_MULTIPLIER * this.upgradeLevel
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
    return this.upgradeLevel === Const.UPGRADE_MAX_LEVEL - 1
  }

  _drawShotToEnemy() {
    strokeWeight(3)
    stroke(ConstColor.RED)
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
    fill(ConstColor.GREEN)
    rect(
      this.position.x + 4,
      this.position.y + 4,
      Const.TILE_SIZE,
      Const.TILE_SIZE,
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
            Const.DELAY_UPGRADE_MULTIPLIER * this.upgradeLevel
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
        this.enemyTarget.addDamage(GreenTower.DAMAGE_UPGRADE[this.upgradeLevel])
        image(this.images[this.upgradeLevel], 0, 0)

        resetMatrix()
        imageMode(CORNER)
      } else {
        image(this.images[this.upgradeLevel], this.position.x, this.position.y)
      }
    }
  }

  getInfluenceArea() {
    return GreenTower.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
      return GreenTower.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL]
    }
    return GreenTower.COST_UPGRADE[selectedUpgradeLevel]
  }

  getCost() {
    return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel())
  }

  getNextLevelUpgradeCost() {
    if (this.isMaxUpgraded()) {
      return this.getCostWhenUpgradeLevelIs(Const.UPGRADE_MAX_LEVEL - 1)
    } else {
      return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel() + 1)
    }
  }

  getSellProfit() {
    return GreenTower.PROFIT_SELL_UPGRADE[this.getUpgradeLevel()]
  }

  getType() {
    return GreenTower.ID
  }

  getColor() {
    return ConstColor.GREEN
  }

  _isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <= GreenTower.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65
    )
  }

  selectTarget(enemies: Enemy[]) {
    let minDistance = 99999
    let enemyTarget = null

    enemies.forEach((enemy) => {
      const distance = this.MathUtilsClass.distance(
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
