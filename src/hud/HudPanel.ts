import { Position, TowerType } from '../utils/types'
import { Image } from 'p5'
import { P5 } from '../utils/P5'
import { MathUtils } from '../utils/MathUtils'

export class HudPanel {
  static NORMAL = 0
  static UPGRADING = 1
  static UPGRADING_MAX = 2
  static HEIGHT = 84

  static mode: number = 0
  static hudImages: Image[]

  static setImages(hudImages: Image[]) {
    HudPanel.hudImages = hudImages
  }

  static isInsideButtonsBar(position: Position) {
    const ButtonsBarRectanglePosition = { x: 0, y: 28 }
    const ButtonsBarRectangleSize = { w: 800, h: 50 }

    return MathUtils.isPositionInsideRectangle(
      position,
      ButtonsBarRectanglePosition,
      ButtonsBarRectangleSize,
    )
  }

  static draw() {
    switch (HudPanel.mode) {
      case HudPanel.NORMAL:
        P5.p5.image(HudPanel.hudImages[HudPanel.NORMAL], 0, 0)
        break

      case HudPanel.UPGRADING:
        P5.p5.image(HudPanel.hudImages[HudPanel.UPGRADING], 0, 0)
        break

      case HudPanel.UPGRADING_MAX:
        P5.p5.image(HudPanel.hudImages[HudPanel.UPGRADING_MAX], 0, 0)
        break
    }
  }

  static selectHudMode(tower: TowerType | null) {
    if (!tower) {
      return
    }

    if (tower.isMaxUpgraded) {
      HudPanel.mode = HudPanel.UPGRADING_MAX
    } else {
      HudPanel.mode = HudPanel.UPGRADING
    }
  }

  static drawNormalHud() {
    HudPanel.mode = HudPanel.NORMAL
  }
}
