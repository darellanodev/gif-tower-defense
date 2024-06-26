import { TowerType } from '../types/towerType'
import { Image } from 'p5'
import { P5 } from '../utils/P5'

export class HudPanel {
  static NORMAL = 0
  static UPGRADING = 1
  static UPGRADING_MAX = 2
  static HEIGHT = 84

  static mode: number = 0
  #hudImages: Image[]

  constructor(hudImages: Image[]) {
    this.#hudImages = hudImages
  }

  draw() {
    switch (HudPanel.mode) {
      case HudPanel.NORMAL:
        P5.p5.image(this.#hudImages[HudPanel.NORMAL], 0, 0)
        break

      case HudPanel.UPGRADING:
        P5.p5.image(this.#hudImages[HudPanel.UPGRADING], 0, 0)
        break

      case HudPanel.UPGRADING_MAX:
        P5.p5.image(this.#hudImages[HudPanel.UPGRADING_MAX], 0, 0)
        break
    }
  }

  selectHudMode(tower: TowerType | null) {
    if (!tower) {
      return
    }

    if (tower.isMaxUpgraded) {
      HudPanel.mode = HudPanel.UPGRADING_MAX
    } else {
      HudPanel.mode = HudPanel.UPGRADING
    }
  }

  drawNormalHud() {
    HudPanel.mode = HudPanel.NORMAL
  }
}
