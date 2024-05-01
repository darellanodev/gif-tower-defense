import { Enemy } from '../src/enemies/Enemy'
import { Missile } from '../src/towers/Missile'
import { TowerRed } from '../src/towers/TowerRed'
import { instantiateNormalEnemy } from './helpers/enemy'

const instantiateMissile = () => {
  instantiateNormalEnemy()
  Missile.instances = []
  const position = { x: 100, y: 200 }
  Missile.instances.push(
    new Missile(position, Enemy.instances[0], TowerRed.DAMAGE_UPGRADE[0]),
  )
}

test('alive, when the missile is recently created, return true', () => {
  instantiateMissile()
  const result = Missile.instances[0].alive
  expect(result).toBeTruthy()
})

test('alive, when updating instances 1000 times the missile collides with the enemy, return false', () => {
  instantiateMissile()
  for (let i = 0; i < 1000; i++) {
    Missile.updateInstances()
  }
  const result = Missile.instances[0].alive
  expect(result).toBeFalsy()
})

test('instances lenght, when instantiating 1 instance and updating instances 1000 times the missile collides with the enemy and missile is dead, return 0 instances', () => {
  instantiateMissile()
  for (let i = 0; i < 1000; i++) {
    Missile.updateInstances()
  }
  Missile.removeDeadInstances()
  const result = Missile.instances.length
  expect(result).toBe(0)
})
