import { expect } from 'vitest'
import { Tower } from '../../src/towers/Tower'
import { instantiateGreenTower, upgradeTowerNTimes } from '../helpers/towers'

test('get upgradeIncrement, when the instance is recently created, return the expected value', () => {
  const towerGreen = instantiateGreenTower()
  const result = towerGreen.upgradeIncrement
  const expected = Tower.UPGRADE_INCREMENT / (towerGreen.upgradeLevel + 1)
  expect(result).toBe(expected)
})

test('get upgradeLevel, when the tower is upgraded 3 times, return 3', () => {
  const towerGreen = instantiateGreenTower()
  upgradeTowerNTimes(towerGreen, 3)
  const result = towerGreen.upgradeLevel
  expect(result).toBe(3)
})

test('get upgradeLevel, when the tower is upgraded 5 times, return 5', () => {
  const towerGreen = instantiateGreenTower()
  upgradeTowerNTimes(towerGreen, 5)
  const result = towerGreen.upgradeLevel
  expect(result).toBe(5)
})

test('get isMaxUpgraded, when the tower is upgraded 3 times, return false', () => {
  const towerGreen = instantiateGreenTower()
  upgradeTowerNTimes(towerGreen, 3)
  const result = towerGreen.isMaxUpgraded
  expect(result).toBeFalsy()
})

test('get isMaxUpgraded, when the tower is upgraded 5 times, return true', () => {
  const towerGreen = instantiateGreenTower()
  upgradeTowerNTimes(towerGreen, 5)
  const result = towerGreen.isMaxUpgraded
  expect(result).toBeTruthy()
})
