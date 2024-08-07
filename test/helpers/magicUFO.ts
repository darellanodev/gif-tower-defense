import { Const } from '../../src/constants/Const'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicInstancesManager } from '../../src/magics/MagicInstancesManager'
import { Enemy } from '../../src/enemies/Enemy'

export const updateInstancesOfEnemiesAndUFOsForATileSize = (
  enemyInstancesManager: EnemyInstancesManager,
  magicUFOInstancesManager: MagicInstancesManager,
) => {
  // The enemy needs to walk a minimum of a one tile size and then the MagicUFO can target it
  for (let i = 0; i < Const.TILE_SIZE + 1; i++) {
    enemyInstancesManager.updateInstances()
    magicUFOInstancesManager.updateInstances()
  }
}

export const getEnemyTargetIdForUFO = (
  instanceNumber: number,
  magicUFOInstancesManager: MagicInstancesManager,
): number | null => {
  let enemyTarget: Enemy | null = null
  const instance = magicUFOInstancesManager.getAll()[instanceNumber]

  if ('id' in instance) {
    enemyTarget = instance.enemyTarget
  }

  let result: number | null = null
  if (enemyTarget) {
    result = enemyTarget.id
  }
  return result
}
