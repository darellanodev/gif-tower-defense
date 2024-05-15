import { Position, Size } from '../utils/types'
import { ProgressBar } from './ProgressBar'
import { Const } from '../constants/Const'
import { Player } from '../Player'

export class HudProgressBarWave {
  static waveProgressBar: ProgressBar
  static waveProgressDelay: number = Const.WAVE_PROGRESS_DELAY

  static initializeWaveProgressBar() {
    const position: Position = { x: 335, y: -19 }
    const size: Size = { w: 150, h: 16 }
    HudProgressBarWave.waveProgressBar = new ProgressBar(position, size)
  }

  static updateWaveProgressBar() {
    let instantiateEnemies = false
    if (HudProgressBarWave.waveProgressDelay > 0) {
      HudProgressBarWave.waveProgressDelay--
    } else {
      HudProgressBarWave.waveProgressDelay = Const.WAVE_PROGRESS_DELAY
      HudProgressBarWave.waveProgressBar.increaseProgress()

      if (HudProgressBarWave.waveProgressBar.isFullOfProgress()) {
        // next wave
        HudProgressBarWave.waveProgressBar.reinitProgress()
        Player.wave++
        instantiateEnemies = true
      }
    }
    return instantiateEnemies
  }

  static draw() {
    HudProgressBarWave.waveProgressBar.draw()
  }
}
