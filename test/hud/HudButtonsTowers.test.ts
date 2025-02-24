import { describe, expect } from 'vitest'
import { Position } from '../../src/types/position'
import { instantiateHudButtonsTowers } from '../helpers/buttonsTowers'

describe('isInsideTowersButtonsBar', () => {
  test('when mouse is inside, return true', () => {
    const hudButtonsTowers = instantiateHudButtonsTowers()
    const mousePosition: Position = { x: 235, y: 56 }

    const result = hudButtonsTowers.isInsideTowersButtonsBar(mousePosition)

    expect(result).toBeTruthy()
  })
  test('when mouse is outside, return false', () => {
    const hudButtonsTowers = instantiateHudButtonsTowers()
    const mousePosition: Position = { x: 560, y: 56 }

    const result = hudButtonsTowers.isInsideTowersButtonsBar(mousePosition)

    expect(result).toBeFalsy()
  })
})
