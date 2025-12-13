import { Obj } from '../../Obj'
import { ParticleSystem } from '../ParticleSystem'
import { Position } from '../../types/position'

export class Explosion extends Obj {
  static MAX_EMIT_TIME = 5
  static EXPLOSION_OFFSET = 25

  #emissionTime: number = 0

  particleSystem: ParticleSystem | null
  constructor(position: Position) {
    super(position)
    this.particleSystem = null
  }

  update() {
    if (!this.particleSystem) {
      return
    }
    if (!this.particleSystem.hasAnyAliveParticles) {
      return
    }
    if (this.#emissionTime < Explosion.MAX_EMIT_TIME) {
      this.#emissionTime++
      this.particleSystem.addParticle()
    }
    this.particleSystem.run()
  }
}
