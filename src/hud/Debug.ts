import { Position } from '../types/position'
import { TextProperties } from './TextProperties'
import { P5 } from '../utils/P5'

export class Debug {
  #textProperties: TextProperties
  constructor() {
    this.#textProperties = new TextProperties()
  }
  showMouseCoordinates(position: Position, displayPosition: Position) {
    const mousePosX = Math.round(position.x)
    const mousePosY = Math.round(position.y)

    this.#textProperties.setForHudData()
    P5.p5.text(
      `x:${mousePosX}, y:${mousePosY}`,
      displayPosition.x,
      displayPosition.y,
    )
  }
  showLabelTestingMode(displayPosition: Position) {
    this.#textProperties.setForHudData()
    P5.p5.text(
      'The game is in testing mode',
      displayPosition.x,
      displayPosition.y,
    )
  }
}
