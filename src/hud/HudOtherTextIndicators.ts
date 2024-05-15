import { Player } from '../Player'
import { P5 } from '../utils/P5'

export class HudOtherTextIndicators {
  static draw() {
    HudOtherTextIndicators._drawMoney()
    HudOtherTextIndicators._drawLives()
    HudOtherTextIndicators._drawScore()
    HudOtherTextIndicators._drawLevelTitle()
  }

  static _drawMoney() {
    P5.p5.text(Player.money, 445, 48)
  }

  static _drawLives() {
    P5.p5.text(Player.lives, 390, 48)
  }

  static _drawScore() {
    P5.p5.text(Player.getPrintScore(), 404, 73)
  }

  static _drawLevelTitle() {
    P5.p5.text('Serpent by Ocliboy', 130, 18)
  }

  static _drawWave() {
    P5.p5.text(`wave ${Player.wave}`, 403, 13)
  }
}
