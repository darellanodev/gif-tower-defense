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
  static INDEX_IMAGE_ON_HOVER = 3

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
    if (this.isMouseOver({ x: P5.p5.mouseX, y: P5.p5.mouseY })) {
      this.drawHover()
    } else {
      this.drawOn()
    }
  }

  isMouseInside(mousePosition: Position): boolean {
    const isInsideX =
      mousePosition.x >= this.position.x &&
      mousePosition.x <= this.position.x + this.size.w
    const isInsideY =
      mousePosition.y >= this.position.y &&
      mousePosition.y <= this.position.y + this.size.w
    return isInsideX && isInsideY
  }

  drawOn() {
    this.drawState(Button.INDEX_IMAGE_ON)
  }
  drawOff() {
    this.drawState(Button.INDEX_IMAGE_OFF)
  }
  drawHover() {
    this.drawState(Button.INDEX_IMAGE_HOVER)
  }
  drawOnHover() {
    this.drawState(Button.INDEX_IMAGE_ON_HOVER)
  }

  drawState(state: number) {
    P5.p5.image(
      this.images[state],
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
