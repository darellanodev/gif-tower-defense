import { Obj } from '../Obj'
import { ParticleSystem } from '../particles/ParticleSystem'
import { Position } from '../types/position'

export class Explosion extends Obj {
  static MAX_EMIT_TIME = 5

  #emisionTime: number = 0
  #finished: boolean = false

  particleSystem: ParticleSystem | null
  constructor(position: Position) {
    super(position)
    this.particleSystem = null
  }

  isActive() {
    return !this.#finished
  }

  update() {
    if (!this.particleSystem) {
      return
    }
    if (this.#emisionTime < Explosion.MAX_EMIT_TIME) {
      this.#emisionTime++
      this.particleSystem.addParticle()
    }
    this.particleSystem.run()
  }
}
