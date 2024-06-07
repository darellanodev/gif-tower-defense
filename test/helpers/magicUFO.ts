import { Const } from '../../src/constants/Const'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicUFO } from '../../src/magics/MagicUFO'
import { img } from './imagesResources'
import { getPathFromMap, getValidLevelMap } from './levelMap'

export const clearMagicUFOInstances = () => {
  MagicUFO.instances = []
}

export const instantiateMagicUFO = (
  orders?: number[] | null,
  enemyInstancesManager?: EnemyInstancesManager | null,
) => {
  const initialPosition = { x: 100, y: 200 }

  if (!orders) {
    const levelMap = getValidLevelMap()
    const path = getPathFromMap(levelMap)
    orders = path.makeOrders()
  }

  if (!enemyInstancesManager) {
    enemyInstancesManager = new EnemyInstancesManager()
  }

  MagicUFO.instantiate(img, initialPosition, orders, enemyInstancesManager)
}

export const updateInstancesOfEnemiesAndUFOsForATileSize = (
  enemyInstancesManager: EnemyInstancesManager,
) => {
  // The enemy needs to walk a minimum of a one tile size and then the MagicUFO can target it
  for (let i = 0; i < Const.TILE_SIZE + 1; i++) {
    enemyInstancesManager.updateInstances()
    MagicUFO.updateInstances()
  }
}

export const getEnemyTargetIdForUFO = (
  instanceNumber: number,
): number | null => {
  const enemyTarget = MagicUFO.instances[instanceNumber].enemyTarget
  let result: number | null = null
  if (enemyTarget) {
    result = enemyTarget.id
  }
  return result
}
