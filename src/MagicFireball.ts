import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Magic } from './Magic'
import { Position } from './types'

export class MagicFireball extends Magic {
  static FIREBALLS = 3
  static DAMAGE = 500

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  addDamage(enemy: Enemy) {
    enemy.addDamage(MagicFireball.DAMAGE)
  }

  draw() {
    image(this.#img, this.position.x, this.position.y)
  }
}
