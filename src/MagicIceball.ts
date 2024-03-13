import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Magic } from './Magic'
import { Position } from './types'

export class MagicIceball extends Magic {
  static ICEBALLS = 3
  static FREEZE_ENEMY_MAX_TIME = 500

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  freeze(enemy: Enemy) {
    enemy.freeze()
  }

  draw() {
    image(this.#img, this.position.x, this.position.y)
  }
}
