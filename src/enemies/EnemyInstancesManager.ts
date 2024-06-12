import { Enemy } from './Enemy'

export class EnemyInstancesManager {
  #instances: Enemy[]
  #lastId: number = 0

  constructor() {
    this.#instances = []
  }

  add(instance: Enemy) {
    this.#instances.push(instance)
  }

  getAll() {
    return this.#instances
  }

  generateId() {
    this.#lastId++
    return this.#lastId
  }

  removeDeadInstances() {
    this.#instances = this.#instances.filter((instance) => instance.alive)
  }

  drawInstances() {
    this.#instances.forEach((instance) => {
      instance.draw()
    })
  }

  updateInstances() {
    this.#instances.forEach((instance) => {
      instance.update()
    })
  }
}
