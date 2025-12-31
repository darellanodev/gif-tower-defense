import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { ProgressBar } from './ProgressBar'
import { Player } from '../../player/Player'
import { PROGRESS_BAR_WAVE_DELAY } from '../../constants/progressBar'

export class HudProgressBarWave extends ProgressBar {
  #waveProgressDelay: number = PROGRESS_BAR_WAVE_DELAY
  #player: Player

  constructor(position: Position, size: Size, player: Player) {
    super(position, size)
    this.#player = player
  }

  updateWaveProgressBar() {
    if (this.#waveProgressDelay > 0) {
      this.#waveProgressDelay--
      return
    }
    this.#waveProgressDelay = PROGRESS_BAR_WAVE_DELAY
    this.increaseProgress()
  }
}
