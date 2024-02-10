import { Particle } from './Particle'
import { Vector } from 'p5'

export class ParticleSystem {
  origin: Vector
  particles: Particle[]
  particlesSize: number

  constructor(position: Vector, particlesSize: number) {
    this.origin = position.copy()
    this.particles = []
    this.particlesSize = particlesSize
  }

  addParticle() {
    this.particles.push(new Particle(this.origin, this.particlesSize))
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i]
      p.run()
      if (p.isDead()) {
        this.particles.splice(i, 1)
      }
    }
  }
}
