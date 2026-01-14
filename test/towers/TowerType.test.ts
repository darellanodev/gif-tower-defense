import { describe, expect } from 'vitest'
import { TowerRed } from '../../src/towers/TowerRed'
import { TowerYellow } from '../../src/towers/TowerYellow'
import {
  instantiateGreenTower,
  instantiateRedTower,
  instantiateYellowTower,
} from '../helpers/towers'
import { TOWER_ID } from '../../src/constants/tower'

describe('get type', () => {
  test('when is a green tower, returns TOWER_ID.GREEN', () => {
    const towerGreen = instantiateGreenTower()
    const result = towerGreen.type
    expect(result).toBe(TOWER_ID.GREEN)
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
