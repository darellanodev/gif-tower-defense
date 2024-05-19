import { ButtonMagic } from '../../src/hud/ButtonMagic'
import { HudButtonsMagics } from '../../src/hud/HudButtonsMagics'
import { Position, Size } from '../../src/utils/types'
import {
  images,
  img,
  magicFireballButtonImages,
  magicIceballButtonImages,
  magicUFOButtonImages,
} from './imagesResources'

export const createMagicButton = () => {
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

export const initializeAllMagicButtons = () => {
  ButtonMagic.setImages(
    magicUFOButtonImages,
    magicFireballButtonImages,
    magicIceballButtonImages,
  )

  ButtonMagic.initializeButtons()
}

export const clickMagicUFO = () => {
  const mousePositionInsideMagicUFO: Position = { x: 560, y: 60 }
  const initialEnemiesPosition: Position = { x: 0, y: 0 }
  const orders: number[] = [1, 1, 1, 1]
  const hudButtonsMagics = createHudButtonsMagics()

  hudButtonsMagics.handleMagicButtons(
    mousePositionInsideMagicUFO,
    img,
    img,
    images,
    initialEnemiesPosition,
    orders,
  )
}

const createHudButtonsMagics = () => {
  return new HudButtonsMagics(
    magicUFOButtonImages,
    magicFireballButtonImages,
    magicIceballButtonImages,
  )
}