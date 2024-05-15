import { Position, Size, TowerType } from '../utils/types'
import { ProgressBar } from './ProgressBar'
import { Const } from '../constants/Const'

export class HudProgressBarBoss {
  #bossProgressBar: ProgressBar
  #bossProgressDelay: number = Const.BOSS_PROGRESS_DELAY

  constructor() {
    const position: Position = { x: 335, y: -2 }
    const size: Size = { w: 150, h: 10 }
    this.#bossProgressBar = new ProgressBar(position, size)
  }

  updateBossProgressBar() {
    let instantiateBoss = false
    if (this.#bossProgressDelay > 0) {
      this.#bossProgressDelay--
    } else {
      this.#bossProgressDelay = Const.BOSS_PROGRESS_DELAY
      this.#bossProgressBar.increaseProgress()

      if (this.#bossProgressBar.isFullOfProgress()) {
        // next boss
        this.#bossProgressBar.reinitProgress()
        instantiateBoss = true
      }
    }
    return instantiateBoss
  }

  draw() {
    this.#bossProgressBar.draw()
  }
}
