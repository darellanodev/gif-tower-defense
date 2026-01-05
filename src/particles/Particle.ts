import { Vector } from 'p5'
import { RGBType } from '../types/rgb'
import { TowerYellow } from '../towers/TowerYellow'
import { TILE_SIZE } from '../constants/tile'
import { Random } from '../utils/Random'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'
import { TowerType } from '../types/towerType'
import {
  PARTICLE_CAPTURED,
  PARTICLE_INCREMENT_YELLOW_TOWER_PROGRESS,
} from '../constants/particle'

export class Particle extends Obj {
  #vec: Vector
  #size: number
  #color: RGBType
  #initialColor: RGBType

  #velocity: Vector
  #lifespan: number = 255
  #captured: boolean = false
  #towerYellowTarget: TowerYellow | null = null
  #capturedTime: number = 0

  constructor(vec: Vector, size: number, color: RGBType) {
    const vecCopy = vec.copy()
    super({ x: vecCopy.x, y: vecCopy.y })

    this.#vec = vecCopy
    this.#size = size
    this.#color = color
    this.#initialColor = color

    this.#velocity = new Vector(
      Random.integerBetween(-3, 3),
      Random.integerBetween(-3, 0),
    )
  }

  run() {
    this.update()
    this.display()
  }

  #free() {
    this.#captured = false
    this.#color = this.#initialColor
    this.#towerYellowTarget = null
  }

  #freeParticleWhenSellOrUpgradeTower(tower: TowerType | null) {
    if (!tower || tower.upgrading) {
      this.#free()
    }
  }

  update() {
    this.position = { x: this.#vec.x, y: this.#vec.y }
    if (!this.#captured) {
      this.#vec.add(this.#velocity)
      this.#lifespan -= 2
      return
    }
    this.#handleCapturedParticle()
  }

  #getTowerYellowTarget() {
    return this.#towerYellowTarget!.tileOrange.getTower()
  }

  #handleCapturedParticle() {
    if (!this.#towerYellowTarget) {
      return
    }

    this.#freeParticleWhenSellOrUpgradeTower(this.#getTowerYellowTarget())
    if (!this.#captured) {
      return
    }

    this.#handleCapturedParticleTime()
    this.#handleCapturedParticlePosition()
  }

  #handleCapturedParticleTime() {
    if (this.#capturedTime < PARTICLE_CAPTURED.MAX_TIME) {
      this.#capturedTime++
      return
    }
    this.#handleResizeParticle()
  }

  #handleResizeParticle() {
    if (this.#size > 0) {
      this.#size -= PARTICLE_CAPTURED.REDUCE_FACTOR
      return
    }
    this.#towerYellowTarget!.increaseCoreProgress(
      PARTICLE_INCREMENT_YELLOW_TOWER_PROGRESS,
    )
    this.#lifespan = 0
  }

  #handleCapturedParticlePosition() {
    const aux = new Vector(this.#getAuxX(), this.#getAuxY(), 0)
    this.#vec.add(this.#velocity)
    this.#velocity.add(aux)

    const attract = new Vector(-this.#getAuxX() * 3, -this.#getAuxY() * 3, 0)
    this.#vec.sub(attract)
  }

  #getAuxY() {
    if (this.position.y <= this.#getTowerYellowPosY()) {
      return (this.#getTowerYellowPosY() - this.position.y) / 300
    }
    return -(this.position.y - this.#getTowerYellowPosY()) / 300
  }

  #getAuxX() {
    if (this.position.x <= this.#getTowerYellowPosX() + TILE_SIZE / 2) {
      return (this.#getTowerYellowPosX() - this.position.x) / 300
    }
    return -(this.position.x - this.#getTowerYellowPosX()) / 300
  }

  #getTowerYellowPosX() {
    return this.#towerYellowTarget!.position.x + TILE_SIZE / 2
  }

  #getTowerYellowPosY() {
    return this.#towerYellowTarget!.position.y + TILE_SIZE / 2
  }

  display() {
    P5.p5.stroke(...this.#color, this.#lifespan)
    P5.p5.strokeWeight(2)
    P5.p5.fill(127, this.#lifespan)
    P5.p5.ellipse(this.#vec.x, this.#vec.y, this.#size, this.#size)
  }

  get dead() {
    return this.#lifespan <= 0
  }

  set towerYellowTarget(towerYellow: TowerYellow) {
    this.#towerYellowTarget = towerYellow
    this.#color = PARTICLE_CAPTURED.COLOR
    this.#captured = true
    this.#lifespan = 255
  }

  get towerYellowTarget(): TowerYellow | null {
    return this.#towerYellowTarget
  }
}
