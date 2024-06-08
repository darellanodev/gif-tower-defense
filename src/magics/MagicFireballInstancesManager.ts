import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicFireball } from './MagicFireball'

export class MagicFireballInstancesManager {
  #instances: MagicFireball[]
  #enemyInstancesManager: EnemyInstancesManager

  constructor(enemyInstancesManager: EnemyInstancesManager) {
    this.#instances = []
    this.#enemyInstancesManager = enemyInstancesManager
  }

  add(magicFireball: MagicFireball) {
    this.#instances.push(magicFireball)
  }

  getAll() {
    return this.#instances
  }

  removeDeadInstances() {
    this.#instances = this.#instances.filter((fireball) => fireball.isAlive())
  }

  drawInstances() {
    this.#instances.forEach((magicFireball) => {
      magicFireball.draw()
    })
  }

  updateInstances() {
    this.#instances.forEach((magicFireball) => {
      magicFireball.update(this.#enemyInstancesManager)
    })
  }
}
