import { Position } from '../utils/types'
import { Image } from 'p5'
import { ConstColor } from '../constants/ConstColor'
import { Const } from '../constants/Const'
import { Tower } from './Tower'
import { P5 } from '../utils/P5'

export class TowerGreen extends Tower {
  static ID = 1
  static PROFIT_SELL_UPGRADE = [30, 35, 65, 220, 900, 1880]
  static DAMAGE_UPGRADE = [1, 2, 4, 6, 12, 24]
  static COST_UPGRADE = [50, 75, 125, 300, 1000, 2000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]

  static images: Image[]

  static setImages(images: Image[]) {
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
    }
  }

  #drawShotToEnemy() {
    P5.p5.strokeWeight(3)
    P5.p5.stroke(ConstColor.RED)
    P5.p5.line(
      -1,
      -18,
      7 - this.distanceToEnemyTarget / 7,
      -this.distanceToEnemyTarget,
    )
  }

  #drawUpgrading() {
    this._drawUpgradeBackground(ConstColor.GREEN, 4)
    if (!this.progressBar.isFullOfProgress()) {
      this.progressBar.draw()
    }
  }

  #drawWhenEnemyTarget() {
    if (!this.enemyTarget) {
      return
    }

    let r_dx = this.enemyTarget.position.x - this.position.x
    let r_dy = this.enemyTarget.position.y - this.position.y
    let angle = Math.atan2(r_dy, r_dx) + 1.55

    let cos_a = P5.p5.cos(angle)
    let sin_a = P5.p5.sin(angle)

    P5.p5.imageMode(P5.p5.CENTER)
    P5.p5.applyMatrix(
      cos_a,
      sin_a,
      -sin_a,
      cos_a,
      this.position.x + 30,
      this.position.y + 30,
    )

    this.#drawShotToEnemy()
    this.enemyTarget.addDamage(TowerGreen.DAMAGE_UPGRADE[this.upgradeLevel])
    P5.p5.image(TowerGreen.images[this.upgradeLevel], 0, 0)

    P5.p5.resetMatrix()
    P5.p5.imageMode(P5.p5.CORNER)
  }

  #drawWhenNoEnemyTarget() {
    P5.p5.image(
      TowerGreen.images[this.upgradeLevel],
      this.position.x + Tower.OFFSET_X,
      this.position.y + Tower.OFFSET_Y,
    )
  }

  draw() {
    if (this.upgrading) {
      this.#drawUpgrading()
    } else {
      if (this.enemyTarget) {
        this.#drawWhenEnemyTarget()
      } else {
        this.#drawWhenNoEnemyTarget()
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

  isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <= TowerGreen.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65
    )
  }
}
