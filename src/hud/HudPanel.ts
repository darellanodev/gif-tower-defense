import { TowerType } from '../types/towerType'
import { Image } from 'p5'
import { P5 } from '../utils/P5'
import { PANEL_STATE } from '../constants/panel'

export class HudPanel {
  static mode: number = 0
  #hudImages: Image[]

  constructor(hudImages: Image[]) {
    this.#hudImages = hudImages
  }

  draw() {
    P5.p5.image(this.#hudImages[HudPanel.mode], 0, 0)
  }

  selectHudMode(tower: TowerType | null) {
    if (!tower) {
      return
    }

    if (tower.isMaxUpgraded) {
      HudPanel.mode = PANEL_STATE.UPGRADING_MAX
    } else {
      HudPanel.mode = PANEL_STATE.UPGRADING
    }
  }

  drawNormalHud() {
    HudPanel.mode = PANEL_STATE.NORMAL
  }
}
