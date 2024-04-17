import { Image } from 'p5'
import { Position, Size } from '../utils/types'
import { P5 } from '../utils/P5'

export class Button {
  static INDEX_IMAGE_ON = 0
  static INDEX_IMAGE_OFF = 1

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

  isMouseOver(mousePosition: Position): boolean {
    let insideX = false
    let insideY = false
    if (
      mousePosition.x >= this.position.x &&
      mousePosition.x <= this.position.x + this.size.w
    ) {
      insideX = true
    }
    if (
      mousePosition.y >= this.position.y &&
      mousePosition.y <= this.position.y + this.size.h
    ) {
      insideY = true
    }
    if (insideX && insideY) {
      return true
    }
    return false
  }
}
