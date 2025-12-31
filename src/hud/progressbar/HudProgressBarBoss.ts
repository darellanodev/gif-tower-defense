import { ProgressBar } from './ProgressBar'
import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { PROGRESS_BAR_BOSS_DELAY } from '../../constants/progressBar'

export class HudProgressBarBoss extends ProgressBar {
  #bossProgressDelay: number = PROGRESS_BAR_BOSS_DELAY

  constructor(position: Position, size: Size) {
    super(position, size)
  }

  updateBossProgressBar() {
    if (this.#bossProgressDelay > 0) {
      this.#bossProgressDelay--
      return
    }
    this.#bossProgressDelay = PROGRESS_BAR_BOSS_DELAY
    this.increaseProgress()
  }
}
