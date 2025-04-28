import { expect } from 'vitest'
import { Missile } from '../../src/towers/Missile'
import { instantiateMissile } from '../helpers/missile'

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

test('instances length, when instantiating 1 instance and updating instances 1000 times the missile collides with the enemy and missile is dead, return 0 instances', () => {
  instantiateMissile()
  for (let i = 0; i < 1000; i++) {
    Missile.updateInstances()
  }
  Missile.removeDeadInstances()
  const result = Missile.instances.length
  expect(result).toBe(0)
})
