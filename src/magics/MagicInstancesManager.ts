import { InstancesManager } from '../InstancesManager'
import { EnemyInstancesManager } from '../enemies/EnemyInstancesManager'
import { MagicsType } from '../types/magicsType'

export class MagicInstancesManager extends InstancesManager {
  #enemyInstancesManager: EnemyInstancesManager

  constructor(enemyInstancesManager: EnemyInstancesManager) {
    super()
    this.#enemyInstancesManager = enemyInstancesManager
  }

  add(instance: MagicsType) {
    this.instances.push(instance)
  }

  updateInstances() {
    this.instances.forEach((instance) => {
      instance.update(this.#enemyInstancesManager)
    })
  }
}
