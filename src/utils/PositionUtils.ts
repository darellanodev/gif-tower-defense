import { Position } from '../types/position'
import { Size } from '../types/size'

export class PositionUtils {
  static distance(posA: Position, posB: Position) {
    return Math.sqrt(
      (posA.x - posB.x) * (posA.x - posB.x) +
        (posA.y - posB.y) * (posA.y - posB.y),
    )
  }

  static isInsideRectangle(
    position: Position,
    rectanglePosition: Position,
    rectangleSize: Size,
  ): boolean {
    let insideX = false
    let insideY = false
    if (
      position.x >= rectanglePosition.x &&
      position.x <= rectanglePosition.x + rectangleSize.w
    ) {
      insideX = true
    }
    if (
      position.y >= rectanglePosition.y &&
      position.y <= rectanglePosition.y + rectangleSize.h
    ) {
      insideY = true
    }
    if (insideX && insideY) {
      return true
    }
    return false
  }
}
