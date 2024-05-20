import { Position } from '../types/position'
import { Image } from 'p5'
import { Player } from '../player/Player'
import { Enemy } from './Enemy'

export class EnemyInstances {
  static VELOCITY = 1 // must be multiple of "this.#Const.TILE_SIZE". Set 1 for normal, 5 for a faster game or 25 for a fastest game
  static BOSS_VELOCITY = 0.5
  static INDEX_BOSS_IN_ENEMIES_IMAGES = 5
  static CHANGE_EYES_MAX_TIME = 50
  static EXTEND_CLOSED_EYES_MAX_TIME = 20
  static MIN_TIME_TO_CLOSE = 50
  static MAX_TIME_TO_CLOSE = 200
  static EYES_CENTER = 0
  static EYES_LEFT = 1
  static EYES_RIGHT = 2
  static EYES_CLOSED = 3
  static STATUS_ALIVE = 0
  static STATUS_DEAD = 1
  static TOTAL_ENEMIES = 5
  static CREATION_MAX_TIME = 200 // 100 when ENEMY_VELOCITY is 1. Decrement it if you speed up the game.
  static SIZE = 50
  static REDUCTION_FACTOR = 0.6

  static numberOfEnemies = 0 // for generating IDs
  static instances: Enemy[] = []
  static waveEnemies: number = 0
  static allowCreateEnemies: boolean = true
  static createEnemyTime: number = 0

  static instantiateNormalEnemy(
    images: Image[],
    waveEnemies: number,
    orders: number[],
    initialEnemiesPosition: Position,
    wave: number,
    player: Player,
  ) {
    const endurance = wave * 3 + waveEnemies * 2
    const isBoss = false

    const id = EnemyInstances.#generateId()

    EnemyInstances.instances.push(
      new Enemy(
        images,
        initialEnemiesPosition,
        orders,
        endurance,
        isBoss,
        player,
        id,
      ),
    )
  }

  static #generateId() {
    EnemyInstances.numberOfEnemies++
    return EnemyInstances.numberOfEnemies
  }

  static instantiateBoss(
    images: Image[],
    orders: number[],
    initialEnemiesPosition: Position,
    wave: number,
    player: Player,
  ) {
    const endurance = wave * 25
    const isBoss = true

    const id = EnemyInstances.#generateId()

    EnemyInstances.instances.push(
      new Enemy(
        images,
        initialEnemiesPosition,
        orders,
        endurance,
        isBoss,
        player,
        id,
      ),
    )
  }

  static removeDeadInstances() {
    EnemyInstances.instances = EnemyInstances.instances.filter(
      (enemy) => enemy.alive,
    )
  }

  static updateInstances() {
    EnemyInstances.instances.forEach((enemy) => {
      enemy.update()
    })
  }
}
