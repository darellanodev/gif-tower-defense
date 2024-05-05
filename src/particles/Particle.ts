import { Vector } from 'p5'
import { RGBType } from '../utils/types'
import { TowerYellow } from '../towers/TowerYellow'
import { Const } from '../constants/Const'
import { Random } from '../utils/Random'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'

export class Particle extends Obj {
  static COLOR_CAPTURED: RGBType = [12, 222, 42]
  static CAPTURED_MAX_TIME: number = 300
  static CAPTURED_REDUCE_FACTOR: number = 0.25
  static INCREMENT_YELLOW_TOWER_PROGRESS = 10

  #vec: Vector
  #size: number
  #color: RGBType
  #initialColor: RGBType

  #velocity: Vector
  #lifespan: number = 255
  #captured: boolean = false
  #towerYellowTarget: TowerYellow | null = null
  #capturedTime: number = 0

  constructor(vec: Vector, size: number, color: RGBType) {
    const vecCopy = vec.copy()
    super({ x: vecCopy.x, y: vecCopy.y })

    this.#vec = vecCopy
    this.#size = size
    this.#color = color
    this.#initialColor = color

    this.#velocity = new Vector(
      Random.integerBetween(-3, 3),
      Random.integerBetween(-3, 0),
    )
  }

  run() {
    this.update()
    this.display()
  }

  #free() {
    this.#captured = false
    this.#color = this.#initialColor
    this.#towerYellowTarget = null
  }

  update() {
    this.position = { x: this.#vec.x, y: this.#vec.y }
    if (!this.#captured) {
      this.#vec.add(this.#velocity)
      this.#lifespan -= 2
    } else {
      if (!this.#towerYellowTarget) {
        return
      }
      const tower = this.#towerYellowTarget.tileOrange.getTower()
      // free the particle when the player sells or upgrades the yellow tower
      if (!tower || tower.upgrading) {
        this.#free()
        return
      }

      if (this.#capturedTime < Particle.CAPTURED_MAX_TIME) {
        this.#capturedTime++
      } else {
        if (this.#size > 0) {
          this.#size -= Particle.CAPTURED_REDUCE_FACTOR
        } else {
          this.#towerYellowTarget.increaseCoreProgress(
            Particle.INCREMENT_YELLOW_TOWER_PROGRESS,
          )
          this.#lifespan = 0
        }
      }

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

      const aux = new Vector(aux_x, aux_y, 0)
      this.#vec.add(this.#velocity)
      this.#velocity.add(aux)

      const attract = new Vector(-aux_x * 3, -aux_y * 3, 0)
      this.#vec.sub(attract)
    }
  }

  display() {
    P5.p5.stroke(...this.#color, this.#lifespan)
    P5.p5.strokeWeight(2)
    P5.p5.fill(127, this.#lifespan)
    P5.p5.ellipse(this.#vec.x, this.#vec.y, this.#size, this.#size)
  }

  isDead() {
    return this.#lifespan <= 0
  }

  set towerYellowTarget(towerYellow: TowerYellow) {
    this.#towerYellowTarget = towerYellow
    this.#color = Particle.COLOR_CAPTURED
    this.#captured = true
    this.#lifespan = 255
  }

  get towerYellowTarget(): TowerYellow | null {
    return this.#towerYellowTarget
  }
}
