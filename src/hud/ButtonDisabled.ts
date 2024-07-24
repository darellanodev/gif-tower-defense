import { Image } from 'p5'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { Button } from './Button'

export class ButtonDisabled extends Button {
  constructor(
    position: Position,
    size: Size,
    images: Image[],
    offsetImages: Position = { x: 0, y: 0 },
  ) {
    super(position, size, images, offsetImages)
  }

  draw() {
    this.drawOff()
  }
}
