import { Image } from 'p5'
import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { Button } from './Button'
import { TextProperties } from '../TextProperties'
import { P5 } from '../../utils/P5'

export class ButtonPage extends Button {
  #textPosition: Position
  #label: string
  #textProperties: TextProperties

  constructor(
    position: Position,
    images: Image[],
    size: Size = { w: 48, h: 48 },
    offsetImages: Position = { x: 0, y: 0 },
    label: string,
  ) {
    super(position, size, images, offsetImages)
    this.#textPosition = position
    this.#textPosition.x += size.w / 2 + 1
    this.#textPosition.y += size.h / 2 + 4
    this.#label = label
    this.#textProperties = new TextProperties()
  }

  drawOn() {
    super.drawOn()
    this.#textProperties.setForPageButtons()
    P5.p5.text(this.#label, this.#textPosition.x, this.#textPosition.y)
  }

  drawOff() {
    super.drawOff()
    this.#textProperties.setForPageButtons()
    P5.p5.text(this.#label, this.#textPosition.x, this.#textPosition.y)
  }

  drawOnHover() {
    super.drawOnHover()
    this.#textProperties.setForPageButtons()
    P5.p5.text(this.#label, this.#textPosition.x, this.#textPosition.y)
  }

  get label() {
    return this.#label
  }
}
