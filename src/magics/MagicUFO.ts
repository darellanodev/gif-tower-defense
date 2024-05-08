import { Image } from 'p5'
import { Magic } from './Magic'
import { Position } from '../utils/types'
import { P5 } from '../utils/P5'
import { Enemy } from '../enemies/Enemy'
import { Const } from '../constants/Const'
import { MathUtils } from '../utils/MathUtils'

export class MagicUFO extends Magic {
  static SPEED = 2
  static OFFSET_COLLISION_Y = 50
  static OFFSET_Y = 25
  static UFO_IMG_INDEX = 0
  static UFO_RAY_IMG_INDEX = 1
  static UFO_RAY_IMG_OFFSET_X = 2
  static UFO_RAY_IMG_OFFSET_Y = 30
  static MAX_TIME_TO_START_ABDUCTION = 30

  static instances: MagicUFO[] = []
  #images: Image[]
  #enemyTarget: Enemy | null = null
  #timeToSearchEnemy: number = 0
  #timeToStartAbduction: number = 0
  #showRay: boolean = false

  constructor(images: Image[], startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#images = images
  }

  static instantiate(images: Image[], position: Position, orders: number[]) {
    MagicUFO.instances.push(new MagicUFO(images, position, orders))
  }

  _drawUFO() {
    P5.p5.image(
      this.#images[MagicUFO.UFO_IMG_INDEX],
      this.position.x,
      this.position.y,
    )
  }
  _drawUFORay() {
    if (this.#showRay) {
      P5.p5.image(
        this.#images[MagicUFO.UFO_RAY_IMG_INDEX],
        this.position.x + MagicUFO.UFO_RAY_IMG_OFFSET_X,
        this.position.y + MagicUFO.UFO_RAY_IMG_OFFSET_Y,
      )
    }
  }

  draw() {
    this._drawUFORay()
    this._drawUFO()
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

  _isColliding() {
    if (!this.#enemyTarget) {
      return false
    }
    return MathUtils.isPositionInsideRectangle(
      {
        x: this.position.x + Const.TILE_SIZE / 2,
        y: this.position.y + Const.TILE_SIZE / 2 + MagicUFO.OFFSET_COLLISION_Y,
      },
      {
        x: this.#enemyTarget.position.x,
        y: this.#enemyTarget.position.y,
      },
      { w: Const.TILE_SIZE, h: Const.TILE_SIZE },
    )
  }

  _checkCollision() {
    if (this._isColliding()) {
      this.#showRay = true
    } else {
      this.#showRay = false
    }
  }

  _isAbducting() {
    return this.#showRay && this.#enemyTarget
  }
  _abduct() {
    if (!this.#enemyTarget) {
      return
    }

    if (this._isAbducting()) {
      if (this.#timeToStartAbduction < MagicUFO.MAX_TIME_TO_START_ABDUCTION) {
        this.#timeToStartAbduction++
      } else {
        this.#enemyTarget.decrementSize()
      }
    }
  }

  update() {
    if (this.#enemyTarget) {
      if (this.#enemyTarget.moveCount == 0) {
        this.selectTarget()
        return
      }
      this._updatePosition()
      this._checkCollision()
      this._abduct()
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
    this.#enemyTarget = enemyTarget
  }
}
