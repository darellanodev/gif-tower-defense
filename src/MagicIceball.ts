import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Magic } from './Magic'
import { Position } from './types'

export class MagicIceball extends Magic {
  static FREEZE_ENEMY_MAX_TIME = 500

  static instances: MagicIceball[] = []
  static total: number = 3

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  static instantiate(images: Image, position: Position, orders: number[]) {
    if (MagicIceball.total > 0) {
      MagicIceball.instances.push(new MagicIceball(images, position, orders))
      MagicIceball.total--
    }
  }

  freeze(enemy: Enemy) {
    enemy.freeze()
  }

  draw() {
    image(this.#img, this.position.x, this.position.y)
  }
}
