import { Particle } from './Particle'
import { Vector } from 'p5'
import { RGBType } from './types'

export class ParticleSystem {
  #origin: Vector
  #particlesSize: number
  #particlesColor: RGBType

  #particles: Particle[] = []

  constructor(origin: Vector, particlesSize: number, particlesColor: RGBType) {
    this.#origin = origin.copy()
    this.#particlesSize = particlesSize
    this.#particlesColor = particlesColor
  }

  addParticle() {
    this.#particles.push(
      new Particle(this.#origin, this.#particlesSize, this.#particlesColor),
    )
  }

  run() {
    for (let i = this.#particles.length - 1; i >= 0; i--) {
      let p = this.#particles[i]
      p.run()
      if (p.isDead()) {
        this.#particles.splice(i, 1)
      }
    }
  }
}
