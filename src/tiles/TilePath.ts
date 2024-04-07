import { Tile } from './Tile'
import { Position } from '../utils/types'

export class TilePath extends Tile {
  constructor(position: Position) {
    super(position)
  }
}
