import { Image } from 'p5'
import { Enemy } from './Enemy'
import { Magic } from './Magic'
import { Position } from './types'

export class MagicFireball extends Magic {
  static DAMAGE = 500

  static instances: MagicFireball[] = []
  static total: number = 3

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  static instantiate(images: Image, position: Position, orders: number[]) {
    if (MagicFireball.total > 0) {
      MagicFireball.instances.push(new MagicFireball(images, position, orders))
      MagicFireball.total--
    }
  }

  addDamage(enemy: Enemy) {
    enemy.addDamage(MagicFireball.DAMAGE)
  }

  draw() {
    image(this.#img, this.position.x, this.position.y)
  }
}
