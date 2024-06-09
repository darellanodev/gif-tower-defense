import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { MagicIceballInstancesManager } from '../../src/magics/MagicIceballInstancesManager'
import { testTinyOrders } from '../helpers/levelMap'
import { createMagicIceball } from '../helpers/magicIceball'

describe('Magic Iceball Instances length', () => {
  test('when there are not magicIceball, return 1', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    const magicIceballInstancesManager = new MagicIceballInstancesManager(
      enemyInstancesManager,
    )
    createMagicIceball(testTinyOrders, magicIceballInstancesManager)

    const result = magicIceballInstancesManager.getAll().length
    expect(result).toBe(1)
  })
})
