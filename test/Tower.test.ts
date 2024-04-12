import { Tower } from '../src/towers/Tower'
import { TowerGreen } from '../src/towers/TowerGreen'
import { Position, TowerType } from '../src/utils/types'

test('upgradeIncrement, when the instance is recently created, return the expected value', () => {
  const position: Position = { x: 10, y: 20 }
  const towerGreen = TowerGreen.instantiate(position)

  const result = towerGreen.upgradeIncrement

  const expected = Tower.UPGRADE_INCREMENT / (towerGreen.upgradeLevel + 1)
  expect(result).toBe(expected)
})

test('get influenceArea, when the instance is recently created, return the first upgrading influence area', () => {
  const position: Position = { x: 10, y: 20 }
  const towerGreen = TowerGreen.instantiate(position)

  const result = towerGreen.influenceArea

  const expected = TowerGreen.UPGRADE_INFLUENCE_AREA[0]
  expect(result).toBe(expected)
})

const upgradeTowerNTimes = (tower: TowerType, nTimes: number) => {
  Tower.INSTANT_UPGRADING = true
  for (let index = 0; index < nTimes; index++) {
    tower.upgrade()
    tower.update()
  }
  Tower.INSTANT_UPGRADING = false
}

test('get upgradeLevel, when the tower is upgraded 3 times, return 3', () => {
  const position: Position = { x: 10, y: 20 }
  const towerGreen = TowerGreen.instantiate(position)

  upgradeTowerNTimes(towerGreen, 3)

  const result = towerGreen.upgradeLevel
  expect(result).toBe(3)
})

test('get upgradeLevel, when the tower is upgraded 5 times, return 5', () => {
  const position: Position = { x: 10, y: 20 }
  const towerGreen = TowerGreen.instantiate(position)

  upgradeTowerNTimes(towerGreen, 5)

  const result = towerGreen.upgradeLevel
  expect(result).toBe(5)
})

test('get isMaxUpgraded, when the tower is upgraded 3 times, return false', () => {
  const position: Position = { x: 10, y: 20 }
  const towerGreen = TowerGreen.instantiate(position)

  upgradeTowerNTimes(towerGreen, 3)

  const result = towerGreen.isMaxUpgraded
  expect(result).toBeFalsy()
})

test('get isMaxUpgraded, when the tower is upgraded 5 times, return true', () => {
  const position: Position = { x: 10, y: 20 }
  const towerGreen = TowerGreen.instantiate(position)

  upgradeTowerNTimes(towerGreen, 5)

  const result = towerGreen.isMaxUpgraded
  expect(result).toBeTruthy()
})
