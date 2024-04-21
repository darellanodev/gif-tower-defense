import { Position } from '../utils/types'
import { Image } from 'p5'
import { ConstColor } from '../constants/ConstColor'
import { Const } from '../constants/Const'
import { Tower } from './Tower'
import { ExplosionEnemy } from '../explosions/ExplosionEnemy'
import { MathUtils } from '../utils/MathUtils'
import { ProgressBar } from '../hud/ProgressBar'
import { Player } from '../Player'
import { TileOrange } from '../tiles/TileOrange'
import { P5 } from '../utils/P5'

export class TowerYellow extends Tower {
  static ID = 3
  static PROFIT_SELL_UPGRADE = [680, 2460, 7440, 21920, 66900, 199880]
  static COST_UPGRADE = [700, 2500, 7500, 22000, 67000, 200000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA_FACTOR = 2

  static images: Image[]

  #progressCoreBar: ProgressBar
  tileOrange: TileOrange

  static setImages(images: Image[]) {
    TowerYellow.images = images
  }

  static instantiate(position: Position, tileOrange: TileOrange) {
    return new TowerYellow(
      {
        x: position.x - Const.TOWER_OFFSET,
        y: position.y - Const.TOWER_OFFSET,
      },
      tileOrange,
    )
  }

  constructor(position: Position, tileOrange: TileOrange) {
    super(position)
    this.#progressCoreBar = new ProgressBar(
      {
        x: this.position.x,
        y: this.position.y - 11,
      },
      { w: Const.TILE_SIZE - 13, h: Const.TILE_SIZE - 10 },
    )
    this.tileOrange = tileOrange
  }

  upgrade() {
    if (!this.upgrading) {
      this.upgrading = true
      this.upgradeLevel++
      this.#progressCoreBar.reinitProgress()
    }
  }

  increaseCoreProgress(increment: number) {
    if (!this.#progressCoreBar.isFullOfProgress()) {
      this.#progressCoreBar.increaseProgress(increment)
    } else {
      Player.increaseLives(this.upgradeLevel + 1)
      this.#progressCoreBar.reinitProgress()
    }
  }

  #drawUpgrading() {
    this._drawUpgradeBackground(ConstColor.YELLOW, 5)
    if (!this.progressBar.isFullOfProgress()) {
      this.progressBar.draw()
    }
  }

  get coreProgressBarValue(): number {
    return this.#progressCoreBar.progress
  }

  draw() {
    if (this.upgrading) {
      this.#drawUpgrading()
    } else {
      this.#progressCoreBar.draw()

      P5.p5.image(
        TowerYellow.images[this.upgradeLevel],
        this.position.x + Tower.OFFSET_X,
        this.position.y + Tower.OFFSET_Y,
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
      distance <=
      TowerYellow.UPGRADE_INFLUENCE_AREA[this.upgradeLevel] /
        TowerYellow.INFLUENCE_AREA_FACTOR
    )
  }

  selectAllExplosionsTargets() {
    if (this.upgrading) {
      return
    }
    ExplosionEnemy.instances.forEach((xp) => {
      if (xp.particleSystem) {
        const particles = xp.particleSystem.particles

        particles.forEach((p) => {
          if (!p.towerYellowTarget) {
            const distance = MathUtils.distance(
              {
                x: this.position.x + Const.TILE_SIZE / 2,
                y: this.position.y + Const.TILE_SIZE / 2,
              },
              p.position,
            )

            if (this.isDistanceIntoInfluenceArea(distance)) {
              p.towerYellowTarget = this
            }
          }
        })
      }
    })
  }
}
