import { ButtonMagic } from '../../src/hud/ButtonMagic'
import { MagicUFO } from '../../src/magics/MagicUFO'
import { Position } from '../../src/types/position'
import {
  clickMagicUFO,
  createMagicButton,
  initializeAllMagicButtons,
} from '../helpers/magicButtons'
import { clearMagicUFOInstances } from '../helpers/magicUFO'

test('isMouseOver, if mouse is inside the button, return true', () => {
  const buttonMagic = createMagicButton()
  const mousePosition: Position = { x: 120, y: 120 }

  const result = buttonMagic.isMouseOver(mousePosition)

  expect(result).toBeTruthy()
})

test('get items, when there is 3 magic ufos and click, return 2', () => {
  initializeAllMagicButtons()
  clickMagicUFO()

  const actual = ButtonMagic.magicUFOButton.items
  expect(actual).toBe(2)
})

test('count instances, when there is 3 magic ufos and click 5 times, return 3', () => {
  clearMagicUFOInstances()
  initializeAllMagicButtons()
  for (let index = 0; index < 5; index++) {
    clickMagicUFO()
  }
  const actual = MagicUFO.instances.length

  expect(actual).toBe(3)
})
