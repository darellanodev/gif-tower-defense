import { Image } from 'p5'
import { Magic } from './Magic'
import { Position } from '../utils/types'
import { P5 } from '../utils/P5'
import { Enemy } from '../enemies/Enemy'
import { Const } from '../constants/Const'

export class MagicUFO extends Magic {
  static instances: MagicUFO[] = []
  static SPEED = 2
  static OFFSET_Y = 30

  #img: Image
  #enemyTarget: Enemy | null = null
  #timeToSearchEnemy: number = 0

  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  static instantiate(image: Image, position: Position, orders: number[]) {
    MagicUFO.instances.push(new MagicUFO(image, position, orders))
  }

  draw() {
    P5.p5.image(this.#img, this.position.x, this.position.y)
  }

  static drawInstances() {
    MagicUFO.instances.forEach((ufo) => {
      ufo.draw()
    })
  }

  static updateInstances() {
    MagicUFO.instances.forEach((ufo) => {
      ufo.update()
    })
  }

  static removeDeadInstances() {
    MagicUFO.instances = MagicUFO.instances.filter((ufo) => ufo.isAlive())
  }

  _updatePosition() {
    if (!this.#enemyTarget) {
      return
    }

    if (this.position.x < this.#enemyTarget.position.x) {
      this.position.x = this.position.x + MagicUFO.SPEED
    }
    if (this.position.x > this.#enemyTarget.position.x) {
      this.position.x = this.position.x - MagicUFO.SPEED
    }
    if (this.position.y < this.#enemyTarget.position.y - MagicUFO.OFFSET_Y) {
      this.position.y = this.position.y + MagicUFO.SPEED
    }
    if (this.position.y > this.#enemyTarget.position.y - MagicUFO.OFFSET_Y) {
      this.position.y = this.position.y - MagicUFO.SPEED
    }
  }

  update() {
    if (this.#enemyTarget) {
      if (this.#enemyTarget.moveCount == 0) {
        this.selectTarget()
        return
      }
      this._updatePosition()
    } else {
      if (this.#timeToSearchEnemy === Const.TILE_SIZE) {
        this.selectTarget()
        this.#timeToSearchEnemy = 0
      } else {
        this.#timeToSearchEnemy++
      }
    }
  }

  selectTarget() {
    let maxIndexOrder = 0
    let enemyTarget = null

    Enemy.instances.forEach((enemy) => {
      const indexOder = enemy.orderPosition

      if (indexOder > maxIndexOrder) {
        maxIndexOrder = indexOder
        enemyTarget = enemy
      }
    })
    console.log(enemyTarget)
    this.#enemyTarget = enemyTarget
  }
}
