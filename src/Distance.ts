export class Distance {
  static twoPoints(ax: number, ay: number, bx: number, by: number) {
    return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by))
  }
}
