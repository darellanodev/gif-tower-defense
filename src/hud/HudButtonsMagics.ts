import { Position } from '../utils/types'
import { Image } from 'p5'
import { MagicFireball } from '../magics/MagicFireball'
import { MagicIceball } from '../magics/MagicIceball'
import { MagicUFO } from '../magics/MagicUFO'
import { ButtonMagic } from './ButtonMagic'
import { MathUtils } from '../utils/MathUtils'

export class HudButtonsMagics {
  #magicUFOButtonImages: Image[]
  #magicFireballButtonImages: Image[]
  #magicIceballButtonImages: Image[]

  constructor(
    magicUFOButtonImages: Image[],
    magicFireballButtonImages: Image[],
    magicIceballButtonImages: Image[],
  ) {
    this.#magicUFOButtonImages = magicUFOButtonImages
    this.#magicFireballButtonImages = magicFireballButtonImages
    this.#magicIceballButtonImages = magicIceballButtonImages
  }

  #isInsideButtonsBar(position: Position) {
    const ButtonsBarRectanglePosition = { x: 0, y: 28 }
    const ButtonsBarRectangleSize = { w: 800, h: 50 }

    return MathUtils.isPositionInsideRectangle(
      position,
      ButtonsBarRectanglePosition,
      ButtonsBarRectangleSize,
    )
  }

  isInsideMagicsButtonsBar(position: Position) {
    if (this.#isInsideButtonsBar(position) && position.x > 495) {
      return true
    }
    return false
  }

  draw() {
    ButtonMagic.magicUFOButton.draw()
    ButtonMagic.magicFireballButton.draw()
    ButtonMagic.magicIceballButton.draw()
  }

  _instantiateMagicFireball(
    magicFireballImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
  ) {
    if (ButtonMagic.magicFireballButton.items === 0) {
      return
    }
    ButtonMagic.magicFireballButton.removeItem()
    MagicFireball.instantiate(
      magicFireballImage,
      initialEnemiesPosition,
      orders,
    )
  }

  _instantiateMagicIceBall(
    magicIceballImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
  ) {
    if (ButtonMagic.magicIceballButton.items === 0) {
      return
    }
    ButtonMagic.magicIceballButton.removeItem()
    MagicIceball.instantiate(
      magicIceballImage,
      { x: initialEnemiesPosition.x, y: initialEnemiesPosition.y },
      orders,
    )
  }

  _instantiateMagicUFO(
    magicUFOImages: Image[],
    initialEnemiesPosition: Position,
    orders: number[],
  ) {
    if (ButtonMagic.magicUFOButton.items === 0) {
      return
    }
    ButtonMagic.magicUFOButton.removeItem()
    MagicUFO.instantiate(
      magicUFOImages,
      { x: initialEnemiesPosition.x, y: initialEnemiesPosition.y },
      orders,
    )
  }

  handleMagicButtons(
    mousePosition: Position,
    magicIceballImage: Image,
    magicFireballImage: Image,
    magicUFOImages: Image[],
    initialEnemiesPosition: Position,
    orders: number[],
  ) {
    if (ButtonMagic.magicFireballButton.isMouseOver(mousePosition)) {
      this._instantiateMagicFireball(
        magicFireballImage,
        initialEnemiesPosition,
        orders,
      )
    }
    if (ButtonMagic.magicIceballButton.isMouseOver(mousePosition)) {
      this._instantiateMagicIceBall(
        magicIceballImage,
        initialEnemiesPosition,
        orders,
      )
    }
    if (ButtonMagic.magicUFOButton.isMouseOver(mousePosition)) {
      this._instantiateMagicUFO(magicUFOImages, initialEnemiesPosition, orders)
    }
  }
}
