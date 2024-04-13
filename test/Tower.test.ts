import { TileOrange } from '../src/tiles/TileOrange'
import { Tower } from '../src/towers/Tower'
import { TowerGreen } from '../src/towers/TowerGreen'
import { TowerRed } from '../src/towers/TowerRed'
import { TowerYellow } from '../src/towers/TowerYellow'
import { Position, TowerType } from '../src/utils/types'

const instantiateGreenTower = () => {
  const position: Position = { x: 10, y: 20 }
  return TowerGreen.instantiate(position)
}
const instantiateRedTower = () => {
  const position: Position = { x: 10, y: 20 }
  return TowerRed.instantiate(position)
}
const instantiateYellowTower = () => {
  const img: any = null
  const OrangeTilePosition: Position = { x: 100, y: 200 }
  const orangeTile = new TileOrange(img, OrangeTilePosition)

  const towerYellowPosition: Position = { x: 10, y: 20 }
  return TowerYellow.instantiate(towerYellowPosition, orangeTile)
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

describe('get type', () => {
  test('when is a green tower, returns TowerGreen.ID', () => {
    const towerGreen = instantiateGreenTower()
    const result = towerGreen.type
    expect(result).toBe(TowerGreen.ID)
  })

  test('when is a red tower, returns TowerRed.ID', () => {
    const towerRed = instantiateRedTower()
    const result = towerRed.type
    expect(result).toBe(TowerRed.ID)
  })

  test('when is a yellow tower, returns TowerYellow.ID', () => {
    const towerYellow = instantiateYellowTower()
    const result = towerYellow.type
    expect(result).toBe(TowerYellow.ID)
  })
})

describe('isDistanceIntoInfluenceArea', () => {
  test('when is a GreenTower and distance = 45 and upgrade influence area is 150, return true (45 <= 150 / 1.65)', () => {
    const towerGreen = instantiateGreenTower()
    const result = towerGreen.isDistanceIntoInfluenceArea(45)
    expect(result).toBeTruthy()
  })
  test('when is a GreenTower and distance = 150 and upgrade influence area is 150, return false (150 <= 150 / 1.65)', () => {
    const towerGreen = instantiateGreenTower()
    const result = towerGreen.isDistanceIntoInfluenceArea(150)
    expect(result).toBeFalsy()
  })
})
