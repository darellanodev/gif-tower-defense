import { Const } from '../constants/Const'
import { ConstColor } from '../constants/ConstColor'
import { Enemy } from '../enemies/Enemy'
import { Position } from '../types/position'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'

export class Missile extends Obj {
  static OUTER_DIAMETER = 11
  static INNER_DIAMETER = 6
  static VELOCITY = 1.5
  static STATUS_ALIVE = 0
  static STATUS_DEAD = 1

  static instances: Missile[] = []

  #enemyTarget: Enemy | null = null
  #status: number = 0
  #damage: number = 0

  constructor(position: Position, enemyTarget: Enemy, damage: number) {
    super(position)

    this.#enemyTarget = enemyTarget
    this.#damage = damage
  }

  setTarget(enemy: Enemy) {
    this.#enemyTarget = enemy
  }

  _moveToTarget() {
    if (!this.#enemyTarget) {
      return
    }
    if (this.position.x < this.#enemyTarget.position.x + Const.TILE_SIZE / 2) {
      this.position.x += Missile.VELOCITY
    } else {
      this.position.x -= Missile.VELOCITY
    }
    if (this.position.y < this.#enemyTarget.position.y + Const.TILE_SIZE / 2) {
      this.position.y += Missile.VELOCITY
    } else {
      this.position.y -= Missile.VELOCITY
    }
  }

  update() {
    if (this.#enemyTarget) {
      this._moveToTarget()
      if (this.#checkCollision()) {
        this.#status = Missile.STATUS_DEAD
        this.#enemyTarget.addDamage(this.#damage)
      }
    } else {
      this.#status = Missile.STATUS_DEAD
    }
  }

  #checkCollision() {
    if (!this.#enemyTarget) {
      return
    }
    let isInsideX = false
    let isInsideY = false
    if (
      this.position.x > this.#enemyTarget.position.x &&
      this.position.x < this.#enemyTarget.position.x + Const.TILE_SIZE
    ) {
      isInsideX = true
    }
    if (
      this.position.y > this.#enemyTarget.position.y &&
      this.position.y < this.#enemyTarget.position.y + Const.TILE_SIZE
    ) {
      isInsideY = true
    }
    return isInsideX && isInsideY
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

  static removeDeadInstances() {
    Missile.instances = Missile.instances.filter((missile) => missile.alive)
  }

  get alive() {
    return this.#status == Missile.STATUS_ALIVE
  }

  draw() {
    P5.p5.noStroke()
    P5.p5.fill(...ConstColor.RED)
    P5.p5.circle(this.position.x, this.position.y, Missile.OUTER_DIAMETER)
    P5.p5.fill(...ConstColor.YELLOW)
    P5.p5.circle(this.position.x, this.position.y, Missile.INNER_DIAMETER)
  }
}
