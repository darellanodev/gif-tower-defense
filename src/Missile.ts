import { Const } from './Const'
import { ConstColor } from './ConstColor'
import { Enemy } from './Enemy'
import { Position } from './types'

export class Missile {
  static OUTER_DIAMETER = 11
  static INNER_DIAMETER = 6
  static VELOCITY = 1.5

  static instances: Missile[] = []

  #position: Position
  #enemyTarget: Enemy = null

  constructor(position: Position, enemyTarget: Enemy) {
    this.#position = { ...position }
    this.#enemyTarget = enemyTarget
  }

  setTarget(enemy: Enemy) {
    this.#enemyTarget = enemy
  }

  update() {
    if (this.#enemyTarget) {
      if (
        this.#position.x <
        this.#enemyTarget.position.x + Const.TILE_SIZE / 2
      ) {
        this.#position.x += Missile.VELOCITY
      } else {
        this.#position.x -= Missile.VELOCITY
      }
      if (
        this.#position.y <
        this.#enemyTarget.position.y + Const.TILE_SIZE / 2
      ) {
        this.#position.y += Missile.VELOCITY
      } else {
        this.#position.y -= Missile.VELOCITY
      }
    }
  }

  static updateInstances() {
    Missile.instances.forEach((m) => {
      m.update()
    })
  }

  static drawInstances() {
    Missile.instances.forEach((m) => {
      m.draw()
    })
  }

  draw() {
    noStroke()
    fill(...ConstColor.RED)
    circle(this.#position.x, this.#position.y, Missile.OUTER_DIAMETER)
    fill(...ConstColor.YELLOW)
    circle(this.#position.x, this.#position.y, Missile.INNER_DIAMETER)
  }
}
