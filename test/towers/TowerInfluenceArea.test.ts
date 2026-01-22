import { describe, expect } from 'vitest'
import { instantiateGreenTower } from '../helpers/towers'
import { TOWER_GREEN_UPGRADE } from '../../src/constants/tower'

test('get influenceArea, when the instance is recently created, return the first upgrading influence area', () => {
  const towerGreen = instantiateGreenTower()

  const result = towerGreen.influenceArea

  const expected = TOWER_GREEN_UPGRADE.INFLUENCE_AREA[0]
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
