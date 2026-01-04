import { Obj } from '../../Obj'
import { ParticleSystem } from '../ParticleSystem'
import { Position } from '../../types/position'
import { EXPLOSION_MAX_EMIT_TIME } from '../../constants/explosion'

export class Explosion extends Obj {
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
    if (this.#emissionTime < EXPLOSION_MAX_EMIT_TIME) {
      this.#emissionTime++
      this.particleSystem.addParticle()
    }
    this.particleSystem.run()
  }
}
