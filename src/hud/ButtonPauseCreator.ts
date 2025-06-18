import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { Images } from '../resources/Images'

export class ButtonPauseCreator extends Button {
  static initializePauseButton() {
    const position: Position = { x: 268, y: 30 }
    const size: Size = { w: 76, h: 24 }
    const offsetImages: Position = { x: 39, y: 4 }

    return new Button(position, size, Images.buttonPauseImages, offsetImages)
  }
}
