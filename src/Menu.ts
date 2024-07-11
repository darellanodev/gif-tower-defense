import { Debug } from './hud/Debug'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'

export class Menu {
  static #instance: Menu | null = null
  constructor() {
    if (Menu.#instance !== null) {
      throw new Error(
        'Menu is a singleton class, use getInstance to get the instance',
      )
    }

    // assign the singleton instance
    Menu.#instance = this
  }
  static getInstance() {
    if (Menu.#instance === null) {
      Menu.#instance = new Menu()
    }
    return Menu.#instance
  }
  #drawDebugElements() {
    Debug.showMouseCoordinates(
      { x: P5.p5.mouseX, y: P5.p5.mouseY },
      { x: 355, y: 15 },
    )
    Debug.showLabelTestingMode({ x: 170, y: 15 })
  }
  #drawBackground() {
    P5.p5.background('skyblue')
    P5.p5.rectMode(P5.p5.CORNER)

    P5.p5.image(Images.menu, 0, 0, 800, 580)
  }
  draw() {
    this.#drawBackground()
    this.#drawDebugElements()
  }
}
