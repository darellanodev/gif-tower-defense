import { ParticleSystem } from '../particles/ParticleSystem'
import { Position } from '../utils/types'

export class Explosion {
  static MAX_EMIT_TIME = 5

  position: Position

  #emisionTime: number = 0
  #finished: boolean = false

  particleSystem: ParticleSystem | null
  constructor(position: Position) {
    this.position = { ...position }
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