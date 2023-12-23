export class Particle {
  acceleration: any
  velocity: any
  position: any
  lifespan: any

  constructor(position: any) {
    this.acceleration = createVector(0, 0.05)
    this.velocity = createVector(random(-1, 1), random(-1, 0))
    this.position = position.copy()
    this.lifespan = 255
  }

  run() {
    this.update()
    this.display()
  }

  update() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.lifespan -= 2
  }

  display() {
    stroke(200, this.lifespan)
    strokeWeight(2)
    fill(127, this.lifespan)
    ellipse(this.position.x, this.position.y, 12, 12)
  }

  isDead() {
    return this.lifespan < 0
  }
}
