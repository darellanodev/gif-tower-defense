import { Image } from 'p5'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { Button } from './Button'
import { MiniMap } from '../MiniMap'

export class ButtonMiniMap extends Button {
  #miniMap: MiniMap
  constructor(
    position: Position,
    size: Size,
    images: Image[],
    offsetImages: Position = { x: 0, y: 0 },
    miniMap: MiniMap,
  ) {
    super(position, size, images, offsetImages)
    this.#miniMap = miniMap
  }

  draw() {
    super.draw()
    this.#miniMap.draw()
  }

  drawOn() {
    super.drawOn()
    this.#miniMap.draw()
  }

  drawOff() {
    super.drawOff()
    this.#miniMap.draw()
  }

  drawHover() {
    super.drawHover()
    this.#miniMap.draw()
  }
}
