import { Position } from './types'
import { MathUtils } from './MathUtils'
import { Enemy } from './Enemy'
import { Image } from 'p5'
import { ConstColor } from './ConstColor'
import { Const } from './Const'
import { Tower } from './Tower'

export class TowerGreen extends Tower {
  static ID = 1
  static PROFIT_SELL_UPGRADE = [30, 35, 65, 220, 900, 1880]
  static DAMAGE_UPGRADE = [1, 2, 4, 6, 12, 24]
  static COST_UPGRADE = [50, 75, 125, 300, 1000, 2000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA = 150

  static images: Image[]
  #enemyTarget: Enemy = null
  #distanceToEnemyTarget: number = 0

  static initialize(images: Image[]) {
    TowerGreen.images = images
  }

  static instantiate(position: Position) {
    return new TowerGreen({
      x: position.x - Const.TOWER_OFFSET,
      y: position.y - Const.TOWER_OFFSET,
    })
  }

  upgrade() {
    if (!this.upgrading) {
      this.upgrading = true
      this.upgradeLevel++
      this.delayUpgradeProgress =
        Const.DELAY_UPGRADE_MULTIPLIER * this.upgradeLevel
    }
  }

  #drawShotToEnemy() {
    strokeWeight(3)
    stroke(ConstColor.RED)
    line(
      -1,
      -18,
      7 - this.#distanceToEnemyTarget / 7,
      -this.#distanceToEnemyTarget,
    )
  }

  #drawUpgradeBackground() {
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
      this.#drawUpgradeBackground()
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
      if (this.#enemyTarget) {
        let r_dx = this.#enemyTarget.position.x - this.position.x
        let r_dy = this.#enemyTarget.position.y - this.position.y
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

        this.#drawShotToEnemy()
        this.#enemyTarget.addDamage(
          TowerGreen.DAMAGE_UPGRADE[this.upgradeLevel],
        )
        image(TowerGreen.images[this.upgradeLevel], 0, 0)

        resetMatrix()
        imageMode(CORNER)
      } else {
        image(
          TowerGreen.images[this.upgradeLevel],
          this.position.x,
          this.position.y,
        )
      }
    }
  }

  get influenceArea() {
    return TowerGreen.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
      return TowerGreen.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL]
    }
    return TowerGreen.COST_UPGRADE[selectedUpgradeLevel]
  }

  get sellProfit() {
    return TowerGreen.PROFIT_SELL_UPGRADE[this.upgradeLevel]
  }

  get type() {
    return TowerGreen.ID
  }

  _isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <= TowerGreen.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65
    )
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

    if (this._isDistanceIntoInfluenceArea(minDistance)) {
      this.#enemyTarget = enemyTarget
      this.#distanceToEnemyTarget = minDistance
    } else {
      this.#enemyTarget = null
      this.#distanceToEnemyTarget = 0
    }
  }
}
