import { Image } from 'p5'
import { Position } from '../types/position'

import { P5 } from '../utils/P5'
import { Obj } from '../Obj'

export class TileEnd extends Obj {
  #img: Image | null

  constructor(img: Image | null, position: Position) {
    super(position)
    this.#img = img
  }

  draw() {
    if (this.#img) {
      P5.p5.image(this.#img, this.position.x, this.position.y)
    }
  }
}
