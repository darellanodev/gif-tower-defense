import { Image } from 'p5'
import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { Button } from './Button'
import { MiniMap } from '../../menus/MiniMap'
import { BUTTON_MINIMAP_OFFSET } from '../../constants/button'

export class ButtonMiniMap extends Button {
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
      x: position.x + BUTTON_MINIMAP_OFFSET.X,
      y: position.y + BUTTON_MINIMAP_OFFSET.Y,
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

  drawOnHover() {
    super.drawOnHover()
    this.#miniMap.draw()
  }

  get miniMap() {
    return this.#miniMap
  }
}
