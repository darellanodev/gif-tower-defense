import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Magic } from './Magic'

export class MagicFireball extends Magic {
  static FIREBALLS = 3
  static DAMAGE = 500

  #img: Image
  constructor(img: Image, startX: number, startY: number, orders: number[]) {
    super(startX, startY, orders)
    this.#img = img
  }

  addDamage(enemy: Enemy) {
    enemy.addDamage(MagicFireball.DAMAGE)
  }

  draw() {
    image(this.#img, this.x, this.y)
  }
}
