import { Game } from '../Game'
import { MiniMap } from './MiniMap'
import { StateManager } from '../StateManager'
import { Button } from '../hud/buttons/Button'
import { ButtonMiniMap } from '../hud/buttons/ButtonMiniMap'
import { ButtonsMiniMapsCreator } from '../hud/buttons/ButtonsMiniMapsCreator'
import { Debug } from '../hud/Debug'
import { Paginator } from '../hud/Paginator'
import { LevelsDataProvider } from '../levels/LevelsDataProvider'
import { Images } from '../resources/Images'
import { P5 } from '../utils/P5'
import { MINIMAP_TEXT } from '../constants/button'

export class MenuSurvival {
  static #instance: MenuSurvival | null = null
  #stateManager: StateManager
  #btnsMiniMaps: ButtonMiniMap[] = []
  #btnBackMenuMain: Button
  #buttonsMiniMapsCreator: ButtonsMiniMapsCreator
  #game: Game
  #levelsDataProvider: LevelsDataProvider
  #paginator: Paginator
  #debug: Debug

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

    this.#debug = new Debug()

    // assign the singleton instance
    MenuSurvival.#instance = this
  }

  #getLevelsPage(page: number) {
    const levelsIdsRow1 = this.#levelsDataProvider.getPageLevelsIds(page)

    this.#btnsMiniMaps = this.#buttonsMiniMapsCreator.createMultiRows(
      levelsIdsRow1,
      MINIMAP_TEXT.LEFT,
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
    this.#debug.showMouseCoordinates(
      { x: P5.p5.mouseX, y: P5.p5.mouseY },
      { x: 355, y: 15 },
    )
    this.#debug.showLabelTestingMode({ x: 170, y: 15 })
  }
  #drawBackground() {
    P5.p5.background('skyblue')
    P5.p5.rectMode(P5.p5.CORNER)
    P5.p5.image(Images.menuSurvival, 0, 0, 800, 580)
  }
  #getMousePosition() {
    return { x: P5.p5.mouseX, y: P5.p5.mouseY }
  }

  #handleMainMenuButton() {
    if (this.#btnBackMenuMain.isMouseOver(this.#getMousePosition())) {
      this.#stateManager.setMenuMain()
    }
  }

  #handleMiniMapButtons() {
    for (const btnMiniMap of this.#btnsMiniMaps) {
      if (btnMiniMap.isMouseOver(this.#getMousePosition())) {
        const levelId = btnMiniMap.miniMap.levelId
        this.#game.loadLevel(levelId)
        this.#stateManager.setPlay()
      }
    }
  }

  #handlePaginatorButtons() {
    const btnPageClicked: string | null = this.#paginator.mouseClicked(
      this.#getMousePosition(),
    )

    if (btnPageClicked === null) {
      return
    }

    this.#handlePageNumberButton(btnPageClicked)
    this.#handleNextPageButton(btnPageClicked)
    this.#handlePreviousPageButton(btnPageClicked)
  }

  #handlePageNumberButton(btnPageClicked: string) {
    if (this.#isButtonPageNumber(btnPageClicked)) {
      this.#getLevelsPage(parseInt(btnPageClicked))
    }
  }

  #handleNextPageButton(btnPageClicked: string) {
    if (btnPageClicked === '>>') {
      this.#paginator.nextPagesGroup()
    }
  }

  #handlePreviousPageButton(btnPageClicked: string) {
    if (btnPageClicked === '<<') {
      this.#paginator.previousPagesGroup()
    }
  }

  mouseClicked() {
    this.#handleMainMenuButton()
    this.#handleMiniMapButtons()
    this.#handlePaginatorButtons()
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
