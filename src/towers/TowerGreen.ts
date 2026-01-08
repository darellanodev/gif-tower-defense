import { Position } from '../types/position'
import { Image } from 'p5'
import { COLOR } from '../constants/color'
import { Tower } from './Tower'
import { P5 } from '../utils/P5'
import { TileOrange } from '../levels/tiles/TileOrange'
import { Enemy } from '../enemies/Enemy'
import {
  TOWER_GREEN_UPGRADE,
  TOWER_IMAGE_OFFSET,
  TOWER_UPGRADE,
} from '../constants/tower'

export class TowerGreen extends Tower {
  static ID = 1
  static INFLUENCE_AREA_FACTOR = 1.65

  #images: Image[]

  constructor(position: Position, tileOrange: TileOrange, images: Image[]) {
    super(position, tileOrange)
    this.#images = images
  }

  #drawShotToEnemy() {
    P5.p5.strokeWeight(3)
    P5.p5.stroke(COLOR.RED)
    P5.p5.line(
      -1,
      -18,
      7 - this.distanceToEnemyTarget / 7,
      -this.distanceToEnemyTarget,
    )
  }

  #drawUpgrading() {
    this._drawUpgradeBackground(COLOR.GREEN, 4)
    if (!this.progressBar.isFullOfProgress()) {
      this.progressBar.draw()
    }
  }

  #getAngle(enemyTarget: Enemy) {
    const r_dx = enemyTarget.position.x - this.position.x
    const r_dy = enemyTarget.position.y - this.position.y
    return Math.atan2(r_dy, r_dx) + 1.55
  }

  #drawWhenEnemyTarget() {
    if (!this.enemyTarget) {
      return
    }

    const angle = this.#getAngle(this.enemyTarget)
    const cos_a = P5.p5.cos(angle)
    const sin_a = P5.p5.sin(angle)

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
    this.enemyTarget.addDamage(TOWER_GREEN_UPGRADE.DAMAGE[this.upgradeLevel])
    P5.p5.image(this.#images[this.upgradeLevel], 0, 0)

    P5.p5.resetMatrix()
    P5.p5.imageMode(P5.p5.CORNER)
  }

  #drawWhenNoEnemyTarget() {
    P5.p5.image(
      this.#images[this.upgradeLevel],
      this.position.x + TOWER_IMAGE_OFFSET.X,
      this.position.y + TOWER_IMAGE_OFFSET.Y,
    )
  }

  draw() {
    if (this.upgrading) {
      this.#drawUpgrading()
      return
    }
    if (this.enemyTarget) {
      this.#drawWhenEnemyTarget()
      return
    }
    this.#drawWhenNoEnemyTarget()
  }

  get influenceArea() {
    return TOWER_GREEN_UPGRADE.INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > TOWER_UPGRADE.MAX_LEVEL) {
      return TOWER_GREEN_UPGRADE.COST[TOWER_UPGRADE.MAX_LEVEL]
    }
    return TOWER_GREEN_UPGRADE.COST[selectedUpgradeLevel]
  }

  get sellProfit() {
    return TOWER_GREEN_UPGRADE.PROFIT_SELL[this.upgradeLevel]
  }

  get type() {
    return TowerGreen.ID
  }

  isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <=
      TOWER_GREEN_UPGRADE.INFLUENCE_AREA[this.upgradeLevel] /
        TowerGreen.INFLUENCE_AREA_FACTOR
    )
  }
}
