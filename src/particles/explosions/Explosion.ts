import { Obj } from '../../Obj'
import { ParticleSystem } from '../ParticleSystem'
import { Position } from '../../types/position'

export class Explosion extends Obj {
  static MAX_EMIT_TIME = 5

  #emissionTime: number = 0

  particleSystem: ParticleSystem | null
  constructor(position: Position) {
    super(position)
    this.particleSystem = null
  }

  alive() {
    return this.particleSystem?.anyAlive
  }

  update() {
    if (!this.particleSystem) {
      return
    }
    if (!this.alive) {
      return
    }
    if (this.#emissionTime < Explosion.MAX_EMIT_TIME) {
      this.#emissionTime++
      this.particleSystem.addParticle()
    }
    this.particleSystem.run()
  }
}
