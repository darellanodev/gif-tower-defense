import { Position } from '../../types/position'
import { Image } from 'p5'
import { ConstTile } from '../../constants/ConstTile'
import { P5 } from '../../utils/P5'
import { Obj } from '../../Obj'

export class TileBlack extends Obj {
  #img: Image | null = null

  constructor(img: Image | null, position: Position) {
    super(position)
    this.#img = img
  }

  drawTile(scale: number, startOffsetX: number, startOffsetY: number) {
    if (this.#img === null) {
      return
    }
    P5.p5.image(
      this.#img,
      this.position.x / scale + startOffsetX,
      this.position.y / scale + startOffsetY,
      ConstTile.SIZE / scale,
      ConstTile.SIZE / scale,
    )
  }

  isInside(mouse_x: number, mouse_y: number) {
    let insideX = false
    let insideY = false

    if (
      this.position.x < mouse_x &&
      this.position.x + ConstTile.SIZE > mouse_x
    ) {
      insideX = true
    }
    if (
      this.position.y < mouse_y &&
      this.position.y + ConstTile.SIZE > mouse_y
    ) {
      insideY = true
    }

    if (insideX && insideY) {
      return true
    }
    return false
  }
}
