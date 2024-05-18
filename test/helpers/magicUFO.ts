import { Const } from '../../src/constants/Const'
import { Enemy } from '../../src/enemies/Enemy'
import { MagicUFO } from '../../src/magics/MagicUFO'
import { img } from './imagesResources'
import { getPathFromMap, getValidLevelMap } from './levelMap'

export const clearMagicUFOInstances = () => {
  MagicUFO.instances = []
}
export const instantiateMagicUFO = (orders?: number[]) => {
  const initialPosition = { x: 100, y: 200 }

  if (!orders) {
    const levelMap = getValidLevelMap()
    const path = getPathFromMap(levelMap)
    orders = path.makeOrders()
  }

  MagicUFO.instantiate(img, initialPosition, orders)
}

export const updateInstancesOfEnemiesAndUFOsForATileSize = () => {
  // The enemy needs to walk a minimum of a one tile size and then the MagicUFO can target it
  for (let i = 0; i < Const.TILE_SIZE + 1; i++) {
    Enemy.updateInstances()
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
