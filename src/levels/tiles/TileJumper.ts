import { Image } from 'p5'
import { Position } from '../../types/position'
import { TILE_SIZE } from '../../constants/tile'
import { P5 } from '../../utils/P5'
import { TilePath } from './TilePath'

// The enemies walk over it like over a path tile, but when they arrive they jump over the next tiles
export class TileJumper extends TilePath {
  #img: Image | null
  #jumpDistance: number

  constructor(img: Image | null, position: Position, jumpDistance: number) {
    super(position)
    this.#img = img
    this.#jumpDistance = jumpDistance
  }

  // number of tiles that the enemies jump
  get jumpDistance() {
    return this.#jumpDistance
  }

  drawTile(scale: number, startOffsetX: number, startOffsetY: number) {
    if (this.#img === null) {
      return
    }
    P5.p5.image(
      this.#img,
      this.position.x / scale + startOffsetX,
      this.position.y / scale + startOffsetY,
      TILE_SIZE / scale,
      TILE_SIZE / scale,
    )
  }
}
