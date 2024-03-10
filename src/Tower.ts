import { Position } from './types'

export class Tower {
  #position: Position
  constructor(position: Position) {
    this.#position = { ...position }
  }
}
