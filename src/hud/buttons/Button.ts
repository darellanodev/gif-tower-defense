import { Image } from 'p5'
import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { P5 } from '../../utils/P5'
import { Obj } from '../../Obj'
import { PositionInsideRectangle } from '../../utils/PositionInsideRectangle'
import { BUTTON_INDEX_IMAGE } from '../../constants/button'

export class Button extends Obj {
  isChecked: boolean = false
  size: Size
  images: (Image | null)[]
  offsetImages: Position
  hasCheckedStates: boolean
  hasItems: boolean = false
  on: boolean = true
  #totalItems: number
  #offsetItems: Position
  #positionInsideRectangle: PositionInsideRectangle

  constructor(
    position: Position,
    size: Size,
    images: (Image | null)[],
    offsetImages: Position = { x: 0, y: 0 },
    totalItems: number = 0,
    offsetItems: Position = { x: 0, y: 0 },
  ) {
    super(position)

    this.size = { ...size }
    this.images = images
    this.offsetImages = { ...offsetImages }

    // Does this button have checked states? (Buttons with 6 components in the image array have checked states, such as the pause button.)
    this.hasCheckedStates = Array.isArray(images) && images.length >= 6

    // Buttons with items (like magic buttons)
    this.#totalItems = totalItems
    this.#offsetItems = offsetItems

    if (this.#totalItems > 0) {
      this.hasItems = true
    }

    this.#positionInsideRectangle = new PositionInsideRectangle()
  }

  removeItem() {
    this.#totalItems--
  }

  get items() {
    return this.#totalItems
  }

  check() {
    this.isChecked = true
  }

  uncheck() {
    this.isChecked = false
  }

  #drawButtonImage() {
    switch (this.getStateDraw({ x: P5.p5.mouseX, y: P5.p5.mouseY })) {
      case BUTTON_INDEX_IMAGE.ON:
        this.drawOn()
        break
      case BUTTON_INDEX_IMAGE.OFF:
        this.drawOff()
        break
      case BUTTON_INDEX_IMAGE.ON_HOVER:
        this.drawOnHover()
        break
      case BUTTON_INDEX_IMAGE.OFF_HOVER:
        this.drawOffHover()
        break
      case BUTTON_INDEX_IMAGE.CHECKED:
        this.drawChecked()
        break
      case BUTTON_INDEX_IMAGE.CHECKED_HOVER:
        this.drawCheckedHover()
        break
      default:
        break
    }
  }

  #drawTotalItems() {
    if (this.hasItems) {
      P5.p5.text(
        this.#totalItems,
        this.position.x + this.#offsetItems.x,
        this.position.y + this.#offsetItems.y,
      )
    }
  }

  draw() {
    this.#drawButtonImage()
    this.#drawTotalItems()
  }

  getStateDraw(mousePosition: Position) {
    if (this.isMouseInside({ x: mousePosition.x, y: mousePosition.y })) {
      if (!this.on) {
        return BUTTON_INDEX_IMAGE.OFF_HOVER
      }
      if (this.isChecked) {
        return BUTTON_INDEX_IMAGE.CHECKED_HOVER
      }
      return BUTTON_INDEX_IMAGE.ON_HOVER
    }
    // the mouse is outside the button
    if (!this.on) {
      return BUTTON_INDEX_IMAGE.OFF
    }
    if (this.isChecked) {
      return BUTTON_INDEX_IMAGE.CHECKED
    }
    return BUTTON_INDEX_IMAGE.ON
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
    this.drawState(BUTTON_INDEX_IMAGE.ON)
  }
  drawOff() {
    this.drawState(BUTTON_INDEX_IMAGE.OFF)
  }
  drawOnHover() {
    this.drawState(BUTTON_INDEX_IMAGE.ON_HOVER)
  }
  drawOffHover() {
    this.drawState(BUTTON_INDEX_IMAGE.OFF_HOVER)
  }
  drawChecked() {
    if (this.hasCheckedStates) {
      this.drawState(BUTTON_INDEX_IMAGE.CHECKED)
    } else {
      this.drawState(BUTTON_INDEX_IMAGE.ON)
      this.drawCheckRectangle()
    }
  }
  drawCheckedHover() {
    if (this.hasCheckedStates) {
      this.drawState(BUTTON_INDEX_IMAGE.CHECKED_HOVER)
    } else {
      this.drawState(BUTTON_INDEX_IMAGE.ON_HOVER)
      this.drawCheckRectangle()
    }
  }
  drawCheckRectangle() {
    P5.p5.strokeWeight(3)
    P5.p5.stroke(255, 204, 0)
    P5.p5.noFill()
    P5.p5.square(
      this.position.x + this.offsetImages.x - 2,
      this.position.y + this.offsetImages.y - 2,
      36,
    )
  }

  drawState(state: number) {
    if (this.images[state] === null) {
      throw new Error('Image in drawState for the button is null')
    }
    P5.p5.image(
      this.images[state],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )

    // draw checked rectangle for buttons without checked images
  }

  isMouseOver(mousePosition: Position): boolean {
    return this.#positionInsideRectangle.check(
      mousePosition,
      this.position,
      this.size,
    )
  }
}
