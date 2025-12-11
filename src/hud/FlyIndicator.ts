import { Image } from 'p5'
import { P5 } from '../utils/P5'
import { Position } from '../types/position'
import { TextProperties } from './TextProperties'
import { Obj } from '../Obj'

export class FlyIndicator extends Obj {
  static MAX_TIME_ALIVE: number = 100
  static MOVE_INCREMENT: number = 0.5
  static OFFSET_POS_X_ICON: number = 22
  static OFFSET_POS_Y_ICON: number = -10
  static instances: FlyIndicator[] = []

  #alive: boolean = true
  #aliveTime: number = 0
  #text: string = ''
  #icon: Image | undefined = undefined
  #textProperties: TextProperties

  constructor(position: Position, text: string, icon?: Image) {
    super(position)

    this.#text = text
    this.#icon = icon

    this.#textProperties = new TextProperties()
  }

  static instantiateFlyIndicator(
    position: Position,
    text: string,
    icon?: Image,
  ) {
    FlyIndicator.instances.push(new FlyIndicator(position, text, icon))
  }

  get alive() {
    return this.#alive
  }

  #setTextStyle() {
    if (this.#text.charAt(0) == '-') {
      this.#textProperties.setForBuyingFlyIndicator()
      return
    }
    this.#textProperties.setForSellingFlyIndicator()
  }

  draw() {
    this.#setTextStyle()
    if (this.#icon) {
      P5.p5.image(
        this.#icon,
        this.position.x + FlyIndicator.OFFSET_POS_X_ICON,
        this.position.y + FlyIndicator.OFFSET_POS_Y_ICON,
      )
    }
    P5.p5.text(this.#text, this.position.x, this.position.y)
  }

  static drawInstances() {
    FlyIndicator.instances.forEach((f) => {
      f.draw()
    })
  }

  update() {
    this.#increaseAliveTime()
    this.#removeFlyIndicatorWhenTimeUp()
    this.#changePosition()
  }

  #increaseAliveTime() {
    this.#aliveTime++
  }

  #removeFlyIndicatorWhenTimeUp() {
    if (this.#aliveTime > FlyIndicator.MAX_TIME_ALIVE) {
      this.#alive = false
      return
    }
  }

  #changePosition() {
    const newY = this.position.y - FlyIndicator.MOVE_INCREMENT
    this.position = { x: this.position.x, y: newY }
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
