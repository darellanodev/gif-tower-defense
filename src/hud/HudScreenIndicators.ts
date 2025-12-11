import { StateManager } from '../StateManager'
import { P5 } from '../utils/P5'
import { Debug } from './Debug'
import { TextProperties } from './TextProperties'

export class HudScreenIndicators {
  #stateManager: StateManager
  #isGameModeTesting: boolean
  #debug: Debug
  #textProperties: TextProperties

  constructor(stateManager: StateManager, isGameModeTesting: boolean) {
    this.#stateManager = stateManager
    this.#isGameModeTesting = isGameModeTesting
    this.#debug = new Debug()
    this.#textProperties = new TextProperties()
  }

  draw() {
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
