import { Position } from '../types/position'
import { Image } from 'p5'
import { ConstColor } from '../constants/ConstColor'
import { Const } from '../constants/Const'
import { Tower } from './Tower'
import { ExplosionEnemy } from '../particles/explosions/ExplosionEnemy'
import { ProgressBar } from '../hud/progressbar/ProgressBar'
import { Player } from '../player/Player'
import { TileOrange } from '../levels/tiles/TileOrange'
import { P5 } from '../utils/P5'
import { FlyIndicator } from '../hud/FlyIndicator'
import { Images } from '../resources/Images'
import { PositionUtils } from '../utils/PositionUtils'
import { Size } from '../types/size'
import { Particle } from '../particles/Particle'

export class TowerYellow extends Tower {
  static ID = 3
  static PROFIT_SELL_UPGRADE = [680, 2460, 7440, 21920, 66900, 199880]
  static COST_UPGRADE = [700, 2500, 7500, 22000, 67000, 200000]
  static UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]
  static INFLUENCE_AREA_FACTOR = 2

  #images: Image[]

  #coreProgressBar: ProgressBar
  #player: Player

  constructor(
    position: Position,
    tileOrange: TileOrange,
    player: Player,
    images: Image[],
  ) {
    super(position, tileOrange)
    this.#coreProgressBar = this.#createTowerProgressBar()
    this.#player = player
    this.#images = images
  }
  #createTowerProgressBar() {
    const position: Position = {
      x: this.position.x + 10,
      y: this.position.y + 13,
    }
    const size: Size = { w: Const.TILE_SIZE - 13, h: Const.TILE_SIZE - 10 }

    return new ProgressBar(position, size)
  }
  upgrade() {
    if (!this.upgrading) {
      this.upgrading = true
      this.upgradeLevel++
      this.#coreProgressBar.reInitProgress()
    }
  }

  increaseCoreProgress(increment: number) {
    if (!this.#coreProgressBar.isFullOfProgress()) {
      this.#coreProgressBar.increaseProgress(increment)
      return
    }

    this.#incrementLive()
  }

  #incrementLive() {
    const lives = this.upgradeLevel + 1
    this.#player.increaseLives(lives)
    this.#coreProgressBar.reInitProgress()

    this.#showFlyIndicator(lives)
  }

  #showFlyIndicator(lives: number) {
    FlyIndicator.instantiateFlyIndicator(
      this.position,
      this.#getIncrementLivesText(lives),
      Images.coreImage,
    )
  }

  #getIncrementLivesText(lives: number) {
    return `+ ${lives}`
  }

  #drawUpgrading() {
    this._drawUpgradeBackground(ConstColor.YELLOW, 5)
    this.#drawProgressIfNotFull()
  }

  #drawProgressIfNotFull() {
    if (!this.progressBar.isFullOfProgress()) {
      this.progressBar.draw()
    }
  }

  get coreProgressBarValue(): number {
    return this.#coreProgressBar.progress
  }

  draw() {
    if (this.upgrading) {
      this.#drawUpgrading()
      return
    }
    this.#coreProgressBar.draw()

    P5.p5.image(
      this.#images[this.upgradeLevel],
      this.position.x + Tower.OFFSET_X,
      this.position.y + Tower.OFFSET_Y,
    )
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
    for (const explosionEnemy of ExplosionEnemy.instances) {
      this.#handleExplosionEnemy(explosionEnemy)
    }
  }

  #handleExplosionEnemy(explosionEnemy: ExplosionEnemy) {
    if (!explosionEnemy.particleSystem) {
      return
    }
    const particles = explosionEnemy.particleSystem.particles

    for (const particle of particles) {
      this.#handleParticleTarget(particle)
    }
  }

  #handleParticleTarget(particle: Particle) {
    if (particle.towerYellowTarget) {
      return
    }

    const distance = this._distance.calculate(
      {
        x: this.position.x + Const.TILE_SIZE / 2,
        y: this.position.y + Const.TILE_SIZE / 2,
      },
      particle.position,
    )

    if (this.isDistanceIntoInfluenceArea(distance)) {
      particle.towerYellowTarget = this
    }
  }
}
