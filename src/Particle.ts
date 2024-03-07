import { Vector } from 'p5'
import { RGBType } from './types'

export class Particle {
  position: Vector
  size: number
  color: RGBType

  velocity: Vector
  lifespan: number = 255

  constructor(position: Vector, size: number, color: RGBType) {
    this.position = position.copy()
    this.size = size
    this.color = color

    this.velocity = createVector(random(-3, 3), random(-3, 0))
  }

  run() {
    this.update()
    this.display()
  }

  update() {
    this.position.add(this.velocity)
    this.lifespan -= 2
  }

  display() {
    stroke(...this.color, this.lifespan)
    strokeWeight(2)
    fill(127, this.lifespan)
    ellipse(this.position.x, this.position.y, this.size, this.size)
  }

  isDead() {
    return this.lifespan < 0
  }
}
