import { describe, expect } from 'vitest'
import { images } from '../helpers/imagesResources'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicInstancesManager } from '../../src/magics/MagicInstancesManager'
import { MagicUFOCreator } from '../../src/magics/creators/MagicUFOCreator'

describe('Magic UFO Instances length', () => {
  test('when there are not magicUFO, return 1', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    const magicUFOInstancesManager = new MagicInstancesManager(
      enemyInstancesManager,
    )

    const initialEnemiesPosition = { x: 100, y: 200 }

    const magicUFOCreator = new MagicUFOCreator(
      images,
      initialEnemiesPosition,
      magicUFOInstancesManager,
    )

    magicUFOCreator.create()

    const result = magicUFOInstancesManager.getAll().length
    expect(result).toBe(1)
  })
})
