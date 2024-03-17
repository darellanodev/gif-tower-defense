import { Hud } from '../src/Hud'

describe('isInsideTowersButtonsBar', () => {
  test('when mouse is inside, return true', () => {
    const posMouseX = 235
    const posMouseY = 56

    const result = Hud.isInsideTowersButtonsBar(posMouseX, posMouseY)

    expect(result).toBeTruthy
  })
  test('when mouse is outside, return false', () => {
    const posMouseX = 560
    const posMouseY = 56

    const result = Hud.isInsideTowersButtonsBar(posMouseX, posMouseY)

    expect(result).toBeFalsy
  })
})
