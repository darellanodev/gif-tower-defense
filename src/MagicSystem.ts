import { EnemySystem } from './EnemySystem'
import { MagicInstancesManager } from './magics/MagicInstancesManager'

export class MagicSystem {
  magicFireballInstancesManager: MagicInstancesManager
  magicIceballInstancesManager: MagicInstancesManager
  magicUFOInstancesManager: MagicInstancesManager

  constructor(enemySystem: EnemySystem) {
    this.magicFireballInstancesManager = new MagicInstancesManager(
      enemySystem.enemyInstancesManager,
    )
    this.magicIceballInstancesManager = new MagicInstancesManager(
      enemySystem.enemyInstancesManager,
    )
    this.magicUFOInstancesManager = new MagicInstancesManager(
      enemySystem.enemyInstancesManager,
    )
  }

  drawMagics() {
    if (this.magicUFOInstancesManager === null) {
      throw new Error('magicUFOInstancesManager is null')
    }
    if (this.magicIceballInstancesManager === null) {
      throw new Error('magicIceballInstancesManager is null')
    }
    if (this.magicFireballInstancesManager === null) {
      throw new Error('magicFireballInstancesManager is null')
    }

    this.magicFireballInstancesManager.drawInstances()
    this.magicIceballInstancesManager.drawInstances()
    this.magicUFOInstancesManager.drawInstances()
  }

  update() {
    if (this.magicUFOInstancesManager === null) {
      throw new Error('magicUFOInstancesManager is null')
    }
    if (this.magicIceballInstancesManager === null) {
      throw new Error('magicIceballInstancesManager is null')
    }
    if (this.magicFireballInstancesManager === null) {
      throw new Error('magicFireballInstancesManager is null')
    }

    this.magicFireballInstancesManager.updateInstances()
    this.magicFireballInstancesManager.removeDeadInstances()

    this.magicIceballInstancesManager.updateInstances()
    this.magicIceballInstancesManager.removeDeadInstances()

    this.magicUFOInstancesManager.updateInstances()
    this.magicUFOInstancesManager.removeDeadInstances()
  }
}
