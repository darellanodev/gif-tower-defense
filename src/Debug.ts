import { TextProperties } from './TextProperties'

export class Debug {
  static showMouseCoordinates(px: number, py: number) {
    TextProperties.setForHudData()
    text(`${px} - ${py}`, 260, 18)
  }
}
