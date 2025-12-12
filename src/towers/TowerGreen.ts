import { Position } from '../types/position'
import { Image } from 'p5'
import { ConstColor } from '../constants/ConstColor'
import { Const } from '../constants/Const'
import { Tower } from './Tower'
import { P5 } from '../utils/P5'
import { TileOrange } from '../levels/tiles/TileOrange'
import { Enemy } from '../enemies/Enemy'

export class TowerGreen extends Tower {
  static ID = 1
  static PROFIT_SELL_UPGRADE = [30, 35, 65, 220, 900, 1880]
  static DAMAGE_UPGRADE = [1, 2, 4, 6, 12, 24]
  static COST_UPGRADE = [50, 75, 125, 300, 1000, 2000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA_FACTOR = 1.65

  #images: Image[]

  constructor(position: Position, tileOrange: TileOrange, images: Image[]) {
    super(position, tileOrange)
    this.#images = images
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
    this.enemyTarget.addDamage(TowerGreen.DAMAGE_UPGRADE[this.upgradeLevel])
    P5.p5.image(this.#images[this.upgradeLevel], 0, 0)

    P5.p5.resetMatrix()
    P5.p5.imageMode(P5.p5.CORNER)
  }

  #drawWhenNoEnemyTarget() {
    P5.p5.image(
      this.#images[this.upgradeLevel],
      this.position.x + Tower.OFFSET_X,
      this.position.y + Tower.OFFSET_Y,
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
    return TowerGreen.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Tower.UPGRADE_MAX_LEVEL) {
      return TowerGreen.COST_UPGRADE[Tower.UPGRADE_MAX_LEVEL]
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
      distance <=
      TowerGreen.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] /
        TowerGreen.INFLUENCE_AREA_FACTOR
    )
  }
}
