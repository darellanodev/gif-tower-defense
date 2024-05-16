import { Player } from '../player/Player'
import { Wallet } from '../player/Wallet'
import { P5 } from '../utils/P5'
import { TextProperties } from './TextProperties'

export class HudOtherIndicators {
  #wallet: Wallet
  #player: Player
  constructor(wallet: Wallet, player: Player) {
    this.#wallet = wallet
    this.#player = player
  }

  draw() {
    TextProperties.setForHudData()
    this.#drawMoney()
    this.#drawLives()
    this.#drawScore()
    this.#drawLevelTitle()
    this.#drawWave()
  }

  #drawMoney() {
    P5.p5.text(this.#wallet.money, 445, 48)
  }

  #drawLives() {
    P5.p5.text(this.#player.lives, 390, 48)
  }

  #drawScore() {
    P5.p5.text(this.#player.getPrintScore(), 404, 73)
  }

  #drawLevelTitle() {
    P5.p5.text('Serpent by Ocliboy', 130, 18)
  }

  #drawWave() {
    P5.p5.text(`wave ${this.#player.wave}`, 403, 13)
  }
}
