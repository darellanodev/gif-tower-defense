import { ButtonMagic } from '../src/buttons/ButtonMagic'
import { Position, Size } from '../src/utils/types'

test('isMouseOver, if mouse is inside the button, return true', () => {
  const images: any[] = [null, null]
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const offsetImages: Position = { x: 0, y: 0 }
  const totalItems: number = 3
  const buttonMagic = new ButtonMagic(
    buttonPosition,
    buttonSize,
    images,
    offsetImages,
    totalItems,
  )
  const mousePosition: Position = { x: 120, y: 120 }

  const result = buttonMagic.isMouseOver(mousePosition)

  expect(result).toBeTruthy()
})
