export class StartTile {
  x
  y
  img
  startDirection

  constructor(img: any, x: number, y: number, startDirection: number) {
    this.img = img
    this.x = x
    this.y = y
    this.startDirection = startDirection
  }

  draw() {
    image(this.img, this.x, this.y)
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  getStartDirection() {
    return this.startDirection
  }
}
