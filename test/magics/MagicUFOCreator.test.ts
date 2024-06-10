import { images } from '../helpers/imagesResources'
import { testTinyOrders } from '../helpers/levelMap'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicUFOInstancesManager } from '../../src/magics/MagicUFOInstancesManager'
import { MagicUFOCreator } from '../../src/magics/MagicUFOCreator'

describe('Magic UFO Instances length', () => {
  test('when there are not magicUFO, return 1', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    const magicUFOInstancesManager = new MagicUFOInstancesManager(
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
