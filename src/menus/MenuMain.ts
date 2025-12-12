import { Game } from '../Game'
import { MiniMap } from './MiniMap'
import { StateManager } from '../StateManager'
import { TodayEnemies } from './TodayEnemies'
import { EnemyAnimator } from '../enemies/EnemyAnimator'
import { Button } from '../hud/buttons/Button'
import { ButtonDisabled } from '../hud/buttons/ButtonDisabled'
import { ButtonMiniMap } from '../hud/buttons/ButtonMiniMap'
import { ButtonsMiniMapsCreator } from '../hud/buttons/ButtonsMiniMapsCreator'
import { Debug } from '../hud/Debug'
import { NewsDataProvider } from './news/NewsDataProvider'
import { Images } from '../resources/Images'
import { Position } from '../types/position'
import { P5 } from '../utils/P5'
import { Enemy } from '../enemies/Enemy'

export class MenuMain {
  static #instance: MenuMain | null = null
  #stateManager: StateManager
  #btnsMiniMapsEditor: ButtonMiniMap[] = []
  #btnsMiniMapsLastLevelsPlayed: ButtonMiniMap[] = []
  #btnSurvival: Button
  #btnEditor: Button
  #btnTodays: Button
  #buttonsMiniMapsCreator: ButtonsMiniMapsCreator
  #game: Game
  #todayEnemies: TodayEnemies | null = null
  #actualNewsItem: string
  #debug: Debug

  constructor(
    stateManager: StateManager,
    buttonsMiniMapsCreator: ButtonsMiniMapsCreator,
    game: Game,
    newsDataProvider: NewsDataProvider,
  ) {
    if (MenuMain.#instance !== null) {
      throw new Error(
        'MenuMain is a singleton class, use getInstance to get the instance',
      )
    }
    this.#stateManager = stateManager
    this.#buttonsMiniMapsCreator = buttonsMiniMapsCreator
    this.#game = game
    this.#actualNewsItem = newsDataProvider.last.content

    const lastEditorLevelsIds = [8]

    this.#btnsMiniMapsEditor = buttonsMiniMapsCreator.createOneRow(
      lastEditorLevelsIds,
      MiniMap.TYPE_TEXT_DOWN,
      { x: 637, y: 207 },
    )

    // create the three last played levels
    const lastPlayedLevelsIds = [1, 14, 13]

    this.#btnsMiniMapsLastLevelsPlayed = buttonsMiniMapsCreator.createOneRow(
      lastPlayedLevelsIds,
      MiniMap.TYPE_TEXT_LEFT,
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
    // create the todayEnemies zone
    const enemiesAnimators: EnemyAnimator[] = []

    for (let i = 0; i < Enemy.TOTAL_ENEMIES; i++) {
      enemiesAnimators.push(new EnemyAnimator(Images.getForEnemy(i)))
    }
    this.#todayEnemies = new TodayEnemies(enemiesAnimators)

    this.#debug = new Debug()

    // assign the singleton instance
    MenuMain.#instance = this
  }

  static getInstance(
    stateManager: StateManager,
    buttonsMiniMapsCreator: ButtonsMiniMapsCreator,
    game: Game,
    newsDataProvider: NewsDataProvider,
  ) {
    if (MenuMain.#instance === null) {
      MenuMain.#instance = new MenuMain(
        stateManager,
        buttonsMiniMapsCreator,
        game,
        newsDataProvider,
      )
    }
    return MenuMain.#instance
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
    P5.p5.image(Images.menuMain, 0, 0, 800, 580)
  }

  #handleSurvivalButton() {
    if (this.#btnSurvival.isMouseOver(this.#getMousePosition())) {
      this.#stateManager.setMenuSurvival()
    }
  }

  #getMousePosition() {
    return { x: P5.p5.mouseX, y: P5.p5.mouseY }
  }

  #handleMiniMapEditorButton() {
    for (const btnMiniMapEditor of this.#btnsMiniMapsEditor) {
      if (btnMiniMapEditor.isMouseOver(this.#getMousePosition())) {
        const levelId = btnMiniMapEditor.miniMap.levelId
        this.#game.loadLevel(levelId)
        this.#stateManager.setPlay()
      }
    }
  }

  #handleMiniMapsLastLevelsPlayedButtons() {
    for (const btnMiniMapLastPlayed of this.#btnsMiniMapsLastLevelsPlayed) {
      if (btnMiniMapLastPlayed.isMouseOver(this.#getMousePosition())) {
        const levelId = btnMiniMapLastPlayed.miniMap.levelId
        this.#game.loadLevel(levelId)
        this.#stateManager.setPlay()
      }
    }
  }

  mouseClicked() {
    this.#handleSurvivalButton()
    this.#handleMiniMapEditorButton()
    this.#handleMiniMapsLastLevelsPlayedButtons()
  }

  update() {}

  draw() {
    this.#drawBackground()
    this.#todayEnemies?.draw()
    this.#drawActualNewsItem()
    this.#drawButtonsMiniMapsEditor()
    this.#drawGameModeButtons()
    this.#drawButtonsMiniMapsLastLevelsPlayed()
    this.#drawDebugElements()
  }
  #drawActualNewsItem() {
    const position: Position = { x: 440, y: 65 }
    P5.p5.text(this.#actualNewsItem, position.x, position.y)
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
}
