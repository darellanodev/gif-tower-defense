import { Tower } from '../src/towers/Tower'
import { TowerGreen } from '../src/towers/TowerGreen'
import { Position, TowerType } from '../src/utils/types'

const instantiateGreenTower = () => {
  const position: Position = { x: 10, y: 20 }
  return TowerGreen.instantiate(position)
}

test('upgradeIncrement, when the instance is recently created, return the expected value', () => {
  const towerGreen = instantiateGreenTower()

  const result = towerGreen.upgradeIncrement

  const expected = Tower.UPGRADE_INCREMENT / (towerGreen.upgradeLevel + 1)
  expect(result).toBe(expected)
})

test('get influenceArea, when the instance is recently created, return the first upgrading influence area', () => {
  const towerGreen = instantiateGreenTower()

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
