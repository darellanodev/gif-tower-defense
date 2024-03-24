import { Vector } from 'p5'
import { Position, RGBType } from './types'
import { TowerYellow } from './TowerYellow'
import { Const } from './Const'

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
    } else {
      let aux_x: number
      let aux_y: number

      const towerYellowPosX =
        this.#towerYellowTarget.position.x + Const.TILE_SIZE / 2
      const towerYellowPosY =
        this.#towerYellowTarget.position.y + Const.TILE_SIZE / 2

      if (this.position.y <= towerYellowPosY)
        aux_y = (towerYellowPosY - this.position.y) / 300
      else aux_y = -(this.position.y - towerYellowPosY) / 300

      if (this.position.x <= towerYellowPosX + Const.TILE_SIZE / 2)
        aux_x = (towerYellowPosX - this.position.x) / 300
      else aux_x = -(this.position.x - towerYellowPosX) / 300

      const aux = createVector(aux_x, aux_y, 0)
      this.#vec.add(this.#velocity)
      this.#velocity.add(aux)

      const attract = createVector(-aux_x * 3, -aux_y * 3, 0)
      this.#vec.sub(attract)
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
