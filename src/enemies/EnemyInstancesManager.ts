import { Enemy } from './Enemy'

export class EnemyInstancesManager {
  #instances: Enemy[]

  constructor() {
    this.#instances = []
  }

  add(enemy: Enemy) {
    this.#instances.push(enemy)
  }

  getAll() {
    return this.#instances
  }

  generateId() {
    Enemy.numberOfEnemies++
    return Enemy.numberOfEnemies
  }

  removeDeadInstances() {
    Enemy.instances = Enemy.instances.filter((enemy) => enemy.alive)
  }

  updateInstances() {
    Enemy.instances.forEach((enemy) => {
      enemy.update()
    })
  }
}
