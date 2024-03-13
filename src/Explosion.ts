import { ParticleSystem } from './ParticleSystem'
import { Position } from './types'

export class Explosion {
  static MAX_EMIT_TIME = 5

  position: Position

  #emisionTime: number = 0
  #finished: boolean = false

  particleSystem: ParticleSystem
  constructor(position: Position) {
    this.position = { ...position }
  }

  isActive() {
    return !this.#finished
  }

  update() {
    if (this.#emisionTime < Explosion.MAX_EMIT_TIME) {
      this.#emisionTime++
      this.particleSystem.addParticle()
    }
    this.particleSystem.run()
  }
}
