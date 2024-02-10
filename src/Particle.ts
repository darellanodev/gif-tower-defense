import { Vector } from 'p5'

export class Particle {
  velocity: Vector
  position: Vector
  lifespan: number
  size: number

  constructor(position: Vector, size: number) {
    this.position = position.copy()
    this.size = size
    this.velocity = createVector(random(-3, 3), random(-3, 0))
    this.lifespan = 255
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
    stroke(255, 165, 0, this.lifespan)
    strokeWeight(2)
    fill(127, this.lifespan)
    ellipse(this.position.x, this.position.y, this.size, this.size)
  }

  isDead() {
    return this.lifespan < 0
  }
}
