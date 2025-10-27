import { StateManager } from '../StateManager'
import { P5 } from '../utils/P5'
import { Debug } from './Debug'
import { TextProperties } from './TextProperties'

export class HudScreenIndicators {
  #stateManager: StateManager
  #isGameModeTesting: boolean

  constructor(stateManager: StateManager, isGameModeTesting: boolean) {
    this.#stateManager = stateManager
    this.#isGameModeTesting = isGameModeTesting
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
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game over', P5.p5.width / 2, P5.p5.height / 2)
  }

  drawPauseScreen() {
    TextProperties.setForBigCenteredTitle()
    P5.p5.text('Game paused', P5.p5.width / 2, P5.p5.height / 2)
  }

  drawDebugElements() {
    Debug.showMouseCoordinates(
      { x: P5.p5.mouseX, y: P5.p5.mouseY },
      { x: 260, y: 18 },
    )
    Debug.showLabelTestingMode({ x: 8, y: 100 })
  }
}
