import { beforeEach, describe, expect } from 'vitest'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { TOWER_RED_MAX_TIME_RECHARGE } from '../../src/constants/tower'
import { Missile } from '../../src/towers/Missile'
import { TowerRed } from '../../src/towers/TowerRed'
import { createNormalEnemy } from '../helpers/enemyCreator'
import { instantiateRedTower } from '../helpers/towers'

let redTower: TowerRed
let enemyInstancesManager: EnemyInstancesManager

const createEnemyNearTheTower = () => {
  createNormalEnemy(enemyInstancesManager, null, 1)
  const enemy = enemyInstancesManager.getAll()[0]
  enemy.position = { x: 20, y: 20 }
  return enemy
}

beforeEach(() => {
  Missile.instances = []
  redTower = instantiateRedTower() as TowerRed
  enemyInstancesManager = new EnemyInstancesManager()
})

// the missiles are created in the update (not in the draw), so the recharge follows the game speed
describe('update of the red tower', () => {
  test('when there is no target, no missile is created', () => {
    for (let i = 0; i < TOWER_RED_MAX_TIME_RECHARGE * 3; i++) {
      redTower.update()
    }

    expect(Missile.instances).toHaveLength(0)
  })

  test('when there is a target but the tower is not charged yet, no missile is created', () => {
    redTower.selectTarget([createEnemyNearTheTower()])

    for (let i = 0; i < TOWER_RED_MAX_TIME_RECHARGE; i++) {
      redTower.update()
    }

    expect(Missile.instances).toHaveLength(0)
  })

  test('when there is a target and the tower is charged, a missile is created', () => {
    redTower.selectTarget([createEnemyNearTheTower()])

    for (let i = 0; i <= TOWER_RED_MAX_TIME_RECHARGE; i++) {
      redTower.update()
    }

    expect(Missile.instances).toHaveLength(1)
  })

  test('the tower keeps creating missiles every time it is charged', () => {
    redTower.selectTarget([createEnemyNearTheTower()])
    const updatesPerMissile = TOWER_RED_MAX_TIME_RECHARGE + 1

    for (let i = 0; i < updatesPerMissile * 3; i++) {
      redTower.update()
    }

    expect(Missile.instances).toHaveLength(3)
  })

  test('when the tower is upgrading, no missile is created', () => {
    redTower.selectTarget([createEnemyNearTheTower()])
    redTower.upgrade()

    for (let i = 0; i <= TOWER_RED_MAX_TIME_RECHARGE; i++) {
      redTower.update()
    }

    expect(Missile.instances).toHaveLength(0)
  })
})
