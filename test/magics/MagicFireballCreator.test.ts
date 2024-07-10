import { MagicInstancesManager } from '../../src/magics/MagicInstancesManager'
import { MagicFireballCreator } from '../../src/magics/MagicFireballCreator'
import { img } from '../helpers/imagesResources'
import { Enemy } from '../../src/enemies/Enemy'
import { testTinyOrders } from '../helpers/levelMap'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'

test('do not allow call constructor more than one time', () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  const magicFireballInstancesManager = new MagicInstancesManager(
    enemyInstancesManager,
  )

  // create pathMovement
  const initialEnemiesPosition = { x: 100, y: 200 }

  MagicFireballCreator.clearInstance()
  new MagicFireballCreator(
    magicFireballInstancesManager,
    img,
    initialEnemiesPosition,
    testTinyOrders,
    Enemy.VELOCITY,
  )
  expect(
    () =>
      new MagicFireballCreator(
        magicFireballInstancesManager,
        img,
        initialEnemiesPosition,
        testTinyOrders,
        Enemy.VELOCITY,
      ),
  ).toThrow(
    'MagicFireballCreator is a singleton class, use getInstance to get the instance',
  )
})
describe('Magic Fireball Instances length', () => {
  test('when there are not magicFireball, return 1', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    const magicFireballInstancesManager = new MagicInstancesManager(
      enemyInstancesManager,
    )

    // create pathMovement
    const initialEnemiesPosition = { x: 100, y: 200 }

    MagicFireballCreator.clearInstance()
    const magicFireballCreator = MagicFireballCreator.getInstance(
      magicFireballInstancesManager,
      img,
      initialEnemiesPosition,
      testTinyOrders,
      Enemy.VELOCITY,
    )

    magicFireballCreator.create()

    const result = magicFireballInstancesManager.getAll().length
    expect(result).toBe(1)
  })
})
