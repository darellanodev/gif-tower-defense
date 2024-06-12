import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicsType } from '../types/magicsType'

export class MagicInstancesManager {
  #instances: MagicsType[]
  #enemyInstancesManager: EnemyInstancesManager

  constructor(enemyInstancesManager: EnemyInstancesManager) {
    this.#instances = []
    this.#enemyInstancesManager = enemyInstancesManager
  }

  add(instance: MagicsType) {
    this.#instances.push(instance)
  }

  getAll() {
    return this.#instances
  }

  removeDeadInstances() {
    this.#instances = this.#instances.filter((instance) => instance.isAlive())
  }

  drawInstances() {
    this.#instances.forEach((instance) => {
      instance.draw()
    })
  }

  updateInstances() {
    this.#instances.forEach((instance) => {
      instance.update(this.#enemyInstancesManager)
    })
  }
}
