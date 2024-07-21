import { MiniMap } from './MiniMap'
import { StateManager } from './StateManager'
import { ButtonMiniMap } from './hud/ButtonMiniMap'
import { Debug } from './hud/Debug'
import { LevelsData } from './levels/LevelsData'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
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

    const levelDataProvider = new LevelsDataProvider(LevelsData.data)
    const levelId = 1
    const levelMap = levelDataProvider.getLevel(levelId)

    if (levelMap === undefined) {
      throw new Error('levelMap is undefined')
    }

    this.#btnMiniMapEditor = new ButtonMiniMap(
      { x: 637, y: 207 },
      Images.buttonMiniMapImages,
      new MiniMap(levelMap),
    )

    const posY = 452
    this.#btnMiniMapLastPlayed1 = new ButtonMiniMap(
      { x: 336, y: posY },
      Images.buttonMiniMapImages,
      new MiniMap(levelMap),
    )
    this.#btnMiniMapLastPlayed2 = new ButtonMiniMap(
      { x: 486, y: posY },
      Images.buttonMiniMapImages,
      new MiniMap(levelMap),
    )
    this.#btnMiniMapLastPlayed3 = new ButtonMiniMap(
      { x: 636, y: posY },
      Images.buttonMiniMapImages,
      new MiniMap(levelMap),
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
    const mousePosition = { x: P5.p5.mouseX, y: P5.p5.mouseY }
    if (
      this.#btnMiniMapEditor.isMouseOver(mousePosition) ||
      this.#btnMiniMapLastPlayed1.isMouseOver(mousePosition) ||
      this.#btnMiniMapLastPlayed2.isMouseOver(mousePosition) ||
      this.#btnMiniMapLastPlayed3.isMouseOver(mousePosition)
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
