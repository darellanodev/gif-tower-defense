import { Image } from 'p5'
import { Const } from './Const'
import { Magic } from './Magic'
import { Position } from './types'

export class MagicUFO extends Magic {
  static UFOS = 3

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  draw() {
    image(this.#img, this.position.x, this.position.y)
  }
}
