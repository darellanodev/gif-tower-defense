import { Position } from '../utils/types'

export class Tile {
  position: Position
  constructor(position: Position) {
    this.position = { ...position }
  }

  getPosition() {
    return this.position
  }
}
