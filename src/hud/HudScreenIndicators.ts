import { P5 } from '../utils/P5'
import { Debug } from './Debug'
import { TextProperties } from './TextProperties'

export class HudScreenIndicators {
  constructor() {}

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
