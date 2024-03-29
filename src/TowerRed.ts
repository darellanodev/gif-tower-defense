import { Position } from './types'
import { Image } from 'p5'
import { ConstColor } from './ConstColor'
import { Const } from './Const'
import { Tower } from './Tower'
import { Missile } from './Missile'

export class TowerRed extends Tower {
  static ID = 2
  static PROFIT_SELL_UPGRADE = [80, 110, 190, 420, 1200, 2880]
  static DAMAGE_UPGRADE = [100, 140, 190, 250, 320, 450]
  static COST_UPGRADE = [100, 150, 250, 500, 1300, 3000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA = 240
  static MAXTIME_TO_RECHARGE = 50
  static images: Image[]

  #timeToRecharge = 0
  static setImages(images: Image[]) {
    TowerRed.images = images
  }

  static instantiate(position: Position) {
    return new TowerRed({
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

  _drawUpgradeBackground() {
    strokeWeight(1)
    stroke('black')
    fill(ConstColor.RED)
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
        this.upgradeProgress++
        this.progressBar.setProgress(this.upgradeProgress)
        this.progressBar.draw()
      } else {
        this.upgrading = false
        this.upgradeProgress = 0
        this.progressBar.setProgress(0)
      }
    } else {
      if (this.enemyTarget) {
        let r_dx = this.enemyTarget.position.x - this.position.x
        let r_dy = this.enemyTarget.position.y - this.position.y
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

        image(TowerRed.images[this.upgradeLevel], 0, 0)

        resetMatrix()
        imageMode(CORNER)
      } else {
        image(
          TowerRed.images[this.upgradeLevel],
          this.position.x + Tower.OFFSET_X,
          this.position.y + Tower.OFFSET_Y,
        )
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
    return distance <= TowerRed.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65
  }
}
