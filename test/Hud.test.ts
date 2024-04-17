import { Hud } from '../src/hud/Hud'
import { Position } from '../src/utils/types'

describe('isInsideButtonsBar', () => {
  test('when mouse is inside, return true', () => {
    const mousePosition: Position = { x: 320, y: 66 }

    const result = Hud.isInsideButtonsBar(mousePosition)

    expect(result).toBeTruthy()
  })
  test('when mouse is outside, return false', () => {
    const mousePosition: Position = { x: 320, y: 15 }

    const result = Hud.isInsideButtonsBar(mousePosition)

    expect(result).toBeFalsy()
  })
})

describe('isInsideTowersButtonsBar', () => {
  test('when mouse is inside, return true', () => {
    const mousePosition: Position = { x: 235, y: 56 }

    const result = Hud.isInsideTowersButtonsBar(mousePosition)

    expect(result).toBeTruthy()
  })
  test('when mouse is outside, return false', () => {
    const mousePosition: Position = { x: 560, y: 56 }

    const result = Hud.isInsideTowersButtonsBar(mousePosition)

    expect(result).toBeFalsy()
  })
})

describe('isInsideMagicsButtonsBar', () => {
  test('when mouse is inside, return true', () => {
    const mousePosition: Position = { x: 560, y: 56 }

    const result = Hud.isInsideMagicsButtonsBar(mousePosition)

    expect(result).toBeTruthy()
  })
  test('when mouse is outside, return false', () => {
    const mousePosition: Position = { x: 235, y: 56 }

    const result = Hud.isInsideMagicsButtonsBar(mousePosition)

    expect(result).toBeFalsy()
  })
})
