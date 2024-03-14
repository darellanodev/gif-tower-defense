import { Position } from './types'

export class Tile {
  position: Position
  constructor(position: Position) {
    this.position = { ...position }
  }

  getPosition() {
    return this.position
  }
}
