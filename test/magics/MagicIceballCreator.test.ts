import { img } from '../helpers/imagesResources'
import { MagicCollisionChecker } from '../../src/magics/MagicCollisionChecker'
import { PathMovement } from '../../src/path/PathMovement'
import { Enemy } from '../../src/enemies/Enemy'
import { testTinyOrders } from '../helpers/levelMap'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicIceballInstancesManager } from '../../src/magics/MagicIceballInstancesManager'
import { MagicIceballCreator } from '../../src/magics/MagicIceballCreator'

describe('Magic Iceball Instances length', () => {
  test('when there are not magicIceball, return 1', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    const magicIceballInstancesManager = new MagicIceballInstancesManager(
      enemyInstancesManager,
    )
    const magicCollisionChecker = new MagicCollisionChecker()

    // create pathMovement
    const initialEnemiesPosition = { x: 100, y: 200 }
    const pathMovement = new PathMovement(
      initialEnemiesPosition,
      testTinyOrders,
      Enemy.VELOCITY,
    )

    const magicIceballCreator = new MagicIceballCreator(
      magicIceballInstancesManager,
      img,
      pathMovement,
      magicCollisionChecker,
    )

    magicIceballCreator.createMagicIceball()

    const result = magicIceballInstancesManager.getAll().length
    expect(result).toBe(1)
  })
})
