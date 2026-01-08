import { Position } from '../types/position'
import { Image } from 'p5'
import { COLOR } from '../constants/color'
import { TILE_SIZE } from '../constants/tile'
import { Tower } from './Tower'
import { ExplosionEnemy } from '../particles/explosions/ExplosionEnemy'
import { ProgressBar } from '../hud/progressbar/ProgressBar'
import { Player } from '../player/Player'
import { TileOrange } from '../levels/tiles/TileOrange'
import { P5 } from '../utils/P5'
import { FlyIndicator } from '../hud/FlyIndicator'
import { Images } from '../resources/Images'
import { Size } from '../types/size'
import { Particle } from '../particles/Particle'
import {
  TOWER_IMAGE_OFFSET,
  TOWER_UPGRADE,
  TOWER_YELLOW_UPGRADE,
} from '../constants/tower'

export class TowerYellow extends Tower {
  static ID = 3
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
    const size: Size = { w: TILE_SIZE - 13, h: TILE_SIZE - 10 }

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
    this._drawUpgradeBackground(COLOR.YELLOW, 5)
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
      this.position.x + TOWER_IMAGE_OFFSET.X,
      this.position.y + TOWER_IMAGE_OFFSET.Y,
    )
  }

  get influenceArea() {
    return TOWER_YELLOW_UPGRADE.INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > TOWER_UPGRADE.MAX_LEVEL) {
      return TOWER_YELLOW_UPGRADE.COST[TOWER_UPGRADE.MAX_LEVEL]
    }
    return TOWER_YELLOW_UPGRADE.COST[selectedUpgradeLevel]
  }

  get sellProfit() {
    return TOWER_YELLOW_UPGRADE.PROFIT_SELL[this.upgradeLevel]
  }

  get type() {
    return TowerYellow.ID
  }

  isDistanceIntoInfluenceArea(distance: number) {
    return (
      distance <=
      TOWER_YELLOW_UPGRADE.INFLUENCE_AREA[this.upgradeLevel] /
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
        x: this.position.x + TILE_SIZE / 2,
        y: this.position.y + TILE_SIZE / 2,
      },
      particle.position,
    )

    if (this.isDistanceIntoInfluenceArea(distance)) {
      particle.towerYellowTarget = this
    }
  }
}
