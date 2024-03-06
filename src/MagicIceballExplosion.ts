import { ParticleSystem } from './ParticleSystem'
import { ConstType, RGBType } from './types'

export class MagicIceballExplosion {
  static MAX_EMIT_TIME = 5
  static SIZE = 6
  static COLOR = [0, 65, 255] as RGBType

  x: number
  y: number
  Const: ConstType
  ParticleSystemClass: typeof ParticleSystem
  emisionTime: number
  finished: boolean

  particleSystem: ParticleSystem
  constructor(
    x: number,
    y: number,
    Const: ConstType,
    ParticleSystemClass: typeof ParticleSystem,
  ) {
    this.x = x
    this.y = y
    this.Const = Const
    this.particleSystem = new ParticleSystemClass(
      createVector(
        this.x + this.Const.EXPLOSION_OFFSET,
        this.y + this.Const.EXPLOSION_OFFSET,
      ),
      MagicIceballExplosion.SIZE,
      MagicIceballExplosion.COLOR,
    )
    this.emisionTime = 0
    this.finished = false
  }

  isActive() {
    return !this.finished
  }

  update() {
    if (this.emisionTime < MagicIceballExplosion.MAX_EMIT_TIME) {
      this.emisionTime++
      this.particleSystem.addParticle()
    }
    this.particleSystem.run()
  }
}
