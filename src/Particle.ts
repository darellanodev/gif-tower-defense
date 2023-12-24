export class Particle {
  velocity: any
  position: any
  lifespan: any

  constructor(position: any) {
    this.velocity = createVector(random(-3, 3), random(-3, 0))
    this.position = position.copy()
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
    ellipse(this.position.x, this.position.y, 12, 12)
  }

  isDead() {
    return this.lifespan < 0
  }
}
