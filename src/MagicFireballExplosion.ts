import { ParticleSystem } from './ParticleSystem'
import { RGBType } from './types'
import { Const } from './Const'

export class MagicFireballExplosion {
  static MAX_EMIT_TIME = 5
  static SIZE = 6
  static COLOR = [202, 191, 24] as RGBType

  #x: number
  #y: number

  #emisionTime: number = 0
  #finished: boolean = false
  #particleSystem: ParticleSystem

  constructor(
    x: number,
    y: number,
    ParticleSystemClass: typeof ParticleSystem,
  ) {
    this.#x = x
    this.#y = y
    this.#particleSystem = new ParticleSystemClass(
      createVector(
        this.#x + Const.EXPLOSION_OFFSET,
        this.#y + Const.EXPLOSION_OFFSET,
      ),
      MagicFireballExplosion.SIZE,
      MagicFireballExplosion.COLOR,
    )
  }

  isActive() {
    return !this.#finished
  }

  update() {
    if (this.#emisionTime < MagicFireballExplosion.MAX_EMIT_TIME) {
      this.#emisionTime++
      this.#particleSystem.addParticle()
    }
    this.#particleSystem.run()
  }
}
