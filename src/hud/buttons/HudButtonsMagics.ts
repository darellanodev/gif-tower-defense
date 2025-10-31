import { Position } from '../../types/position'
import { Image } from 'p5'
import { MagicFireball } from '../../magics/MagicFireball'
import { MagicIceball } from '../../magics/MagicIceball'
import { PositionUtils } from '../../utils/PositionUtils'
import { MagicFireballCreator } from '../../magics/MagicFireballCreator'
import { MagicIceballCreator } from '../../magics/MagicIceballCreator'
import { MagicUFOCreator } from '../../magics/MagicUFOCreator'
import { MagicInstancesManager } from '../../magics/MagicInstancesManager'
import { Button } from './Button'
import { ButtonMagicUFOCreator } from './ButtonMagicUFOCreator'
import { ButtonMagicFireballCreator } from './ButtonMagicFireballCreator'
import { ButtonMagicIceballCreator } from './ButtonMagicIceballCreator'

export class HudButtonsMagics {
  static magicFireballButton: Button
  static magicIceballButton: Button
  static magicUFOButton: Button

  static _initializeMagicButtons() {
    ButtonMagicUFOCreator._initializeMagicUFOButton()
    ButtonMagicFireballCreator._initializeMagicFireballButton()
    ButtonMagicIceballCreator._initializeMagicIceballButton()
  }

  static initializeButtons() {
    HudButtonsMagics._initializeMagicButtons()
  }

  #isInsideButtonsBar(position: Position) {
    const ButtonsBarRectanglePosition = { x: 0, y: 28 }
    const ButtonsBarRectangleSize = { w: 800, h: 50 }

    return PositionUtils.isInsideRectangle(
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
    HudButtonsMagics.magicUFOButton.draw()
    HudButtonsMagics.magicFireballButton.draw()
    HudButtonsMagics.magicIceballButton.draw()
  }

  _instantiateMagicFireball(
    magicFireballImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
    magicInstancesManager: MagicInstancesManager,
  ) {
    if (HudButtonsMagics.magicFireballButton.items === 0) {
      return
    }
    HudButtonsMagics.magicFireballButton.removeItem()

    const magicFireballCreator = MagicFireballCreator.getInstance(
      magicInstancesManager,
      magicFireballImage,
      initialEnemiesPosition,
      orders,
      MagicFireball.SPEED,
    )
    magicFireballCreator.create()
  }

  _instantiateMagicIceBall(
    magicIceballImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
    magicInstancesManager: MagicInstancesManager,
  ) {
    if (HudButtonsMagics.magicIceballButton.items === 0) {
      return
    }
    HudButtonsMagics.magicIceballButton.removeItem()

    const magicIceballCreator = MagicIceballCreator.getInstance(
      magicInstancesManager,
      magicIceballImage,
      initialEnemiesPosition,
      orders,
      MagicIceball.SPEED,
    )
    magicIceballCreator.create()
  }

  _instantiateMagicUFO(
    magicUFOImages: Image[],
    initialEnemiesPosition: Position,
    magicUFOInstancesManager: MagicInstancesManager,
  ) {
    if (HudButtonsMagics.magicUFOButton.items === 0) {
      return
    }
    HudButtonsMagics.magicUFOButton.removeItem()

    const magicUFOCreator = MagicUFOCreator.getInstance(
      magicUFOImages,
      initialEnemiesPosition,
      magicUFOInstancesManager,
    )

    magicUFOCreator.create()
  }

  handleMagicButtons(
    mousePosition: Position,
    magicIceballImage: Image,
    magicFireballImage: Image,
    magicUFOImages: Image[],
    initialEnemiesPosition: Position,
    orders: number[],
    magicFireballInstancesManager: MagicInstancesManager,
    magicIceballInstancesManager: MagicInstancesManager,
    magicUFOInstancesManager: MagicInstancesManager,
  ) {
    if (HudButtonsMagics.magicFireballButton.isMouseOver(mousePosition)) {
      this._instantiateMagicFireball(
        magicFireballImage,
        initialEnemiesPosition,
        orders,
        magicFireballInstancesManager,
      )
    }
    if (HudButtonsMagics.magicIceballButton.isMouseOver(mousePosition)) {
      this._instantiateMagicIceBall(
        magicIceballImage,
        initialEnemiesPosition,
        orders,
        magicIceballInstancesManager,
      )
    }
    if (HudButtonsMagics.magicUFOButton.isMouseOver(mousePosition)) {
      this._instantiateMagicUFO(
        magicUFOImages,
        initialEnemiesPosition,
        magicUFOInstancesManager,
      )
    }
  }
}
