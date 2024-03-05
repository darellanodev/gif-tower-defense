import { Position } from './types'
import { TextProperties } from './TextProperties'

export class Debug {
  static showMouseCoordinates(position: Position) {
    TextProperties.setForHudData()
    text(`${position.x} - ${position.y}`, 260, 18)
  }
}
