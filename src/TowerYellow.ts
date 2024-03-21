import { Position } from './types'
import { Image } from 'p5'
import { ConstColor } from './ConstColor'
import { Const } from './Const'
import { Tower } from './Tower'

export class TowerYellow extends Tower {
  static ID = 3
  static PROFIT_SELL_UPGRADE = [680, 2460, 7440, 21920, 66900, 199880]
  static COST_UPGRADE = [700, 2500, 7500, 22000, 67000, 200000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA = 290

  static images: Image[]

  static setImages(images: Image[]) {
    TowerYellow.images = images
  }

  static instantiate(position: Position) {
    return new TowerYellow({
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
    fill(ConstColor.YELLOW)
    rect(this.position.x, this.position.y, Const.TILE_SIZE, Const.TILE_SIZE)
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
      image(
        TowerYellow.images[this.upgradeLevel],
        this.position.x,
        this.position.y,
      )
    }
  }

  get influenceArea() {
    return TowerYellow.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
      return TowerYellow.COST_UPGRADE[Const.UPGRADE_MAX_LEVEL]
    }
    return TowerYellow.COST_UPGRADE[selectedUpgradeLevel]
  }

  get sellProfit() {
    return TowerYellow.PROFIT_SELL_UPGRADE[this.upgradeLevel]
  }

  get type() {
    return TowerYellow.ID
  }

  isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <= TowerYellow.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] / 1.65
    )
  }
}
