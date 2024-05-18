import { ButtonMagic } from '../src/hud/ButtonMagic'
import { HudButtonsMagics } from '../src/hud/HudButtonsMagics'
import { MagicUFO } from '../src/magics/MagicUFO'
import { Position, Size } from '../src/utils/types'
import {
  images,
  img,
  magicFireballButtonImages,
  magicIceballButtonImages,
  magicUFOButtonImages,
} from './helpers/imagesResources'

const initializeMagicInstances = () => {
  MagicUFO.instances = []
}

const createMagicButton = () => {
  const buttonPosition: Position = { x: 100, y: 100 }
  const buttonSize: Size = { w: 100, h: 200 }
  const offsetImages: Position = { x: 0, y: 0 }
  const totalItems: number = 3
  return new ButtonMagic(
    buttonPosition,
    buttonSize,
    images,
    offsetImages,
    totalItems,
  )
}

const initializeAllMagicButtons = () => {
  ButtonMagic.setImages(
    magicUFOButtonImages,
    magicFireballButtonImages,
    magicIceballButtonImages,
  )

  ButtonMagic.initializeButtons()
}

const clickMagicUFO = () => {
  const mousePositionInsideMagicUFO: Position = { x: 560, y: 60 }
  const initialEnemiesPosition: Position = { x: 0, y: 0 }
  const orders: number[] = [1, 1, 1, 1]

  const hudButtonsMagics = new HudButtonsMagics(
    magicUFOButtonImages,
    magicFireballButtonImages,
    magicIceballButtonImages,
  )

  hudButtonsMagics.handleMagicButtons(
    mousePositionInsideMagicUFO,
    img,
    img,
    images,
    initialEnemiesPosition,
    orders,
  )
}

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
  initializeMagicInstances()
  initializeAllMagicButtons()
  for (let index = 0; index < 5; index++) {
    clickMagicUFO()
  }
  const actual = MagicUFO.instances.length

  expect(actual).toBe(3)
})
