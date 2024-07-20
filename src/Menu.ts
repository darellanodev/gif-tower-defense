import { MiniMap } from './MiniMap'
import { StateManager } from './StateManager'
import { ButtonTransparent } from './hud/ButtonTransparent'
import { Debug } from './hud/Debug'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'

export class Menu {
  static #instance: Menu | null = null
  #startButton: ButtonTransparent
  #stateManager: StateManager
  #minimapEditor: MiniMap
  #minimapLastPlayed1: MiniMap
  #minimapLastPlayed2: MiniMap
  #minimapLastPlayed3: MiniMap

  constructor(stateManager: StateManager) {
    if (Menu.#instance !== null) {
      throw new Error(
        'Menu is a singleton class, use getInstance to get the instance',
      )
    }
    this.#stateManager = stateManager
    this.#startButton = new ButtonTransparent(
      { x: 623, y: 207 },
      { w: 150, h: 100 },
    )
    this.#minimapEditor = new MiniMap({ x: 637, y: 200 })

    this.#minimapLastPlayed1 = new MiniMap({ x: 350, y: 445 })
    this.#minimapLastPlayed2 = new MiniMap({ x: 500, y: 445 })
    this.#minimapLastPlayed3 = new MiniMap({ x: 650, y: 445 })
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
  mouseClicked() {
    if (this.#startButton.isMouseOver({ x: P5.p5.mouseX, y: P5.p5.mouseY })) {
      this.#stateManager.setPlay()
    }
  }
  update() {}
  draw() {
    this.#drawBackground()
    this.#minimapEditor.draw()
    this.#minimapLastPlayed1.draw()
    this.#minimapLastPlayed2.draw()
    this.#minimapLastPlayed3.draw()
    this.#drawDebugElements()
  }
}
