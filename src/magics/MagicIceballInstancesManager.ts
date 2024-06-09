import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicIceball } from './MagicIceball'

export class MagicIceballInstancesManager {
  #instances: MagicIceball[]
  #enemyInstancesManager: EnemyInstancesManager

  constructor(enemyInstancesManager: EnemyInstancesManager) {
    this.#instances = []
    this.#enemyInstancesManager = enemyInstancesManager
  }

  add(magicIceball: MagicIceball) {
    this.#instances.push(magicIceball)
  }

  getAll() {
    return this.#instances
  }

  removeDeadInstances() {
    this.#instances = this.#instances.filter((Iceball) => Iceball.isAlive())
  }

  drawInstances() {
    this.#instances.forEach((magicIceball) => {
      magicIceball.draw()
    })
  }

  updateInstances() {
    this.#instances.forEach((magicIceball) => {
      magicIceball.update(this.#enemyInstancesManager)
    })
  }
}
