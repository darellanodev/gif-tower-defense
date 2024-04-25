import { P5 } from '../utils/P5'
import { Position } from '../utils/types'
import { TextProperties } from './TextProperties'

export class FlyIndicator {
  static MAX_TIME_ALIVE: number = 100
  static MOVE_INCREMENT: number = 0.5
  static instances: FlyIndicator[] = []

  #position: Position
  #alive: boolean = true
  #aliveTime: number = 0
  #text: string = ''
  constructor(position: Position, text: string) {
    this.#position = { ...position }
    this.#text = text
  }

  static instantiateFlyIndicator(position: Position, text: string) {
    FlyIndicator.instances.push(new FlyIndicator(position, text))
  }

  get alive() {
    return this.#alive
  }

  get position(): Position {
    return this.#position
  }

  #setTextStyle() {
    if (this.#text.charAt(0) == '-') {
      TextProperties.setForBuyingFlyIndicator()
    } else {
      TextProperties.setForSellingFlyIndicator()
    }
  }

  draw() {
    this.#setTextStyle()
    P5.p5.text(this.#text, this.#position.x, this.#position.y)
  }

  static drawInstances() {
    FlyIndicator.instances.forEach((f) => {
      f.draw()
    })
  }

  update() {
    this.#aliveTime++
    if (this.#aliveTime > FlyIndicator.MAX_TIME_ALIVE) {
      this.#alive = false
    } else {
      const newY = this.#position.y - FlyIndicator.MOVE_INCREMENT
      this.#position = { x: this.#position.x, y: newY }
    }
  }

  static removeDeadInstances() {
    FlyIndicator.instances = FlyIndicator.instances.filter(
      (flyIndicator) => flyIndicator.alive,
    )
  }

  static updateInstances() {
    FlyIndicator.instances.forEach((flyIndicator) => {
      flyIndicator.update()
    })
  }
}
