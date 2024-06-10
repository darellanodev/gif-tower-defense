import { Const } from '../../src/constants/Const'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicUFOCreator } from '../../src/magics/MagicUFOCreator'
import { MagicUFOInstancesManager } from '../../src/magics/MagicUFOInstancesManager'
import { images } from './imagesResources'

export const createMagicUFO = (
  magicUFOInstancesManager: MagicUFOInstancesManager,
) => {
  const initialEnemiesPosition = { x: 100, y: 200 }
  const magicUFOCreator = new MagicUFOCreator(
    images,
    initialEnemiesPosition,
    magicUFOInstancesManager,
  )
  magicUFOCreator.create()
}

export const updateInstancesOfEnemiesAndUFOsForATileSize = (
  enemyInstancesManager: EnemyInstancesManager,
  magicUFOInstancesManager: MagicUFOInstancesManager,
) => {
  // The enemy needs to walk a minimum of a one tile size and then the MagicUFO can target it
  for (let i = 0; i < Const.TILE_SIZE + 1; i++) {
    enemyInstancesManager.updateInstances()
    magicUFOInstancesManager.updateInstances()
  }
}

export const getEnemyTargetIdForUFO = (
  instanceNumber: number,
  magicUFOInstancesManager: MagicUFOInstancesManager,
): number | null => {
  const enemyTarget =
    magicUFOInstancesManager.getAll()[instanceNumber].enemyTarget
  let result: number | null = null
  if (enemyTarget) {
    result = enemyTarget.id
  }
  return result
}
