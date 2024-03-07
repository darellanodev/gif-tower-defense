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

  emisionTime: number = 0
  finished: boolean = false

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
