import { Position } from '../types/position'
import { Image } from 'p5'
import { COLOR } from '../constants/color'
import { Tower } from './Tower'
import { P5 } from '../utils/P5'
import { TileOrange } from '../levels/tiles/TileOrange'
import { Enemy } from '../enemies/Enemy'
import { TileCrystal } from '../levels/tiles/TileCrystal'
import {
  TOWER_GREEN_UPGRADE,
  TOWER_ID,
  TOWER_IMAGE_OFFSET,
  TOWER_INFLUENCE_AREA_FACTOR,
  TOWER_UPGRADE,
} from '../constants/tower'

export class TowerGreen extends Tower {
  #images: Image[]
  // the crystals are only shot when there is no enemy in the influence area
  crystalTarget: TileCrystal | null = null

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

  get #target(): Enemy | TileCrystal | null {
    return this.enemyTarget ?? this.crystalTarget
  }

  #getAngle(target: Enemy | TileCrystal) {
    const r_dx = target.position.x - this.position.x
    const r_dy = target.position.y - this.position.y
    return Math.atan2(r_dy, r_dx) + 1.55
  }

  #drawWhenTarget() {
    const target = this.#target
    if (!target) {
      return
    }

    const angle = this.#getAngle(target)
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
    if (this.isUpgrading) {
      this.#drawUpgrading()
      return
    }
    if (this.#target) {
      this.#drawWhenTarget()
      return
    }
    this.#drawWhenNoEnemyTarget()
  }

  // the damage is applied on every update (not on every draw), so it follows the game speed
  update() {
    super.update()
    if (this.isUpgrading) {
      return
    }
    this.#target?.addDamage(TOWER_GREEN_UPGRADE.DAMAGE[this.upgradeLevel])
  }

  selectTarget(enemies: Enemy[], crystals: TileCrystal[] = []) {
    super.selectTarget(enemies)
    if (this.enemyTarget) {
      this.crystalTarget = null
      return
    }
    this.#selectCrystalTarget(crystals)
  }

  #selectCrystalTarget(crystals: TileCrystal[]) {
    let minDistance = 99999
    let crystalTarget: TileCrystal | null = null

    for (const crystal of crystals) {
      if (crystal.isDead) {
        continue
      }
      const distance = this._distance.calculate(this.position, crystal.position)
      if (distance < minDistance) {
        minDistance = distance
        crystalTarget = crystal
      }
    }

    if (crystalTarget && this.isDistanceIntoInfluenceArea(minDistance)) {
      this.crystalTarget = crystalTarget
      this.distanceToEnemyTarget = minDistance
      return
    }
    this.crystalTarget = null
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
    return TOWER_ID.GREEN
  }

  isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <=
      TOWER_GREEN_UPGRADE.INFLUENCE_AREA[this.upgradeLevel] /
        TOWER_INFLUENCE_AREA_FACTOR.GREEN
    )
  }
}
