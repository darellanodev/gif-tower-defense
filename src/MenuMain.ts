import { MiniMap } from './MiniMap'
import { StateManager } from './StateManager'
import { Button } from './hud/Button'
import { ButtonDisabled } from './hud/ButtonDisabled'
import { ButtonMiniMap } from './hud/ButtonMiniMap'
import { Debug } from './hud/Debug'
import { LevelsData } from './levels/LevelsData'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { Images } from './resources/Images'
import { Position } from './types/position'
import { P5 } from './utils/P5'

export class MenuMain {
  static #instance: MenuMain | null = null
  #stateManager: StateManager
  #btnsMiniMapsEditor: ButtonMiniMap[] = []
  #btnsMiniMapsLastLevelsPlayed: ButtonMiniMap[] = []
  #btnSurvival: Button
  #btnEditor: Button
  #btnTodays: Button

  constructor(stateManager: StateManager) {
    if (MenuMain.#instance !== null) {
      throw new Error(
        'MenuMain is a singleton class, use getInstance to get the instance',
      )
    }
    this.#stateManager = stateManager

    const lastEditorLevelsIds = [13]

    this.#btnsMiniMapsEditor = this.#createMiniMapButtonsForLevelIds(
      lastEditorLevelsIds,
      MiniMap.TYPE_LAST_LEVEL_EDITOR,
      { x: 637, y: 207 },
    )

    // create the three last played levels

    const lastPlayedLevelsIds = [1, 14, 13]

    this.#btnsMiniMapsLastLevelsPlayed = this.#createMiniMapButtonsForLevelIds(
      lastPlayedLevelsIds,
      MiniMap.TYPE_LAST_LEVEL_PLAYED,
      { x: 336, y: 452 },
    )
    // create the buttons
    this.#btnSurvival = new Button(
      { x: 480, y: 110 },
      { w: 103, h: 31 },
      Images.buttonSurvivalImages,
    )
    this.#btnTodays = new ButtonDisabled(
      { x: 600, y: 110 },
      { w: 132, h: 31 },
      Images.buttonTodaysImages,
    )
    this.#btnEditor = new ButtonDisabled(
      { x: 455, y: 206 },
      { w: 129, h: 31 },
      Images.buttonEditorImages,
    )
    // assign the singleton instance
    MenuMain.#instance = this
  }
  static getInstance(stateManager: StateManager) {
    if (MenuMain.#instance === null) {
      MenuMain.#instance = new MenuMain(stateManager)
    }
    return MenuMain.#instance
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
    P5.p5.image(Images.menuMain, 0, 0, 800, 580)
  }
  mouseClicked() {
    const mousePosition = { x: P5.p5.mouseX, y: P5.p5.mouseY }

    // check if player clic the survival mode button
    if (this.#btnSurvival.isMouseOver(mousePosition)) {
      this.#stateManager.setMenuSurvival()
    }

    // check if player clic over one last level edited minimap (currently there is only one)
    for (const btnMiniMapEditor of this.#btnsMiniMapsEditor) {
      if (btnMiniMapEditor.isMouseOver(mousePosition)) {
        this.#stateManager.setPlay()
      }
    }
    // check if player clic one of the last played levels
    for (const btnMiniMapLastPlayed of this.#btnsMiniMapsLastLevelsPlayed) {
      if (btnMiniMapLastPlayed.isMouseOver(mousePosition)) {
        this.#stateManager.setPlay()
      }
    }
  }
  update() {}
  draw() {
    this.#drawBackground()
    this.#drawButtonsMiniMapsEditor()
    this.#drawGameModeButtons()
    this.#drawButtonsMiniMapsLastLevelsPlayed()
    this.#drawDebugElements()
  }
  #drawGameModeButtons() {
    this.#btnSurvival.draw()
    this.#btnEditor.draw()
    this.#btnTodays.draw()
  }
  #drawButtonsMiniMapsLastLevelsPlayed() {
    for (const btnMiniMapLastPlayed of this.#btnsMiniMapsLastLevelsPlayed) {
      btnMiniMapLastPlayed.draw()
    }
  }
  #drawButtonsMiniMapsEditor() {
    for (const btnMiniMapEditor of this.#btnsMiniMapsEditor) {
      btnMiniMapEditor.draw()
    }
  }
  #createMiniMapButtonsForLevelIds(
    levelsIds: number[],
    mode: number,
    position: Position,
  ): ButtonMiniMap[] {
    const stepX = 150

    const levelDataProvider = new LevelsDataProvider(LevelsData.data)

    const result = []
    let i = 0
    for (const levelId of levelsIds) {
      const levelMap = levelDataProvider.getLevel(levelId)
      if (levelMap === undefined) {
        throw new Error(`Level with id ${levelId} is undefined`)
      }

      result.push(
        new ButtonMiniMap(
          { x: position.x + i * stepX, y: position.y },
          Images.buttonMiniMapImages,
          new MiniMap(levelMap, mode),
        ),
      )
      i++
    }

    return result
  }
}
