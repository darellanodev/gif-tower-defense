import { Position } from '../../types/position'
import { TILE_SIZE, ICE_TILE_COLOR } from '../../constants/tile'
import { P5 } from '../../utils/P5'
import { TilePath } from './TilePath'

export class TileIce extends TilePath {
  constructor(position: Position) {
    super(position)
  }

  drawTile(scale: number, startOffsetX: number, startOffsetY: number) {
    const p5 = P5.p5
    p5.push()
    p5.noStroke()
    p5.fill(...ICE_TILE_COLOR)
    p5.rectMode(p5.CORNER)
    p5.rect(
      this.position.x / scale + startOffsetX,
      this.position.y / scale + startOffsetY,
      TILE_SIZE / scale,
      TILE_SIZE / scale,
    )
    p5.pop()
  }
}
