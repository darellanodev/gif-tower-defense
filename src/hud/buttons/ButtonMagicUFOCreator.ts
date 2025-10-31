import { Button } from './Button'
import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { Images } from '../../resources/Images'
import { HudButtonsMagics } from './HudButtonsMagics'

export class ButtonMagicUFOCreator extends Button {
  static _initializeMagicUFOButton() {
    const position: Position = { x: 498, y: 28 }
    const size: Size = { w: 118, h: 50 }
    const offsetImages: Position = { x: 44, y: 3 }
    const offsetItems: Position = { x: 93, y: 47 }
    const totalItems = 3
    HudButtonsMagics.magicUFOButton = new Button(
      position,
      size,
      Images.magicUFOButtonImages,
      offsetImages,
      totalItems,
      offsetItems,
    )
  }
}
