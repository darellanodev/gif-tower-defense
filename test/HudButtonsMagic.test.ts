import { HudButtonsMagics } from '../src/hud/HudButtonsMagics'
import { Position } from '../src/utils/types'

const instantiateHudButtonsMagics = () => {
  const magicUFOButtonImages: any[] = [null, null, null]
  const magicFireballButtonImages: any[] = [null, null, null]
  const magicIceballTowerButtonImages: any[] = [null, null, null]

  return new HudButtonsMagics(
    magicUFOButtonImages,
    magicFireballButtonImages,
    magicIceballTowerButtonImages,
  )
}

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
