import { Game } from './Game'
import { MiniMap } from './MiniMap'
import { StateManager } from './StateManager'
import { Button } from './hud/Button'
import { ButtonMiniMap } from './hud/ButtonMiniMap'
import { ButtonsMiniMapsCreator } from './hud/ButtonsMiniMapsCreator'
import { Debug } from './hud/Debug'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'

export class MenuSurvival {
  static #instance: MenuSurvival | null = null
  #stateManager: StateManager
  #btnsMiniMapsRow1: ButtonMiniMap[] = []
  #btnsMiniMapsRow2: ButtonMiniMap[] = []
  #btnsMiniMapsRow3: ButtonMiniMap[] = []
  #btnsMiniMapsRows: any[] = []
  #btnBackMenuMain: Button
  #buttonsMiniMapsCreator: ButtonsMiniMapsCreator
  #game: Game

  constructor(
    stateManager: StateManager,
    buttonsMiniMapsCreator: ButtonsMiniMapsCreator,
    game: Game,
  ) {
    if (MenuSurvival.#instance !== null) {
      throw new Error(
        'MenuSurvival is a singleton class, use getInstance to get the instance',
      )
    }
    this.#stateManager = stateManager
    this.#buttonsMiniMapsCreator = buttonsMiniMapsCreator
    this.#game = game

    // create row1 of minimaps
    const levelsIdsRow1 = [1, 13, 14, 9, 15]
    this.#btnsMiniMapsRow1 = this.#buttonsMiniMapsCreator.createForLevelIds(
      levelsIdsRow1,
      MiniMap.TYPE_TEXT_LEFT,
      { x: 28, y: 160 },
    )

    // create row2 of minimaps
    const levelsIdsRow2 = [8, 10, 11, 12, 16]
    this.#btnsMiniMapsRow2 = this.#buttonsMiniMapsCreator.createForLevelIds(
      levelsIdsRow2,
      MiniMap.TYPE_TEXT_LEFT,
      { x: 28, y: 280 },
    )

    // create row3 of minimaps
    const levelsIdsRow3 = [22, 26]
    this.#btnsMiniMapsRow3 = this.#buttonsMiniMapsCreator.createForLevelIds(
      levelsIdsRow3,
      MiniMap.TYPE_TEXT_LEFT,
      { x: 28, y: 400 },
    )

    // create the buttons
    this.#btnBackMenuMain = new Button(
      { x: 610, y: 520 },
      { w: 166, h: 31 },
      Images.buttonMenuMainImages,
    )

    // group the minimaps
    this.#btnsMiniMapsRows.push(this.#btnsMiniMapsRow1)
    this.#btnsMiniMapsRows.push(this.#btnsMiniMapsRow2)
    this.#btnsMiniMapsRows.push(this.#btnsMiniMapsRow3)

    // assign the singleton instance
    MenuSurvival.#instance = this
  }
  static getInstance(
    stateManager: StateManager,
    buttonsMiniMapsCreator: ButtonsMiniMapsCreator,
    game: Game,
  ) {
    if (MenuSurvival.#instance === null) {
      MenuSurvival.#instance = new MenuSurvival(
        stateManager,
        buttonsMiniMapsCreator,
        game,
      )
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
    for (const btnsMiniMapsRow of this.#btnsMiniMapsRows) {
      for (const btnMiniMap of btnsMiniMapsRow) {
        if (btnMiniMap.isMouseOver(mousePosition)) {
          const levelId = btnMiniMap.miniMap.levelId
          this.#game.loadLevel(levelId)
          this.#stateManager.setPlay()
        }
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
    for (const btnsMiniMapsRow of this.#btnsMiniMapsRows) {
      for (const btnMiniMap of btnsMiniMapsRow) {
        btnMiniMap.draw()
      }
    }
  }
}
