import { Image } from 'p5'
import { Position, Size } from '../utils/types'
import { P5 } from '../utils/P5'
import { MathUtils } from '../utils/MathUtils'

export class Button {
  static INDEX_IMAGE_ON = 0
  static INDEX_IMAGE_OFF = 1
  static INDEX_IMAGE_HOVER = 2

  position: Position
  size: Size
  images: Image[]
  offsetImages: Position
  constructor(
    position: Position,
    size: Size,
    images: Image[],
    offsetImages: Position = { x: 0, y: 0 },
  ) {
    this.position = { ...position }
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

  drawON() {
    P5.p5.image(
      this.images[Button.INDEX_IMAGE_ON],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )
  }
  drawOFF() {
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
    return MathUtils.isPositionInsideRectangle(
      mousePosition,
      this.position,
      this.size,
    )
  }
}
