import { Position } from '../types/position'
import { Image } from 'p5'
import { COLOR } from '../constants/color'
import { TILE_SIZE } from '../constants/tile'
import { Tower } from './Tower'
import { Missile } from './Missile'
import { P5 } from '../utils/P5'
import { TileOrange } from '../levels/tiles/TileOrange'
import { Enemy } from '../enemies/Enemy'
import {
  TOWER_ID,
  TOWER_IMAGE_OFFSET,
  TOWER_INFLUENCE_AREA_FACTOR,
  TOWER_RED_UPGRADE,
  TOWER_UPGRADE,
} from '../constants/tower'

export class TowerRed extends Tower {
  static MAXTIME_TO_RECHARGE = 50
  #images: Image[]

  #timeToRecharge = 0

  constructor(position: Position, tileOrange: TileOrange, images: Image[]) {
    super(position, tileOrange)
    this.#images = images
  }

  #drawUpgrading() {
    this._drawUpgradeBackground(COLOR.RED, 4)
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

    this.#createMissileWhenCharged(this.enemyTarget)

    P5.p5.image(this.#images[this.upgradeLevel], 0, 0)

    P5.p5.resetMatrix()
    P5.p5.imageMode(P5.p5.CORNER)
  }

  #createMissileWhenCharged(enemyTarget: Enemy) {
    if (this.#timeToRecharge < TowerRed.MAXTIME_TO_RECHARGE) {
      this.#timeToRecharge++
      return
    }
    this.#timeToRecharge = 0
    this.#instanceNewMissile(enemyTarget)
  }

  #instanceNewMissile(enemyTarget: Enemy) {
    Missile.instances.push(
      new Missile(
        {
          x: this.position.x + TILE_SIZE / 2,
          y: this.position.y + TILE_SIZE / 2,
        },
        enemyTarget,
        TOWER_RED_UPGRADE.DAMAGE[this.upgradeLevel],
      ),
    )
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
    return TOWER_RED_UPGRADE.INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > TOWER_UPGRADE.MAX_LEVEL) {
      return TOWER_RED_UPGRADE.COST[TOWER_UPGRADE.MAX_LEVEL]
    }
    return TOWER_RED_UPGRADE.COST[selectedUpgradeLevel]
  }

  get sellProfit() {
    return TOWER_RED_UPGRADE.PROFIT_SELL[this.upgradeLevel]
  }

  get type() {
    return TOWER_ID.RED
  }

  isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <=
      TOWER_RED_UPGRADE.INFLUENCE_AREA[this.upgradeLevel] /
        TOWER_INFLUENCE_AREA_FACTOR.RED
    )
  }
}
