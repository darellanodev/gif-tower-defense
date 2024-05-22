import { Position } from '../types/position'
import { Image } from 'p5'
import { Player } from '../player/Player'
import { Enemy } from './Enemy'

export class EnemyInstances {
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
