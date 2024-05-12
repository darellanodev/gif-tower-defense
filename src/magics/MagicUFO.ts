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
  static OUT_OF_SCREEN_Y = -50
  static instances: MagicUFO[] = []
  static numberOfUFOs: number = 0 // for generating IDs

  #images: Image[]
  #enemyTarget: Enemy | null = null
  #timeToSearchEnemy: number = 0
  #timeToStartAbduction: number = 0
  #showRay: boolean = false
  #goOut: boolean = false
  #id: number = 0

  constructor(images: Image[], startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#images = images

    // generate id
    MagicUFO.numberOfUFOs++
    this.#id = MagicUFO.numberOfUFOs
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

  get id() {
    return this.#id
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

  _carryEnemyToStartTile() {
    if (!this.#enemyTarget) {
      return
    }
    // if (this.#enemyTarget.isAbducted) {
    //   return
    // }
    if (this.position.x < this.startPosition.x) {
      this.position.x = this.position.x + MagicUFO.SPEED
    }
    if (this.position.x > this.startPosition.x) {
      this.position.x = this.position.x - MagicUFO.SPEED
    }
    if (this.position.y < this.startPosition.y - MagicUFO.OFFSET_Y) {
      this.position.y = this.position.y + MagicUFO.SPEED
    }
    if (this.position.y > this.startPosition.y - MagicUFO.OFFSET_Y) {
      this.position.y = this.position.y - MagicUFO.SPEED
    }
  }

  _updatePositionGoOut() {
    if (this.position.y > MagicUFO.OUT_OF_SCREEN_Y) {
      this.position.y = this.position.y - MagicUFO.SPEED
    } else {
      this.die()
    }
  }

  _isCollidingWithEnemy() {
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
  _isCollidingWithStartPosition() {
    return MathUtils.isPositionInsideRectangle(
      {
        x: this.position.x + Const.TILE_SIZE / 2,
        y: this.position.y + Const.TILE_SIZE / 2 + MagicUFO.OFFSET_COLLISION_Y,
      },
      {
        x: this.startPosition.x,
        y: this.startPosition.y,
      },
      { w: Const.TILE_SIZE, h: Const.TILE_SIZE },
    )
  }

  _checkCollisionWithEnemy() {
    if (this._isCollidingWithEnemy()) {
      this.#showRay = true
    } else {
      this.#showRay = false
    }
  }

  _checkCollisionWithStartPosition() {
    if (this._isCollidingWithStartPosition()) {
      if (!this.#enemyTarget) {
        return
      }
      this.#enemyTarget.dropFromUFO()
      this.#enemyTarget = null
      this.#goOut = true
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
        if (this.#enemyTarget.isAbducted) {
          this.#showRay = false
        }
      }
    }
  }

  _updatePositionToGetEnemy() {
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

  _searchTarget() {
    if (this.#timeToSearchEnemy === Const.TILE_SIZE) {
      this.selectTarget()
      this.#timeToSearchEnemy = 0
    } else {
      this.#timeToSearchEnemy++
    }
  }

  get enemyTarget(): Enemy | null {
    return this.#enemyTarget
  }

  update() {
    if (this.#enemyTarget) {
      if (this.#enemyTarget.moveCount == 0) {
        this.selectTarget()
        return
      }
      if (this.#enemyTarget.isAbducted) {
        this._carryEnemyToStartTile()
        this._checkCollisionWithStartPosition()
      } else {
        this._updatePositionToGetEnemy()
        this._checkCollisionWithEnemy()
        this._abduct()
      }
    } else {
      if (this.#goOut) {
        this._updatePositionGoOut()
      } else {
        this._searchTarget()
      }
    }
  }

  selectTarget() {
    let maxIndexOrder = 0
    let enemyTarget = null

    Enemy.instances.forEach((enemy: Enemy) => {
      const indexOder = enemy.orderPosition

      // if other UFO has targeted the enemy then continue

      if (indexOder > maxIndexOrder) {
        maxIndexOrder = indexOder
        enemyTarget = enemy
      }
    })
    this.#enemyTarget = enemyTarget
  }
}
