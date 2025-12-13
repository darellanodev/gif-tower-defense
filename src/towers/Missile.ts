import { ConstTile } from '../constants/ConstTile'
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

  #moveToTarget() {
    if (!this.#enemyTarget) {
      return
    }
    this.#moveHorizontally(this.#enemyTarget.position)
    this.#moveVertically(this.#enemyTarget.position)
  }

  #moveHorizontally(targetPosition: Position) {
    if (this.position.x < targetPosition.x + ConstTile.SIZE / 2) {
      this.position.x += Missile.VELOCITY
      return
    }
    this.position.x -= Missile.VELOCITY
  }

  #moveVertically(targetPosition: Position) {
    if (this.position.y < targetPosition.y + ConstTile.SIZE / 2) {
      this.position.y += Missile.VELOCITY
      return
    }
    this.position.y -= Missile.VELOCITY
  }

  update() {
    if (!this.#enemyTarget) {
      this.#status = Missile.STATUS_DEAD
      return
    }
    this.#moveToTarget()
    this.#addDamageEnemyWhenCollision(this.#enemyTarget)
  }

  #addDamageEnemyWhenCollision(enemyTarget: Enemy) {
    if (this.#checkCollision()) {
      this.#status = Missile.STATUS_DEAD
      enemyTarget.addDamage(this.#damage)
    }
  }

  #checkCollision() {
    if (!this.#enemyTarget) {
      return
    }
    return (
      this.#isInsideX(this.#enemyTarget) && this.#isInsideY(this.#enemyTarget)
    )
  }

  #isInsideX(enemyTarget: Enemy) {
    return (
      this.position.x > enemyTarget.position.x &&
      this.position.x < enemyTarget.position.x + ConstTile.SIZE
    )
  }

  #isInsideY(enemyTarget: Enemy) {
    return (
      this.position.y > enemyTarget.position.y &&
      this.position.y < enemyTarget.position.y + ConstTile.SIZE
    )
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
    Missile.instances = Missile.instances.filter((missile) => missile.isAlive)
  }

  get isAlive() {
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
