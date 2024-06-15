export class InstancesManager {
  instances: any[]
  constructor() {
    this.instances = []
  }

  getAll() {
    return this.instances
  }

  removeDeadInstances() {
    this.instances = this.instances.filter((instance) => instance.alive)
  }

  drawInstances() {
    this.instances.forEach((instance) => {
      instance.draw()
    })
  }
}
