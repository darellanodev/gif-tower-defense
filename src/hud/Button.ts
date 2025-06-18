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
  static INDEX_IMAGE_CHECKED = 4
  static INDEX_IMAGE_CHECKED_HOVER = 5

  checked: boolean = false
  size: Size
  images: Image[]
  offsetImages: Position
  hasCheckedStates: boolean

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

    // Does this button have checked states? (Buttons with 6 components in the image array have checked states, such as the pause button.)
    this.hasCheckedStates = Array.isArray(images) && images.length >= 6
  }

  check() {
    this.checked = true
  }

  uncheck() {
    this.checked = false
  }

  draw() {
    if (this.isMouseInside({ x: P5.p5.mouseX, y: P5.p5.mouseY })) {
      this.drawHover()
    } else {
      this.drawOn()
    }
  }

  getStateDraw(mousePosition: Position) {
    if (this.isMouseInside({ x: mousePosition.x, y: mousePosition.y })) {
      return Button.INDEX_IMAGE_ON_HOVER
    }
    return Button.INDEX_IMAGE_ON
  }

  isMouseInside(mousePosition: Position): boolean {
    const isInsideX =
      mousePosition.x >= this.position.x &&
      mousePosition.x <= this.position.x + this.size.w
    const isInsideY =
      mousePosition.y >= this.position.y &&
      mousePosition.y <= this.position.y + this.size.h
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
  drawChecked() {
    this.drawState(Button.INDEX_IMAGE_CHECKED)
  }
  drawCheckedHover() {
    this.drawState(Button.INDEX_IMAGE_CHECKED_HOVER)
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
