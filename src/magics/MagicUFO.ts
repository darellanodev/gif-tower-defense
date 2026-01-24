import { Image } from 'p5'
import { Magic } from './Magic'
import { Position } from '../types/position'
import { P5 } from '../utils/P5'
import { Enemy } from '../enemies/Enemy'
import { TILE_SIZE } from '../constants/tile'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicInstancesManager } from './MagicInstancesManager'
import { MagicUFOCollisionChecker } from './MagicUFOCollisionChecker'
import {
  MAGIC_SPEED,
  MAGIC_UFO_IMG_INDEX,
  MAGIC_UFO_MAX_TIME_ABDUCT,
  MAGIC_UFO_OFFSET,
  MAGIC_UFO_OUT_OF_SCREEN_Y,
  MAGIC_UFO_RAY_IMG,
} from '../constants/magics'

export class MagicUFO extends Magic {
  static numberOfUFOs: number = 0 // for generating IDs

  #images: Image[]
  #enemyTarget: Enemy | null = null
  #timeToSearchEnemy: number = 0
  #timeToAbduct: number = 0
  #isShowingRay: boolean = false
  #isGoingOut: boolean = false
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
      this.#images[MAGIC_UFO_IMG_INDEX],
      this.position.x,
      this.position.y,
    )
  }

  get id() {
    return this.#id
  }

  #drawUFORay() {
    if (this.#isShowingRay) {
      P5.p5.image(
        this.#images[MAGIC_UFO_RAY_IMG.INDEX],
        this.position.x + MAGIC_UFO_RAY_IMG.OFFSET_X,
        this.position.y + MAGIC_UFO_RAY_IMG.OFFSET_Y,
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
    if (this.position.y < targetPosition.y - MAGIC_UFO_OFFSET.Y) {
      this.position.y = this.position.y + MAGIC_SPEED.UFO
    }
  }

  #moveUpIfNeeded(targetPosition: Position) {
    if (this.position.y > targetPosition.y - MAGIC_UFO_OFFSET.Y) {
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
    if (this.position.y > MAGIC_UFO_OUT_OF_SCREEN_Y) {
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
      this.#isShowingRay = true
      this.#abduct()
    } else {
      this.#isShowingRay = false
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
    this.#isGoingOut = true
  }

  #isAbducting() {
    return this.#isShowingRay && this.#enemyTarget
  }

  #abduct() {
    if (!this.#enemyTarget) {
      return
    }

    if (!this.#isAbducting()) {
      return
    }

    if (this.#timeToAbduct < MAGIC_UFO_MAX_TIME_ABDUCT) {
      this.#timeToAbduct++
      return
    }
    this.#enemyTarget.decrementSize()
    this.#turnOffRayWhenEnemyIsAbducted()
  }

  #turnOffRayWhenEnemyIsAbducted() {
    if (this.#enemyTarget!.isAbducted) {
      this.#isShowingRay = false
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
      if (this.#isGoingOut) {
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
