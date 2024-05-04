import { Image } from 'p5'
import { Magic } from './Magic'
import { Position } from '../utils/types'
import { P5 } from '../utils/P5'

export class MagicUFO extends Magic {
  static instances: MagicUFO[] = []

  #img: Image
  constructor(img: Image, startPosition: Position, orders: number[]) {
    super(startPosition, orders)
    this.#img = img
  }

  static instantiate(image: Image, position: Position, orders: number[]) {
    MagicUFO.instances.push(new MagicUFO(image, position, orders))
  }

  draw() {
    P5.p5.image(this.#img, this.position.x, this.position.y)
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
