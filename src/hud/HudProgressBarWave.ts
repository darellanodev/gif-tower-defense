import { Position, Size } from '../utils/types'
import { ProgressBar } from './ProgressBar'
import { Const } from '../constants/Const'
import { Player } from '../Player'

export class HudProgressBarWave {
  #waveProgressBar: ProgressBar
  #waveProgressDelay: number = Const.WAVE_PROGRESS_DELAY

  constructor() {
    const position: Position = { x: 335, y: -19 }
    const size: Size = { w: 150, h: 16 }
    this.#waveProgressBar = new ProgressBar(position, size)
  }

  updateWaveProgressBar() {
    let instantiateEnemies = false
    if (this.#waveProgressDelay > 0) {
      this.#waveProgressDelay--
    } else {
      this.#waveProgressDelay = Const.WAVE_PROGRESS_DELAY
      this.#waveProgressBar.increaseProgress()

      if (this.#waveProgressBar.isFullOfProgress()) {
        // next wave
        this.#waveProgressBar.reinitProgress()
        Player.wave++
        instantiateEnemies = true
      }
    }
    return instantiateEnemies
  }

  draw() {
    this.#waveProgressBar.draw()
  }
}
