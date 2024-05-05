import { Position } from './utils/types'

export class Obj {
  #position: Position
  constructor(position: Position) {
    this.#position = { ...position }
  }

  get position() {
    return this.#position
  }

  set position(position: Position) {
    this.#position = { ...position }
  }
}
