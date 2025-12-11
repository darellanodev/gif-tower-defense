import { P5 } from '../utils/P5'

export class TextProperties {
  setForBigCenteredTitle() {
    P5.p5.fill('white')
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textSize(30)
    P5.p5.textAlign(P5.p5.CENTER)
  }
  setForHudData() {
    P5.p5.textSize(12)
    P5.p5.fill('white')
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textAlign(P5.p5.LEFT)
  }
  setForBuyingFlyIndicator() {
    P5.p5.textSize(12)
    P5.p5.fill(255, 94, 94)
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textAlign(P5.p5.LEFT)
  }
  setForSellingFlyIndicator() {
    P5.p5.textSize(12)
    P5.p5.fill(86, 255, 98)
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textAlign(P5.p5.LEFT)
  }
  setForPageButtons() {
    P5.p5.textSize(12)
    P5.p5.fill('white')
    P5.p5.stroke('black')
    P5.p5.strokeWeight(2)
    P5.p5.textAlign(P5.p5.CENTER)
  }
}
