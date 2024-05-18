import { TowerGreen } from '../src/towers/TowerGreen'
import { instantiateGreenTower } from './helpers/towers'

test('get influenceArea, when the instance is recently created, return the first upgrading influence area', () => {
  const towerGreen = instantiateGreenTower()

  const result = towerGreen.influenceArea

  const expected = TowerGreen.UPGRADE_INFLUENCE_AREA[0]
  expect(result).toBe(expected)
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
