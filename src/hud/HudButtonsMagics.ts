import { Position } from '../types/position'
import { Image } from 'p5'
import { MagicFireball } from '../magics/MagicFireball'
import { MagicIceball } from '../magics/MagicIceball'
import { ButtonMagic } from './ButtonMagic'
import { PositionUtils } from '../utils/PositionUtils'
import { MagicFireballCreator } from '../magics/MagicFireballCreator'
import { MagicIceballCreator } from '../magics/MagicIceballCreator'
import { MagicUFOCreator } from '../magics/MagicUFOCreator'
import { MagicInstancesManager } from '../magics/MagicInstancesManager'

export class HudButtonsMagics {
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
    ButtonMagic.magicUFOButton.draw()
    ButtonMagic.magicFireballButton.draw()
    ButtonMagic.magicIceballButton.draw()
  }

  _instantiateMagicFireball(
    magicFireballImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
    magicInstancesManager: MagicInstancesManager,
  ) {
    if (ButtonMagic.magicFireballButton.items === 0) {
      return
    }
    ButtonMagic.magicFireballButton.removeItem()

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
    if (ButtonMagic.magicIceballButton.items === 0) {
      return
    }
    ButtonMagic.magicIceballButton.removeItem()

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
    if (ButtonMagic.magicUFOButton.items === 0) {
      return
    }
    ButtonMagic.magicUFOButton.removeItem()

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
    if (ButtonMagic.magicFireballButton.isMouseOver(mousePosition)) {
      this._instantiateMagicFireball(
        magicFireballImage,
        initialEnemiesPosition,
        orders,
        magicFireballInstancesManager,
      )
    }
    if (ButtonMagic.magicIceballButton.isMouseOver(mousePosition)) {
      this._instantiateMagicIceBall(
        magicIceballImage,
        initialEnemiesPosition,
        orders,
        magicIceballInstancesManager,
      )
    }
    if (ButtonMagic.magicUFOButton.isMouseOver(mousePosition)) {
      this._instantiateMagicUFO(
        magicUFOImages,
        initialEnemiesPosition,
        magicUFOInstancesManager,
      )
    }
  }
}
