import { Enemy } from './Enemy'

export class EnemyInstancesManager {
  #instances: Enemy[]
  #lastId: number = 0

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
    this.#lastId++
    return this.#lastId
  }

  removeDeadInstances() {
    this.#instances = this.#instances.filter((enemy) => enemy.alive)
  }

  updateInstances() {
    this.#instances.forEach((enemy) => {
      enemy.update()
    })
  }
}
