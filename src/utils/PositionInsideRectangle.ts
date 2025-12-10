import { Position } from '../types/position'
import { Size } from '../types/size'

export class PositionInsideRectangle {
  check(
    position: Position,
    rectanglePosition: Position,
    rectangleSize: Size,
  ): boolean {
    return (
      this.#isInsideX(position, rectanglePosition, rectangleSize) &&
      this.#isInsideY(position, rectanglePosition, rectangleSize)
    )
  }

  #isInsideX(
    position: Position,
    rectanglePosition: Position,
    rectangleSize: Size,
  ) {
    return (
      position.x >= rectanglePosition.x &&
      position.x <= rectanglePosition.x + rectangleSize.w
    )
  }

  #isInsideY(
    position: Position,
    rectanglePosition: Position,
    rectangleSize: Size,
  ) {
    return (
      position.y >= rectanglePosition.y &&
      position.y <= rectanglePosition.y + rectangleSize.h
    )
  }
}
