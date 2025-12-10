import { Position } from '../types/position'
import { Size } from '../types/size'

export class PositionUtils {
  static isInsideRectangle(
    position: Position,
    rectanglePosition: Position,
    rectangleSize: Size,
  ): boolean {
    return (
      PositionUtils.#isInsideX(position, rectanglePosition, rectangleSize) &&
      PositionUtils.#isInsideY(position, rectanglePosition, rectangleSize)
    )
  }

  static #isInsideX(
    position: Position,
    rectanglePosition: Position,
    rectangleSize: Size,
  ) {
    return (
      position.x >= rectanglePosition.x &&
      position.x <= rectanglePosition.x + rectangleSize.w
    )
  }

  static #isInsideY(
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
