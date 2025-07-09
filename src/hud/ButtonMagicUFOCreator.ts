import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { ButtonMagic } from './ButtonMagic'

export class ButtonMagicUFOCreator extends Button {
  static _initializeMagicUFOButton() {
    const position: Position = { x: 498, y: 28 }
    const size: Size = { w: 118, h: 50 }
    const offsetImages: Position = { x: 44, y: 3 }
    const offsetItems: Position = { x: 93, y: 47 }
    ButtonMagic.magicUFOButton = new Button(
      position,
      size,
      ButtonMagic.magicUFOButtonImages,
      offsetImages,
      ButtonMagic.magicTotalUFOItems,
      offsetItems,
    )
  }
}
