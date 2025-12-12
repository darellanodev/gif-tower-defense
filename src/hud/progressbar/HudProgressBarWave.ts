import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { ProgressBar } from './ProgressBar'
import { Player } from '../../player/Player'

export class HudProgressBarWave extends ProgressBar {
  static POSITION: Position = { x: 335, y: -19 }
  static SIZE: Size = { w: 150, h: 16 }
  static WAVE_PROGRESS_DELAY = 35
  #waveProgressDelay: number = HudProgressBarWave.WAVE_PROGRESS_DELAY
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
    this.#waveProgressDelay = HudProgressBarWave.WAVE_PROGRESS_DELAY
    this.increaseProgress()
  }
}
