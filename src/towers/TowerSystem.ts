import { EnemySystem } from '../enemies/EnemySystem'
import { TilesManager } from '../levels/tiles/TilesManager'

export class TowerSystem {
  #tilesManager: TilesManager
  #enemySystem: EnemySystem
  constructor(tilesManager: TilesManager, enemySystem: EnemySystem) {
    this.#tilesManager = tilesManager
    this.#enemySystem = enemySystem
  }

  updateTowersEnemyTarget() {
    this.#tilesManager.getAllOrangeTiles.forEach((orangeTile) => {
      if (this.#enemySystem === null) {
        throw new Error('enemySystem is null')
      }
      orangeTile.selectTarget(this.#enemySystem.enemyInstancesManager.getAll())
    })
  }

  draw() {
    this.#tilesManager.getAllOrangeTiles.forEach((orangeTile) => {
      orangeTile.updateTower()
      orangeTile.drawTower()
    })
  }
}
