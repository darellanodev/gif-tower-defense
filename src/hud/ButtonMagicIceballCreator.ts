import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { ButtonMagic } from './ButtonMagic'
import { Images } from '../resources/Images'

export class ButtonMagicIceballCreator extends Button {
  static _initializeMagicIceballButton() {
    const position: Position = { x: 692, y: 28 }
    const size: Size = { w: 103, h: 50 }
    const offsetImages: Position = { x: 33, y: 3 }
    const offsetItems: Position = { x: 77, y: 47 }
    const totalItems = 2
    ButtonMagic.magicIceballButton = new Button(
      position,
      size,
      Images.magicIceballButtonImages,
      offsetImages,
      totalItems,
      offsetItems,
    )
  }
}
