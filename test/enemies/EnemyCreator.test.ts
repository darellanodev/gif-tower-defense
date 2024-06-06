import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { createBossEnemy, createNormalEnemy } from '../helpers/enemyCreator'

describe('Enemy.instances.length', () => {
  test('when there are not enemy instances and the instance is recently created and is a normal enemy, return 1', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createNormalEnemy(enemyInstancesManager)

    const result = enemyInstancesManager.getAll().length
    expect(result).toBe(1)
  })
  test('when there are not enemy instances and the instance is recently created and is a boss enemy, return 1', () => {
    const enemyInstancesManager = new EnemyInstancesManager()
    createBossEnemy(enemyInstancesManager)

    const result = enemyInstancesManager.getAll().length
    expect(result).toBe(1)
  })
})
