import { expect } from 'vitest'
import { Missile } from '../../src/towers/Missile'
import { instantiateMissile } from '../helpers/missile'
import { EnemyInstancesManager } from '../../src/enemies/EnemyInstancesManager'
import { createNormalEnemy } from '../helpers/enemyCreator'
import { TOWER_RED_UPGRADE } from '../../src/constants/tower'

test('alive, when the missile is recently created, return true', () => {
  instantiateMissile()
  const result = Missile.instances[0].isAlive
  expect(result).toBeTruthy()
})

test('alive, when updating instances 1000 times the missile collides with the enemy, return false', () => {
  instantiateMissile()
  for (let i = 0; i < 1000; i++) {
    Missile.updateInstances()
  }
  const result = Missile.instances[0].isAlive
  expect(result).toBeFalsy()
})

test('instances length, when instantiating 1 instance and updating instances 1000 times the missile collides with the enemy and missile is dead, return 0 instances', () => {
  instantiateMissile()
  for (let i = 0; i < 1000; i++) {
    Missile.updateInstances()
  }
  Missile.removeDeadInstances()
  const result = Missile.instances.length
  expect(result).toBe(0)
})

test('damage, when the missile has hit and the instances are updated again before removing it, the enemy is damaged only once', () => {
  const enemyInstancesManager = new EnemyInstancesManager()
  createNormalEnemy(enemyInstancesManager, null, 20)
  const enemy = enemyInstancesManager.getAll()[0]
  Missile.instances = [
    new Missile({ x: 100, y: 200 }, enemy, TOWER_RED_UPGRADE.DAMAGE[0]),
  ]
  while (Missile.instances[0].isAlive) {
    Missile.updateInstances()
  }
  const damageAfterHit = enemy.damage

  Missile.updateInstances()
  Missile.updateInstances()

  expect(enemy.damage).toBe(damageAfterHit)
})
