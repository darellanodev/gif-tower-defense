import { ParticleSystem } from './ParticleSystem'
import { ConstType, RGBType } from './types'

export class EnemyExplosion {
  static MAX_EMIT_TIME = 5
  static SIZE = 12
  static COLOR = [255, 165, 0] as RGBType

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
      EnemyExplosion.SIZE,
      EnemyExplosion.COLOR,
    )
    this.emisionTime = 0
    this.finished = false
  }

  isActive() {
    return !this.finished
  }

  update() {
    if (this.emisionTime < EnemyExplosion.MAX_EMIT_TIME) {
      this.emisionTime++
      this.particleSystem.addParticle()
    }
    this.particleSystem.run()
  }
}
