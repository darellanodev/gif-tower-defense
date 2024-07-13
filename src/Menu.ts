import { StateManager } from './StateManager'
import { Debug } from './hud/Debug'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'

export class Menu {
  static #instance: Menu | null = null
  #startButton: ButtonTransparent
  #stateManager: StateManager
  constructor(stateManager: StateManager) {
    if (Menu.#instance !== null) {
      throw new Error(
        'Menu is a singleton class, use getInstance to get the instance',
      )
    }
    this.#stateManager = stateManager

    // assign the singleton instance
    Menu.#instance = this
  }
  static getInstance(stateManager: StateManager) {
    if (Menu.#instance === null) {
      Menu.#instance = new Menu(stateManager)
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
