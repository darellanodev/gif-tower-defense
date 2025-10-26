import { InstancesManager } from '../InstancesManager'
import { Enemy } from './Enemy'

export class EnemyInstancesManager extends InstancesManager {
  #lastId: number = 0

  add(instance: Enemy) {
    this.instances.push(instance)
  }

  generateId() {
    this.#lastId++
  }

  getLastId(): number {
    return this.#lastId
  }

  updateInstances() {
    this.instances.forEach((instance) => {
      instance.update()
    })
  }
}
