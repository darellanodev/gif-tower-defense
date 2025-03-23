import { Image } from 'p5'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { Button } from './Button'
import { TextProperties } from './TextProperties'
import { P5 } from '../utils/P5'

export class ButtonPage extends Button {
  #textPosition: Position
  #pageNumber: string
  constructor(
    position: Position,
    images: Image[],
    size: Size = { w: 48, h: 48 },
    offsetImages: Position = { x: 0, y: 0 },
    pageNumber: string,
  ) {
    super(position, size, images, offsetImages)
    this.#textPosition = position
    this.#textPosition.x += size.w / 2 + 1
    this.#textPosition.y += size.h / 2 + 4
    this.#pageNumber = pageNumber
  }

  drawOn() {
    super.drawOn()
    TextProperties.setForPageButtons()
    P5.p5.text(this.#pageNumber, this.#textPosition.x, this.#textPosition.y)
  }

  drawOff() {
    super.drawOff()
  }

  drawHover() {
    super.drawHover()
  }
}
