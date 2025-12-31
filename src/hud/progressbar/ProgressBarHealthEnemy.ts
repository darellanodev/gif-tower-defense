import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { ProgressBar } from './ProgressBar'

export class ProgressBarHealthEnemy extends ProgressBar {
  #waveProgressDelay: number
  #delay: number

  constructor(position: Position, size: Size, delay: number) {
    super(position, size)
    this.#delay = delay
    this.#waveProgressDelay = delay
  }

  update() {
    if (this.#waveProgressDelay > 0) {
      this.#waveProgressDelay--
      return
    }
    this.#waveProgressDelay = this.#delay
    this.increaseProgress()
  }
}
