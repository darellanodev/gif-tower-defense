import { Position } from '../types/position'
import { TextProperties } from './TextProperties'
import { P5 } from '../utils/P5'

export class Debug {
  static showMouseCoordinates(position: Position) {
    const mousePosX = Math.round(position.x)
    const mousePosY = Math.round(position.y)

    TextProperties.setForHudData()
    P5.p5.text(`x:${mousePosX}, y:${mousePosY}`, 260, 18)
  }
  static showLabelTestingMode() {
    TextProperties.setForHudData()
    P5.p5.text('The game is in testing mode', 8, 100)
  }
}
