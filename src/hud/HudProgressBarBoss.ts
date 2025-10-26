import { ProgressBar } from './ProgressBar'
import { Const } from '../constants/Const'
import { Position } from '../types/position'
import { Size } from '../types/size'

export class HudProgressBarBoss extends ProgressBar {
  #bossProgressDelay: number = Const.BOSS_PROGRESS_DELAY

  constructor(position: Position, size: Size) {
    super(position, size)
  }

  updateBossProgressBar() {
    if (this.#bossProgressDelay > 0) {
      this.#bossProgressDelay--
    } else {
      this.#bossProgressDelay = Const.BOSS_PROGRESS_DELAY
      this.increaseProgress()
    }
  }
}
