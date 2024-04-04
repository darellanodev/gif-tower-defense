import { P5 } from './P5'

export class TextProperties {
  static setForBigCenteredTitle() {
    P5.p5.fill('white')
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textSize(30)
    P5.p5.textAlign(P5.p5.CENTER)
  }
  static setForHudData() {
    P5.p5.textSize(12)
    P5.p5.fill('white')
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textAlign(P5.p5.LEFT)
  }
}
