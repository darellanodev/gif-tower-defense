import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { ButtonMagic } from './ButtonMagic'

export class ButtonMagicFireballCreator extends Button {
  static _initializeMagicFireballButton() {
    const position: Position = { x: 616, y: 28 }
    const size: Size = { w: 78, h: 50 }
    const offsetImages: Position = { x: 20, y: 3 }
    const offsetItems: Position = { x: 64, y: 47 }
    ButtonMagic.magicFireballButton = new Button(
      position,
      size,
      ButtonMagic.magicFireballButtonImages,
      offsetImages,
      ButtonMagic.magicTotalFireballItems,
      offsetItems,
    )
  }
}
