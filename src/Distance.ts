import { Position } from './types'

export class Distance {
  static twoPoints(posA: Position, posB: Position) {
    return Math.sqrt(
      (posA.x - posB.x) * (posA.x - posB.x) +
        (posA.y - posB.y) * (posA.y - posB.y),
    )
  }
}
