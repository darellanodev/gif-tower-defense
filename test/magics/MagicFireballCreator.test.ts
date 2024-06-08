import { MagicFireballInstancesManager } from '../../src/magics/MagicFireballInstancesManager'
import { MagicFireballCreator } from '../../src/magics/MagicFireballCreator'
import { img } from '../helpers/imagesResources'
import { MagicCollisionChecker } from '../../src/magics/MagicCollisionChecker'
import { PathMovement } from '../../src/path/PathMovement'
import { Enemy } from '../../src/enemies/Enemy'
import { testTinyOrders } from '../helpers/levelMap'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'

describe('Magic Fireball Instances length', () => {
  test('when there are not magicFireball, return 1', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    const magicFireballInstancesManager = new MagicFireballInstancesManager(
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

    const magicFireballCreator = new MagicFireballCreator(
      magicFireballInstancesManager,
      img,
      pathMovement,
      magicCollisionChecker,
    )

    magicFireballCreator.createMagicFireball()

    const result = magicFireballInstancesManager.getAll().length
    expect(result).toBe(1)
  })
})
