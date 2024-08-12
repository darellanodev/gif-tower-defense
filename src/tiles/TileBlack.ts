import { Position } from '../types/position'
import { Image } from 'p5'
import { Const } from '../constants/Const'
import { P5 } from '../utils/P5'
import { Obj } from '../Obj'

export class TileBlack extends Obj {
  #img: Image

  constructor(img: Image, position: Position) {
    super(position)
    this.#img = img
  }

  drawTile(scale: number, startOffsetX: number, startOffsetY: number) {
    P5.p5.image(
      this.#img,
      this.position.x / scale + startOffsetX,
      this.position.y / scale + startOffsetY,
      Const.TILE_SIZE / scale,
      Const.TILE_SIZE / scale,
    )
  }

  isInside(mouse_x: number, mouse_y: number) {
    let insideX = false
    let insideY = false

    if (
      this.position.x < mouse_x &&
      this.position.x + Const.TILE_SIZE > mouse_x
    ) {
      insideX = true
    }
    if (
      this.position.y < mouse_y &&
      this.position.y + Const.TILE_SIZE > mouse_y
    ) {
      insideY = true
    }

    if (insideX && insideY) {
      return true
    }
    return false
  }
}
