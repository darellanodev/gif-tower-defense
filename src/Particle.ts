import { Vector } from 'p5'
import { Position, RGBType } from './types'
import { TowerYellow } from './TowerYellow'

export class Particle {
  static COLOR_CAPTURED: RGBType = [12, 222, 42]

  #vec: Vector
  #size: number
  #color: RGBType

  #velocity: Vector
  #lifespan: number = 255
  #captured: boolean = false
  #towerYellowTarget: TowerYellow = null

  constructor(vec: Vector, size: number, color: RGBType) {
    this.#vec = vec.copy()
    this.#size = size
    this.#color = color

    this.#velocity = createVector(random(-3, 3), random(-3, 0))
  }

  run() {
    this.update()
    this.display()
  }

  update() {
    if (!this.#captured) {
      this.#vec.add(this.#velocity)
      this.#lifespan -= 2
    }
  }

  display() {
    stroke(...this.#color, this.#lifespan)
    strokeWeight(2)
    fill(127, this.#lifespan)
    ellipse(this.#vec.x, this.#vec.y, this.#size, this.#size)
  }

  isDead() {
    return this.#lifespan < 0
  }

  set towerYellowTarget(towerYellow: TowerYellow) {
    this.#towerYellowTarget = towerYellow
    this.#color = Particle.COLOR_CAPTURED
    this.#captured = true
    this.#lifespan = 255
  }

  get towerYellowTarget() {
    return this.#towerYellowTarget
  }

  get position(): Position {
    return { x: this.#vec.x, y: this.#vec.y }
  }
}
