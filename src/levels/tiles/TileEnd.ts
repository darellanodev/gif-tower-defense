import { Image } from 'p5'
import { Position } from '../../types/position'

import { P5 } from '../../utils/P5'
import { Obj } from '../../Obj'
import { ConstTile } from '../../constants/ConstTile'

export class TileEnd extends Obj {
  #img: Image | null

  constructor(img: Image | null, position: Position) {
    super(position)
    this.#img = img
  }

  draw(scale: number, startOffsetX: number, startOffsetY: number) {
    if (!this.#img) {
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
}
