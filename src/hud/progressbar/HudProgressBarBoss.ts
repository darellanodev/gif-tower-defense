import { ProgressBar } from './ProgressBar'
import { Position } from '../../types/position'
import { Size } from '../../types/size'
import { HudProgressBarWave } from './HudProgressBarWave'

export class HudProgressBarBoss extends ProgressBar {
  static BOSS_PROGRESS_DELAY = HudProgressBarWave.WAVE_PROGRESS_DELAY * 6

  #bossProgressDelay: number = HudProgressBarBoss.BOSS_PROGRESS_DELAY

  constructor(position: Position, size: Size) {
    super(position, size)
  }

  updateBossProgressBar() {
    if (this.#bossProgressDelay > 0) {
      this.#bossProgressDelay--
      return
    }
    this.#bossProgressDelay = HudProgressBarBoss.BOSS_PROGRESS_DELAY
    this.increaseProgress()
  }
}
