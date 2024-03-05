import { Image } from 'p5'
import { Position } from './types'

export class EndTile {
  position: Position
  img: Image

  constructor(img: Image, position: Position) {
    this.img = img
    this.position = { ...position }
  }

  draw() {
    image(this.img, this.position.x, this.position.y)
  }

  getPosition() {
    return this.position
  }
}
