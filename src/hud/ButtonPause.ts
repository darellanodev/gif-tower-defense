import { Image } from 'p5'
import { Button } from './Button'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { P5 } from '../utils/P5'

export class ButtonPause extends Button {
  static instance: ButtonPause
  static pauseImages: Image[]

  static INDEX_IMAGE_OFF_HOVER = 3

  #isChecked: boolean = false
  #isOn: boolean = false

  check() {
    this.#isChecked = true
  }
  uncheck() {
    this.#isChecked = false
  }
  get isChecked() {
    return this.#isChecked
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

  drawOffHover() {
    P5.p5.image(
      this.images[ButtonPause.INDEX_IMAGE_OFF_HOVER],
      this.position.x + this.offsetImages.x,
      this.position.y + this.offsetImages.y,
    )
  }

  set on(isOn: boolean) {
    this.#isOn = isOn
  }

  get isMouseInsideAndNotChecked(): boolean {
    return (
      this.isMouseOver({ x: P5.p5.mouseX, y: P5.p5.mouseY }) && !this.#isChecked
    )
  }

  #drawOn() {
    if (this.isMouseInsideAndNotChecked) {
      this.drawHover()
    } else {
      this.drawOn()
    }
  }
  #drawOff() {
    if (this.isMouseInsideAndNotChecked) {
      this.drawOffHover()
    } else {
      this.drawOff()
    }
  }

  draw() {
    if (this.#isOn) {
      this.#drawOn()
    } else {
      this.#drawOff()
    }
    if (this.#isChecked) {
      this.drawCheckRectangle()
    }
  }
  static setImages(pauseImages: Image[]) {
    ButtonPause.pauseImages = pauseImages
  }

  static initializePauseButton() {
    const position: Position = { x: 268, y: 30 }
    const size: Size = { w: 76, h: 24 }
    const offsetImages: Position = { x: 39, y: 4 }

    ButtonPause.instance = new ButtonPause(
      position,
      size,
      ButtonPause.pauseImages,
      offsetImages,
    )
  }
}
