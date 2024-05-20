import { Image } from 'p5'
import { Magic } from './Magic'
import { Position } from '../types/position'
import { P5 } from '../utils/P5'
import { Enemy } from '../enemies/Enemy'
import { Const } from '../constants/Const'
import { PositionUtils } from '../utils/PositionUtils'
import { EnemyInstances } from '../enemies/EnemyInstances'

export class MagicUFO extends Magic {
  static SPEED = 2
  static OFFSET_COLLISION_Y = 50
  static OFFSET_Y = 25
  static UFO_IMG_INDEX = 0
  static UFO_RAY_IMG_INDEX = 1
  static UFO_RAY_IMG_OFFSET_X = 2
  static UFO_RAY_IMG_OFFSET_Y = 30
  static MAX_TIME_ABDUCT = 20
  static OUT_OF_SCREEN_Y = -50
  static instances: MagicUFO[] = []
  static numberOfUFOs: number = 0 // for generating IDs

  #images: Image[]
  #enemyTarget: Enemy | null = null
  #timeToSearchEnemy: number = 0
  #timeToAbduct: number = 0
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

  #drawUFO() {
    P5.p5.image(
      this.#images[MagicUFO.UFO_IMG_INDEX],
      this.position.x,
      this.position.y,
    )
  }

  get id() {
    return this.#id
  }

  #drawUFORay() {
    if (this.#showRay) {
      P5.p5.image(
        this.#images[MagicUFO.UFO_RAY_IMG_INDEX],
        this.position.x + MagicUFO.UFO_RAY_IMG_OFFSET_X,
        this.position.y + MagicUFO.UFO_RAY_IMG_OFFSET_Y,
      )
    }
  }

  draw() {
    this.#drawUFORay()
    this.#drawUFO()
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

  #carryEnemyToStartTile() {
    if (!this.#enemyTarget) {
      return
    }
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

  #updatePositionGoOut() {
    if (this.position.y > MagicUFO.OUT_OF_SCREEN_Y) {
      this.position.y = this.position.y - MagicUFO.SPEED
    } else {
      this.die()
    }
  }

  #isCollidingWithEnemy() {
    if (!this.#enemyTarget) {
      return false
    }
    return PositionUtils.isInsideRectangle(
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

  #isCollidingWithStartPosition() {
    return PositionUtils.isInsideRectangle(
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

  #startedAbduct(): boolean {
    return this.#timeToAbduct > 0
  }

  #checkCollisionToAbductEnemy() {
    if (this.#isCollidingWithEnemy()) {
      this.#showRay = true
      this.#abduct()
    } else {
      this.#showRay = false
      if (this.#startedAbduct()) {
        // loses the enemy
        this.#enemyTarget = null
        this.#timeToAbduct = 0
      }
    }
  }

  #checkCollisionWithStartPosition() {
    if (this.#isCollidingWithStartPosition()) {
      if (!this.#enemyTarget) {
        return
      }
      this.#enemyTarget.dropFromUFO()
      this.#enemyTarget = null
      this.#timeToAbduct = 0
      this.#goOut = true
    }
  }

  #isAbducting() {
    return this.#showRay && this.#enemyTarget
  }

  #abduct() {
    if (!this.#enemyTarget) {
      return
    }

    if (this.#isAbducting()) {
      if (this.#timeToAbduct < MagicUFO.MAX_TIME_ABDUCT) {
        this.#timeToAbduct++
      } else {
        this.#enemyTarget.decrementSize()
        if (this.#enemyTarget.isAbducted) {
          this.#showRay = false
        }
      }
    }
  }

  #updatePositionToGetEnemy() {
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

  #searchTarget() {
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

  #reSearchEnemyEveryTile() {
    if (!this.#enemyTarget) {
      return
    }
    if (this.#enemyTarget.moveCount === 0) {
      this.selectTarget()
    }
  }

  update() {
    if (this.#enemyTarget && this.#enemyTarget.alive) {
      if (this.#enemyTarget.isAbducted) {
        this.#carryEnemyToStartTile()
        this.#checkCollisionWithStartPosition()
      } else {
        this.#updatePositionToGetEnemy()
        this.#checkCollisionToAbductEnemy()
        this.#reSearchEnemyEveryTile()
      }
    } else {
      if (this.#goOut) {
        this.#updatePositionGoOut()
      } else {
        this.#searchTarget()
      }
    }
  }

  #isTargetedByOtherUFO(enemy: Enemy): boolean {
    let result = false
    MagicUFO.instances.forEach((ufo) => {
      if (ufo.id !== this.id) {
        if (ufo.#enemyTarget) {
          if (ufo.#enemyTarget.id === enemy.id) {
            result = true
          }
        }
      }
    })
    return result
  }

  selectTarget() {
    let maxIndexOrder = 0
    let enemyTarget = null

    EnemyInstances.instances.forEach((enemy: Enemy) => {
      const indexOder = enemy.orderPosition

      if (indexOder > maxIndexOrder && !this.#isTargetedByOtherUFO(enemy)) {
        maxIndexOrder = indexOder
        enemyTarget = enemy
      }
    })
    this.#enemyTarget = enemyTarget
  }
}
