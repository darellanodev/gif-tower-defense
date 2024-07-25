import { MiniMap } from './MiniMap'
import { StateManager } from './StateManager'
import { Button } from './hud/Button'
import { ButtonMiniMap } from './hud/ButtonMiniMap'
import { ButtonsMiniMapsCreator } from './hud/ButtonsMiniMapsCreator'
import { Debug } from './hud/Debug'
import { LevelsData } from './levels/LevelsData'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'

export class MenuSurvival {
  static #instance: MenuSurvival | null = null
  #stateManager: StateManager
  #btnsMiniMaps: ButtonMiniMap[] = []
  #btnBackMenuMain: Button

  constructor(stateManager: StateManager) {
    if (MenuSurvival.#instance !== null) {
      throw new Error(
        'MenuSurvival is a singleton class, use getInstance to get the instance',
      )
    }
    this.#stateManager = stateManager

    const buttonsMiniMapsCreator = ButtonsMiniMapsCreator.getInstance()

    const levelsIds = [1, 13, 14, 1, 1]
    this.#btnsMiniMaps = buttonsMiniMapsCreator.createForLevelIds(
      levelsIds,
      MiniMap.TYPE_LAST_LEVEL_PLAYED,
      { x: 28, y: 160 },
    )

    // create the buttons
    this.#btnBackMenuMain = new Button(
      { x: 610, y: 520 },
      { w: 166, h: 31 },
      Images.buttonMenuMainImages,
    )

    // assign the singleton instance
    MenuSurvival.#instance = this
  }
  static getInstance(stateManager: StateManager) {
    if (MenuSurvival.#instance === null) {
      MenuSurvival.#instance = new MenuSurvival(stateManager)
    }
    return MenuSurvival.#instance
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
    P5.p5.image(Images.menuSurvival, 0, 0, 800, 580)
  }
  mouseClicked() {
    const mousePosition = { x: P5.p5.mouseX, y: P5.p5.mouseY }

    // check if player clic the survival mode button
    if (this.#btnBackMenuMain.isMouseOver(mousePosition)) {
      this.#stateManager.setMenuMain()
    }

    // check if player clic one of the survival minimaps
    for (const btnMiniMap of this.#btnsMiniMaps) {
      if (btnMiniMap.isMouseOver(mousePosition)) {
        this.#stateManager.setPlay()
      }
    }
  }
  update() {}
  draw() {
    this.#drawBackground()
    this.#btnBackMenuMain.draw()
    this.#drawButtonsMiniMaps()
    this.#drawDebugElements()
  }

  #drawButtonsMiniMaps() {
    for (const btnMiniMap of this.#btnsMiniMaps) {
      btnMiniMap.draw()
    }
  }
}
