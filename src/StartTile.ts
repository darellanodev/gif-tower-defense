import { Image } from 'p5'

export class StartTile {
  img: Image
  x: number
  y: number
  startDirection: number

  constructor(img: Image, x: number, y: number, startDirection: number) {
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
