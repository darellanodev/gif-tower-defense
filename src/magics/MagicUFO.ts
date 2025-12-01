import { Image } from 'p5'
import { Magic } from './Magic'
import { Position } from '../types/position'
import { P5 } from '../utils/P5'
import { Enemy } from '../enemies/Enemy'
import { Const } from '../constants/Const'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicInstancesManager } from './MagicInstancesManager'
import { MagicUFOCollisionChecker } from './MagicUFOCollisionChecker'

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
  static numberOfUFOs: number = 0 // for generating IDs

  #images: Image[]
  #enemyTarget: Enemy | null = null
  #timeToSearchEnemy: number = 0
  #timeToAbduct: number = 0
  #showRay: boolean = false
  #goOut: boolean = false
  #id: number = 0
  #instancesManager: MagicInstancesManager // the UFO needs to see the other UFOs
  #magicUFOCollisionChecker: MagicUFOCollisionChecker
  constructor(
    images: Image[],
    startPosition: Position,
    instancesManager: MagicInstancesManager,
    magicUFOCollisionChecker: MagicUFOCollisionChecker,
  ) {
    super(startPosition)
    this.#images = images

    // generate id
    MagicUFO.numberOfUFOs++
    this.#id = MagicUFO.numberOfUFOs

    this.#instancesManager = instancesManager
    this.#magicUFOCollisionChecker = magicUFOCollisionChecker
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

  #checkIfShouldMoveRight() {
    if (this.position.x < this.startPosition.x) {
      this.position.x = this.position.x + MagicUFO.SPEED
    }
  }

  #checkIfShouldMoveLeft() {
    if (this.position.x > this.startPosition.x) {
      this.position.x = this.position.x - MagicUFO.SPEED
    }
  }

  #checkIfShouldMoveDown() {
    if (this.position.y < this.startPosition.y - MagicUFO.OFFSET_Y) {
      this.position.y = this.position.y + MagicUFO.SPEED
    }
  }

  #checkIfShouldMoveUp() {
    if (this.position.y > this.startPosition.y - MagicUFO.OFFSET_Y) {
      this.position.y = this.position.y - MagicUFO.SPEED
    }
  }

  #carryEnemyToStartTile() {
    if (!this.#enemyTarget) {
      return
    }
    this.#checkIfShouldMoveRight()
    this.#checkIfShouldMoveLeft()
    this.#checkIfShouldMoveDown()
    this.#checkIfShouldMoveUp()
  }

  #updatePositionGoOut() {
    if (this.position.y > MagicUFO.OUT_OF_SCREEN_Y) {
      this.position.y = this.position.y - MagicUFO.SPEED
      return
    }
    this.die()
  }

  #startedAbduct(): boolean {
    return this.#timeToAbduct > 0
  }

  #checkCollisionToAbductEnemy() {
    if (
      this.#magicUFOCollisionChecker.isCollidingWithEnemy(
        this,
        this.#enemyTarget,
      )
    ) {
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
    if (this.#magicUFOCollisionChecker.isCollidingWithStartPosition(this)) {
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

  #searchTarget(enemyInstancesManager: EnemyInstancesManager) {
    if (this.#timeToSearchEnemy === Const.TILE_SIZE) {
      this.selectTarget(enemyInstancesManager)
      this.#timeToSearchEnemy = 0
    } else {
      this.#timeToSearchEnemy++
    }
  }

  get enemyTarget(): Enemy | null {
    return this.#enemyTarget
  }

  #reSearchEnemyEveryTile(enemyInstancesManager: EnemyInstancesManager) {
    if (!this.#enemyTarget) {
      return
    }
    if (this.#enemyTarget.moveCount === 0) {
      this.selectTarget(enemyInstancesManager)
    }
  }

  update(enemyInstancesManager: EnemyInstancesManager) {
    if (this.#enemyTarget && this.#enemyTarget.alive) {
      if (this.#enemyTarget.isAbducted) {
        this.#carryEnemyToStartTile()
        this.#checkCollisionWithStartPosition()
      } else {
        this.#updatePositionToGetEnemy()
        this.#checkCollisionToAbductEnemy()
        this.#reSearchEnemyEveryTile(enemyInstancesManager)
      }
    } else {
      if (this.#goOut) {
        this.#updatePositionGoOut()
      } else {
        this.#searchTarget(enemyInstancesManager)
      }
    }
  }

  #isTargetedByOtherUFO(enemy: Enemy): boolean {
    let result = false
    this.#instancesManager.getAll().forEach((instance) => {
      if ('id' in instance) {
        if (instance.id !== this.id) {
          if (instance.#enemyTarget) {
            if (instance.#enemyTarget.id === enemy.id) {
              result = true
            }
          }
        }
      }
    })
    return result
  }

  selectTarget(enemyInstancesManager: EnemyInstancesManager) {
    let maxIndexOrder = 0
    let enemyTarget = null

    enemyInstancesManager.getAll().forEach((enemy: Enemy) => {
      const indexOder = enemy.orderPosition

      if (indexOder > maxIndexOrder && !this.#isTargetedByOtherUFO(enemy)) {
        maxIndexOrder = indexOder
        enemyTarget = enemy
      }
    })
    this.#enemyTarget = enemyTarget
  }
}
