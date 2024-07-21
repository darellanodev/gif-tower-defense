import { Image } from 'p5'
import { Position } from '../types/position'
import { Size } from '../types/size'
import { Button } from './Button'
import { MiniMap } from '../MiniMap'
import { P5 } from '../utils/P5'

export class ButtonMiniMap extends Button {
  static MINIMAP_OFFSET_X = 14
  static MINIMAP_OFFSET_Y = -6
  #miniMap: MiniMap
  constructor(
    position: Position,
    images: Image[],
    miniMap: MiniMap,
    size: Size = { w: 144, h: 82 },
    offsetImages: Position = { x: 0, y: 0 },
  ) {
    super(position, size, images, offsetImages)
    this.#miniMap = miniMap
    this.#miniMap.position = {
      x: position.x + ButtonMiniMap.MINIMAP_OFFSET_X,
      y: position.y + ButtonMiniMap.MINIMAP_OFFSET_Y,
    }
  }

  draw() {
    if (this.isMouseOver({ x: P5.p5.mouseX, y: P5.p5.mouseY })) {
      this.drawHover()
    } else {
      this.drawOn()
    }
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
