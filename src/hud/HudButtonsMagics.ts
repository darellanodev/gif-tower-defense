import { Position } from '../utils/types'
import { Image } from 'p5'
import { MagicFireball } from '../magics/MagicFireball'
import { MagicIceball } from '../magics/MagicIceball'
import { MagicUFO } from '../magics/MagicUFO'
import { ButtonMagic } from './ButtonMagic'
import { HudPanel } from './HudPanel'

export class HudButtonsMagics {
  static magicUFOButtonImages: Image[]
  static magicFireballButtonImages: Image[]
  static magicIceballButtonImages: Image[]

  static isInsideMagicsButtonsBar(position: Position) {
    if (HudPanel.isInsideButtonsBar(position) && position.x > 495) {
      return true
    }
    return false
  }

  static draw() {
    ButtonMagic.magicUFOButton.draw()
    ButtonMagic.magicFireballButton.draw()
    ButtonMagic.magicIceballButton.draw()
  }

  static _instantiateMagicFireball(
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

  static _instantiateMagicIceBall(
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

  static _instantiateMagicUFO(
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

  static handleMagicButtons(
    mousePosition: Position,
    magicIceballImage: Image,
    magicFireballImage: Image,
    magicUFOImages: Image[],
    initialEnemiesPosition: Position,
    orders: number[],
  ) {
    if (ButtonMagic.magicFireballButton.isMouseOver(mousePosition)) {
      HudButtonsMagics._instantiateMagicFireball(
        magicFireballImage,
        initialEnemiesPosition,
        orders,
      )
    }
    if (ButtonMagic.magicIceballButton.isMouseOver(mousePosition)) {
      HudButtonsMagics._instantiateMagicIceBall(
        magicIceballImage,
        initialEnemiesPosition,
        orders,
      )
    }
    if (ButtonMagic.magicUFOButton.isMouseOver(mousePosition)) {
      HudButtonsMagics._instantiateMagicUFO(
        magicUFOImages,
        initialEnemiesPosition,
        orders,
      )
    }
  }
}
