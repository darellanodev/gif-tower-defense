import { Position, Size } from '../utils/types'

export class Button {
  #positon: Position
  #size: Size
  constructor(position: Position, size: Size) {
    this.#positon = { ...position }
    this.#size = { ...size }
  }

  isMouseOver(mousePosition: Position): boolean {
    let insideX = false
    let insideY = false
    if (
      mousePosition.x >= this.#positon.x &&
      mousePosition.x <= this.#positon.x + this.#size.w
    ) {
      insideX = true
    }
    if (
      mousePosition.y >= this.#positon.y &&
      mousePosition.y <= this.#positon.y + this.#size.h
    ) {
      insideY = true
    }
    if (insideX && insideY) {
      return true
    }
    return false
  }
}
