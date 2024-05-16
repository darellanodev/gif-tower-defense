import { HudButtonsTowers } from '../src/hud/HudButtonsTowers'
import { Position } from '../src/utils/types'

const instantiateHudButtonsTowers = () => {
  const greenTowerButtonImages: any[] = [null, null, null]
  const redTowerButtonImages: any[] = [null, null, null]
  const yellowTowerButtonImages: any[] = [null, null, null]

  return new HudButtonsTowers(
    greenTowerButtonImages,
    redTowerButtonImages,
    yellowTowerButtonImages,
  )
}

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
