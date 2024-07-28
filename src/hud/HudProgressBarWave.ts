import { Position } from '../types/position'
import { Size } from '../types/size'
import { ProgressBar } from './ProgressBar'
import { Const } from '../constants/Const'
import { Player } from '../player/Player'

export class HudProgressBarWave extends ProgressBar {
  static POSITION: Position = { x: 335, y: -19 }
  static SIZE: Size = { w: 150, h: 16 }
  #waveProgressDelay: number = Const.WAVE_PROGRESS_DELAY
  #player: Player

  constructor(position: Position, size: Size, player: Player) {
    super(position, size)
    this.#player = player
  }

  updateWaveProgressBar() {
    let instantiateEnemies = false
    if (this.#waveProgressDelay > 0) {
      this.#waveProgressDelay--
    } else {
      this.#waveProgressDelay = Const.WAVE_PROGRESS_DELAY
      this.increaseProgress()

      if (this.isFullOfProgress()) {
        // next wave
        this.reinitProgress()
        this.#player.increaseWave()
        instantiateEnemies = true
      }
    }
    return instantiateEnemies
  }
}
