import { images, img } from '../helpers/imagesResources'
import { MagicCollisionChecker } from '../../src/magics/MagicCollisionChecker'
import { PathMovement } from '../../src/path/PathMovement'
import { Enemy } from '../../src/enemies/Enemy'
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
      testTinyOrders,
      enemyInstancesManager,
      magicUFOInstancesManager,
    )

    magicUFOCreator.createMagicUFO()

    const result = magicUFOInstancesManager.getAll().length
    expect(result).toBe(1)
  })
})
