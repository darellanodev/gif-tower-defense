import { StateManager } from '../StateManager'
import { P5 } from '../utils/P5'
import { Debug } from './Debug'
import { TextProperties } from './TextProperties'
import { GameSpeed } from '../GameSpeed'
import { GAME_SPEED_INDICATOR_POSITION } from '../constants/gameSpeed'

export class HudScreenIndicators {
  #stateManager: StateManager
  #isGameModeTesting: boolean
  #debug: Debug
  #textProperties: TextProperties
  #gameSpeed: GameSpeed

  constructor(
    stateManager: StateManager,
    isGameModeTesting: boolean,
    gameSpeed: GameSpeed,
  ) {
    this.#stateManager = stateManager
    this.#isGameModeTesting = isGameModeTesting
    this.#debug = new Debug()
    this.#textProperties = new TextProperties()
    this.#gameSpeed = gameSpeed
  }

  draw() {
    this.drawGameSpeed()
    if (this.#stateManager.isGameOver()) {
      this.drawGameOverScreen()
    }
    if (this.#stateManager.isPaused()) {
      this.drawPauseScreen()
    }
    if (this.#isGameModeTesting) {
      this.drawDebugElements()
    }
  }

  drawGameSpeed() {
    this.#textProperties.setForHudData()
    P5.p5.textAlign(P5.p5.CENTER)
    P5.p5.text(
      `speed ${this.#gameSpeed.label} (S)`,
      GAME_SPEED_INDICATOR_POSITION.x,
      GAME_SPEED_INDICATOR_POSITION.y,
    )
  }

  drawGameOverScreen() {
    this.#textProperties.setForBigCenteredTitle()
    P5.p5.text('Game over', P5.p5.width / 2, P5.p5.height / 2)
  }

  drawPauseScreen() {
    this.#textProperties.setForBigCenteredTitle()
    P5.p5.text('Game paused', P5.p5.width / 2, P5.p5.height / 2)
  }

  drawDebugElements() {
    this.#debug.showMouseCoordinates(
      { x: P5.p5.mouseX, y: P5.p5.mouseY },
      { x: 260, y: 18 },
    )
    this.#debug.showLabelTestingMode({ x: 8, y: 100 })
  }
}
