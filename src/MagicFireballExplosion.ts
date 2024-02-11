import { ParticleSystem } from './ParticleSystem'
import { ConstType } from './types'

export class MagicFireBallExplosion {
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
      this.Const.PARTICLE_EXPLOSION_FIREBALL_SIZE,
      this.Const.PARTICLE_EXPLOSION_MAGIC_FIREBALL_COLOR,
    )
    this.emisionTime = 0
    this.finished = false
  }

  isActive() {
    return !this.finished
  }

  update() {
    if (this.emisionTime < this.Const.ENEMY_EXPLOSION_MAX_EMIT_TIME) {
      this.emisionTime++
      this.particleSystem.addParticle()
    }
    this.particleSystem.run()
  }
}
