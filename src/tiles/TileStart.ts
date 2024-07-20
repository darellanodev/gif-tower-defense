import { Image } from 'p5'
import { Position } from '../types/position'
import { Obj } from '../Obj'
import { P5 } from '../utils/P5'
import { Const } from '../constants/Const'

export class TileStart extends Obj {
  #img: Image | null
  #startDirection: number

  constructor(img: Image | null, position: Position, startDirection: number) {
    super(position)
    this.#img = img
    this.#startDirection = startDirection
  }

  draw(scale: number, startOffsetX: number, startOffsetY: number) {
    if (this.#img) {
      P5.p5.image(
        this.#img,
        this.position.x / scale + startOffsetX,
        this.position.y / scale + startOffsetY,
        Const.TILE_SIZE / scale,
        Const.TILE_SIZE / scale,
      )
    }
  }

  getStartDirection() {
    return this.#startDirection
  }
}
