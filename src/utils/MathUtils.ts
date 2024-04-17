import { Position, Size } from './types'

export class MathUtils {
  static distance(posA: Position, posB: Position) {
    return Math.sqrt(
      (posA.x - posB.x) * (posA.x - posB.x) +
        (posA.y - posB.y) * (posA.y - posB.y),
    )
  }

  static range(start: number, stop: number) {
    return new Array(stop - start + 1).fill(0).map((v, i) => start + i)
  }

  static getTwoNumbersFourTimes(number: number) {
    return [number * 4, (number + 1) * 4]
  }

  static isPositionInsideRectangle(
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
