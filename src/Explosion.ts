import { ParticleSystem } from './ParticleSystem'

export class Explosion {
  static MAX_EMIT_TIME = 5

  x: number
  y: number

  #emisionTime: number = 0
  #finished: boolean = false

  particleSystem: ParticleSystem
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
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
