import { MiniMap } from './MiniMap'
import { StateManager } from './StateManager'
import { ButtonMiniMap } from './hud/ButtonMiniMap'
import { Debug } from './hud/Debug'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'

export class Menu {
  static #instance: Menu | null = null
  #stateManager: StateManager
  #btnMiniMapEditor: ButtonMiniMap
  #btnMiniMapLastPlayed1: ButtonMiniMap
  #btnMiniMapLastPlayed2: ButtonMiniMap
  #btnMiniMapLastPlayed3: ButtonMiniMap

  constructor(stateManager: StateManager) {
    if (Menu.#instance !== null) {
      throw new Error(
        'Menu is a singleton class, use getInstance to get the instance',
      )
    }
    this.#stateManager = stateManager

    this.#btnMiniMapEditor = new ButtonMiniMap(
      { x: 637, y: 207 },
      Images.buttonMiniMapImages,
      new MiniMap(),
    )

    const posY = 452
    this.#btnMiniMapLastPlayed1 = new ButtonMiniMap(
      { x: 336, y: posY },
      Images.buttonMiniMapImages,
      new MiniMap(),
    )
    this.#btnMiniMapLastPlayed2 = new ButtonMiniMap(
      { x: 486, y: posY },
      Images.buttonMiniMapImages,
      new MiniMap(),
    )
    this.#btnMiniMapLastPlayed3 = new ButtonMiniMap(
      { x: 636, y: posY },
      Images.buttonMiniMapImages,
      new MiniMap(),
    )

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
    if (
      this.#btnMiniMapEditor.isMouseOver({ x: P5.p5.mouseX, y: P5.p5.mouseY })
    ) {
      this.#stateManager.setPlay()
    }
  }
  update() {}
  draw() {
    this.#drawBackground()
    this.#btnMiniMapEditor.draw()
    this.#btnMiniMapLastPlayed1.draw()
    this.#btnMiniMapLastPlayed2.draw()
    this.#btnMiniMapLastPlayed3.draw()
    this.#drawDebugElements()
  }
}
