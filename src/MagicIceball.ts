import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Magic } from './Magic'

export class MagicIceball extends Magic {
  static ICEBALLS = 3
  static FREEZE_ENEMY_MAX_TIME = 500

  #img: Image
  constructor(img: Image, startX: number, startY: number, orders: number[]) {
    super(startX, startY, orders)
    this.#img = img
  }

  freeze(enemy: Enemy) {
    enemy.freeze()
  }

  draw() {
    image(this.#img, this.x, this.y)
  }
}
