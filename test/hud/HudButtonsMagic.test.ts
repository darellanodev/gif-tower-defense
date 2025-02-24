import { describe, expect } from 'vitest'
import { Position } from '../../src/types/position'
import { instantiateHudButtonsMagics } from '../helpers/buttonsMagics'

describe('isInsideMagicsButtonsBar', () => {
  test('when mouse is inside, return true', () => {
    const hudButtonsMagic = instantiateHudButtonsMagics()
    const mousePosition: Position = { x: 560, y: 56 }

    const result = hudButtonsMagic.isInsideMagicsButtonsBar(mousePosition)

    expect(result).toBeTruthy()
  })
  test('when mouse is outside, return false', () => {
    const hudButtonsMagic = instantiateHudButtonsMagics()
    const mousePosition: Position = { x: 235, y: 56 }

    const result = hudButtonsMagic.isInsideMagicsButtonsBar(mousePosition)

    expect(result).toBeFalsy()
  })
})
