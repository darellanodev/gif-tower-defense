import { Image } from 'p5'

export class EndTile {
  x: number
  y: number
  img: Image

  constructor(img: Image, x: number, y: number) {
    this.img = img
    this.x = x
    this.y = y
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
}
