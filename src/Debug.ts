import { Position } from './types'
import { TextProperties } from './TextProperties'

export class Debug {
  static showMouseCoordinates(position: Position) {
    const mousePosX = Math.round(position.x)
    const mousePosY = Math.round(position.y)

    TextProperties.setForHudData()
    text(`x:${mousePosX}, y:${mousePosY}`, 260, 18)
  }
}
