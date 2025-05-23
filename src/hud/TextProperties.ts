import { P5 } from '../utils/P5'

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
  static setForBuyingFlyIndicator() {
    P5.p5.textSize(12)
    P5.p5.fill(255, 94, 94)
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textAlign(P5.p5.LEFT)
  }
  static setForSellingFlyIndicator() {
    P5.p5.textSize(12)
    P5.p5.fill(86, 255, 98)
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textAlign(P5.p5.LEFT)
  }
  static setForPageButtons() {
    P5.p5.textSize(12)
    P5.p5.fill('white')
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textAlign(P5.p5.CENTER)
  }
}
