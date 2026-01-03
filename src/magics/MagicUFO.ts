import { Image } from 'p5'
import { Magic } from './Magic'
import { Position } from '../types/position'
import { P5 } from '../utils/P5'
import { Enemy } from '../enemies/Enemy'
import { TILE_SIZE } from '../constants/tile'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicInstancesManager } from './MagicInstancesManager'
import { MagicUFOCollisionChecker } from './MagicUFOCollisionChecker'
import { MAGIC_SPEED } from '../constants/magics'

export class MagicUFO extends Magic {
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

  #moveRightIfNeeded(targetPosition: Position) {
    if (this.position.x < targetPosition.x) {
      this.position.x = this.position.x + MAGIC_SPEED.UFO
    }
  }

  #moveLeftIfNeeded(targetPosition: Position) {
    if (this.position.x > targetPosition.x) {
      this.position.x = this.position.x - MAGIC_SPEED.UFO
    }
  }

  #moveDownIfNeeded(targetPosition: Position) {
    if (this.position.y < targetPosition.y - MagicUFO.OFFSET_Y) {
      this.position.y = this.position.y + MAGIC_SPEED.UFO
    }
  }

  #moveUpIfNeeded(targetPosition: Position) {
    if (this.position.y > targetPosition.y - MagicUFO.OFFSET_Y) {
      this.position.y = this.position.y - MAGIC_SPEED.UFO
    }
  }

  #carryEnemyToStartTile() {
    if (!this.#enemyTarget) {
      return
    }

    this.#moveToTarget(this.startPosition)
  }

  #updatePositionGoOut() {
    if (this.position.y > MagicUFO.OUT_OF_SCREEN_Y) {
      this.position.y = this.position.y - MAGIC_SPEED.UFO
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
      this.#dropEnemyIfEnemyEscaped()
    }
  }

  #dropEnemyIfEnemyEscaped() {
    if (this.#startedAbduct()) {
      this.#dropEnemy()
    }
  }

  #dropEnemy() {
    this.#enemyTarget = null
    this.#timeToAbduct = 0
  }

  #checkCollisionWithStartPosition() {
    if (!this.#magicUFOCollisionChecker.isCollidingWithStartPosition(this)) {
      return
    }

    if (!this.#enemyTarget) {
      return
    }

    this.#enemyTarget.dropFromUFO()
    this.#dropEnemy()
    this.#goOut = true
  }

  #isAbducting() {
    return this.#showRay && this.#enemyTarget
  }

  #abduct() {
    if (!this.#enemyTarget) {
      return
    }

    if (!this.#isAbducting()) {
      return
    }

    if (this.#timeToAbduct < MagicUFO.MAX_TIME_ABDUCT) {
      this.#timeToAbduct++
      return
    }
    this.#enemyTarget.decrementSize()
    this.#turnOffRayWhenEnemyIsAbducted()
  }

  #turnOffRayWhenEnemyIsAbducted() {
    if (this.#enemyTarget!.isAbducted) {
      this.#showRay = false
    }
  }

  #updatePositionToGetEnemy() {
    if (!this.#enemyTarget) {
      return
    }

    this.#moveToTarget(this.#enemyTarget.position)
  }

  #moveToTarget(targetPosition: Position) {
    this.#moveRightIfNeeded(targetPosition)
    this.#moveLeftIfNeeded(targetPosition)
    this.#moveDownIfNeeded(targetPosition)
    this.#moveUpIfNeeded(targetPosition)
  }

  #searchTarget(enemyInstancesManager: EnemyInstancesManager) {
    if (this.#timeToSearchEnemy !== TILE_SIZE) {
      this.#timeToSearchEnemy++
      return
    }
    this.selectTarget(enemyInstancesManager)
    this.#timeToSearchEnemy = 0
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
    if (this.#enemyTarget && this.#enemyTarget.isAlive) {
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
    for (const instance of this.#instancesManager.getAll()) {
      if (!('id' in instance)) {
        continue
      }
      if (instance.id === this.id) {
        continue
      }
      if (!instance.#enemyTarget) {
        continue
      }
      if (instance.#enemyTarget.id !== enemy.id) {
        continue
      }
      return true
    }
    return false
  }

  selectTarget(enemyInstancesManager: EnemyInstancesManager) {
    let maxIndexOrder = 0
    let enemyTarget = null

    enemyInstancesManager.getAll().forEach((enemy: Enemy) => {
      if (this.#canSelectEnemyTarget(enemy, maxIndexOrder)) {
        maxIndexOrder = enemy.orderPosition
        enemyTarget = enemy
      }
    })
    this.#enemyTarget = enemyTarget
  }

  #canSelectEnemyTarget(enemy: Enemy, maxIndexOrder: number) {
    return (
      enemy.orderPosition > maxIndexOrder && !this.#isTargetedByOtherUFO(enemy)
    )
  }
}
