import { Game } from './Game'
import { MiniMap } from './MiniMap'
import { StateManager } from './StateManager'
import { Button } from './hud/buttons/Button'
import { ButtonMiniMap } from './hud/buttons/ButtonMiniMap'
import { ButtonsMiniMapsCreator } from './hud/buttons/ButtonsMiniMapsCreator'
import { Debug } from './hud/Debug'
import { Paginator } from './hud/Paginator'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { Images } from './resources/Images'
import { P5 } from './utils/P5'

export class MenuSurvival {
  static #instance: MenuSurvival | null = null
  #stateManager: StateManager
  #btnsMiniMaps: ButtonMiniMap[] = []
  #btnBackMenuMain: Button
  #buttonsMiniMapsCreator: ButtonsMiniMapsCreator
  #game: Game
  #levelsDataProvider: LevelsDataProvider
  #paginator: Paginator

  constructor(
    stateManager: StateManager,
    buttonsMiniMapsCreator: ButtonsMiniMapsCreator,
    game: Game,
    levelsDataProvider: LevelsDataProvider,
  ) {
    if (MenuSurvival.#instance !== null) {
      throw new Error(
        'MenuSurvival is a singleton class, use getInstance to get the instance',
      )
    }
    this.#stateManager = stateManager
    this.#buttonsMiniMapsCreator = buttonsMiniMapsCreator
    this.#game = game
    this.#levelsDataProvider = levelsDataProvider

    const levelsPages = this.#levelsDataProvider.getTotalPages()
    this.#paginator = new Paginator(levelsPages)
    this.#getLevelsPage(1)
    // create the buttons
    this.#btnBackMenuMain = new Button(
      { x: 610, y: 520 },
      { w: 166, h: 31 },
      Images.buttonMenuMainImages,
    )

    // assign the singleton instance
    MenuSurvival.#instance = this
  }

  #getLevelsPage(page: number) {
    const levelsIdsRow1 = this.#levelsDataProvider.getPageLevelsIds(page)

    this.#btnsMiniMaps = this.#buttonsMiniMapsCreator.createMultiRows(
      levelsIdsRow1,
      MiniMap.TYPE_TEXT_LEFT,
      { x: 28, y: 160 },
    )

    this.#paginator.active = page
  }

  static getInstance(
    stateManager: StateManager,
    buttonsMiniMapsCreator: ButtonsMiniMapsCreator,
    game: Game,
    levelsDataProvider: LevelsDataProvider,
  ) {
    if (MenuSurvival.#instance === null) {
      MenuSurvival.#instance = new MenuSurvival(
        stateManager,
        buttonsMiniMapsCreator,
        game,
        levelsDataProvider,
      )
    }
    return MenuSurvival.#instance
  }
  #drawDebugElements() {
    if (!this.#game.isGameModeTesting()) {
      return
    }
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

    // check if player click the survival mode button
    if (this.#btnBackMenuMain.isMouseOver(mousePosition)) {
      this.#stateManager.setMenuMain()
    }

    // check if player click one of the survival minimaps
    for (const btnMiniMap of this.#btnsMiniMaps) {
      if (btnMiniMap.isMouseOver(mousePosition)) {
        const levelId = btnMiniMap.miniMap.levelId
        this.#game.loadLevel(levelId)
        this.#stateManager.setPlay()
      }
    }
    // check if the player click on the paginator buttons
    const btnPageClicked: string | null =
      this.#paginator.mouseClicked(mousePosition)
    if (btnPageClicked !== null) {
      if (this.#isButtonPageNumber(btnPageClicked)) {
        this.#getLevelsPage(parseInt(btnPageClicked))
      } else if (btnPageClicked === '>>') {
        this.#paginator.nextPagesGroup()
      } else if (btnPageClicked === '<<') {
        this.#paginator.previousPagesGroup()
      }
    }
  }
  #isButtonPageNumber(label: string) {
    return !Number.isNaN(parseInt(label))
  }
  update() {}

  draw() {
    this.#drawBackground()
    this.#btnBackMenuMain.draw()
    this.#drawButtonsMiniMaps()
    this.#drawDebugElements()
    this.#paginator.draw()
  }

  #drawButtonsMiniMaps() {
    for (const btnMiniMap of this.#btnsMiniMaps) {
      btnMiniMap.draw()
    }
  }
}
