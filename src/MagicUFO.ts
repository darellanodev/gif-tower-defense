import { Image } from 'p5'
import { Const } from './Const'
import { ConstDirection } from './ConstDirection'
import { Magic } from './Magic'

export class MagicUFO extends Magic {
  static UFOS = 3

  #img: Image
  constructor(img: Image, startX: number, startY: number, orders: number[]) {
    super(startX, startY, orders)
    this.#img = img
  }

  draw() {
    image(this.#img, this.x, this.y)
  }
}
