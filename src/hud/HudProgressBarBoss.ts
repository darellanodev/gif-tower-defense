import { Position, Size, TowerType } from '../utils/types'
import { ProgressBar } from './ProgressBar'
import { Const } from '../constants/Const'

export class HudProgressBarBoss {
  static bossProgressBar: ProgressBar
  static bossProgressDelay: number = Const.BOSS_PROGRESS_DELAY

  static initializeBossProgressBar() {
    const position: Position = { x: 335, y: -2 }
    const size: Size = { w: 150, h: 10 }
    HudProgressBarBoss.bossProgressBar = new ProgressBar(position, size)
  }

  static updateBossProgressBar() {
    let instantiateBoss = false
    if (HudProgressBarBoss.bossProgressDelay > 0) {
      HudProgressBarBoss.bossProgressDelay--
    } else {
      HudProgressBarBoss.bossProgressDelay = Const.BOSS_PROGRESS_DELAY
      HudProgressBarBoss.bossProgressBar.increaseProgress()

      if (HudProgressBarBoss.bossProgressBar.isFullOfProgress()) {
        // next boss
        HudProgressBarBoss.bossProgressBar.reinitProgress()
        instantiateBoss = true
      }
    }
    return instantiateBoss
  }

  static draw() {
    HudProgressBarBoss.bossProgressBar.draw()
  }
}
