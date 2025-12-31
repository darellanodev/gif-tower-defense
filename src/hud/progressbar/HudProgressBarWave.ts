import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { ProgressBar } from './ProgressBar'
import { PROGRESS_BAR_WAVE_DELAY } from '../../constants/progressBar'

export class HudProgressBarWave extends ProgressBar {
  #waveProgressDelay: number = PROGRESS_BAR_WAVE_DELAY

  constructor(position: Position, size: Size) {
    super(position, size)
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
