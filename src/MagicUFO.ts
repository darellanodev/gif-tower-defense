import { Image } from 'p5'
import { Magic } from './Magic'
import { Position } from './types'

export class MagicUFO extends Magic {
  static instances: MagicUFO[] = []
  static total: number = 3

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  static instantiate(images: Image, position: Position, orders: number[]) {
    if (MagicUFO.total > 0) {
      MagicUFO.instances.push(new MagicUFO(images, position, orders))
      MagicUFO.total--
    }
  }

  draw() {
    image(this.#img, this.position.x, this.position.y)
  }

  static drawInstances() {
    MagicUFO.instances.forEach((ufo) => {
      ufo.draw()
    })
  }

  static updateInstances() {
    MagicUFO.instances.forEach((ufo) => {
      ufo.update()
    })
  }

  static removeDeadInstances() {
    MagicUFO.instances = MagicUFO.instances.filter((ufo) => ufo.isAlive())
  }
}
