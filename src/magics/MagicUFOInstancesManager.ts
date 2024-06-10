import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicUFO } from './MagicUFO'

export class MagicUFOInstancesManager {
  #instances: MagicUFO[]
  #enemyInstancesManager: EnemyInstancesManager

  constructor(enemyInstancesManager: EnemyInstancesManager) {
    this.#instances = []
    this.#enemyInstancesManager = enemyInstancesManager
  }

  add(magicUFO: MagicUFO) {
    this.#instances.push(magicUFO)
  }

  getAll() {
    return this.#instances
  }

  removeDeadInstances() {
    this.#instances = this.#instances.filter((UFO) => UFO.isAlive())
  }

  drawInstances() {
    this.#instances.forEach((magicUFO) => {
      magicUFO.draw()
    })
  }

  updateInstances() {
    this.#instances.forEach((magicUFO) => {
      magicUFO.update(this.#enemyInstancesManager)
    })
  }
}
