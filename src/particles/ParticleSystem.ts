import { Particle } from './Particle'
import { Vector } from 'p5'
import { RGBType } from '../types/rgb'

export class ParticleSystem {
  #origin: Vector
  #particlesSize: number
  #particlesColor: RGBType
  hasAnyAliveParticles: boolean

  #particles: Particle[] = []

  constructor(origin: Vector, particlesSize: number, particlesColor: RGBType) {
    this.#origin = origin.copy()
    this.#particlesSize = particlesSize
    this.#particlesColor = particlesColor

    this.hasAnyAliveParticles = true
  }

  get particles() {
    return this.#particles
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
      if (p.dead) {
        this.#particles.splice(i, 1)
      }
    }

    if (this.#particles.length === 0) {
      this.hasAnyAliveParticles = false
    }
  }
}
