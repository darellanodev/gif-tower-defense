import { Image } from 'p5'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'
import { PositionUtils } from '../utils/PositionUtils'

export class Button extends Obj {
  static INDEX_IMAGE_ON = 0
  static INDEX_IMAGE_OFF = 1
  static INDEX_IMAGE_HOVER = 2

  size: Size
  images: Image[]
  offsetImages: Position
  constructor(
    position: Position,
    size: Size,
    images: Image[],
    offsetImages: Position = { x: 0, y: 0 },
  ) {
    super(position)

    this.size = { ...size }
    this.images = images
    this.offsetImages = { ...offsetImages }
  }

  draw() {
    P5.p5.image(
      this.images[Button.INDEX_IMAGE_ON],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )
  }

  drawOn() {
    P5.p5.image(
      this.images[Button.INDEX_IMAGE_ON],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )
  }
  drawOff() {
    P5.p5.image(
      this.images[Button.INDEX_IMAGE_OFF],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )
  }
  drawHover() {
    P5.p5.image(
      this.images[Button.INDEX_IMAGE_HOVER],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )
  }

  isMouseOver(mousePosition: Position): boolean {
    return PositionUtils.isInsideRectangle(
      mousePosition,
      this.position,
      this.size,
    )
  }
}
