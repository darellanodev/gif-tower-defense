import { Position } from '../types/position'
import { Image } from 'p5'
import { ConstColor } from '../constants/ConstColor'
import { Const } from '../constants/Const'
import { Tower } from './Tower'
import { Missile } from './Missile'
import { P5 } from '../utils/P5'
import { TileOrange } from '../tiles/TileOrange'

export class TowerRed extends Tower {
  static ID = 2
  static PROFIT_SELL_UPGRADE = [80, 110, 190, 420, 1200, 2880]
  static DAMAGE_UPGRADE = [100, 140, 190, 250, 320, 450]
  static COST_UPGRADE = [100, 150, 250, 500, 1300, 3000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA_FACTOR = 1.65
  static MAXTIME_TO_RECHARGE = 50
  #images: Image[]

  #timeToRecharge = 0

  constructor(position: Position, tileOrange: TileOrange, images: Image[]) {
    super(position, tileOrange)
    this.#images = images
  }

  #drawUpgrading() {
    this._drawUpgradeBackground(ConstColor.RED, 4)
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

    if (this.#timeToRecharge < TowerRed.MAXTIME_TO_RECHARGE) {
      this.#timeToRecharge++
    } else {
      this.#timeToRecharge = 0
      Missile.instances.push(
        new Missile(
          {
            x: this.position.x + Const.TILE_SIZE / 2,
            y: this.position.y + Const.TILE_SIZE / 2,
          },
          this.enemyTarget,
          TowerRed.DAMAGE_UPGRADE[this.upgradeLevel],
        ),
      )
    }

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
    } else {
      if (this.enemyTarget) {
        this.#drawWhenEnemyTarget()
      } else {
        this.#drawWhenNoEnemyTarget()
      }
    }
  }

  get influenceArea() {
    return TowerRed.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
      return TowerRed.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL]
    }
    return TowerRed.COST_UPGRADE[selectedUpgradeLevel]
  }

  get sellProfit() {
    return TowerRed.PROFIT_SELL_UPGRADE[this.upgradeLevel]
  }

  get type() {
    return TowerRed.ID
  }

  isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <=
      TowerRed.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] /
        TowerRed.INFLUENCE_AREA_FACTOR
    )
  }
}
