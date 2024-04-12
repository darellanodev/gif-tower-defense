import { Position } from '../utils/types'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { ConstColor } from '../constants/ConstColor'
import { Const } from '../constants/Const'
import { P5 } from '../utils/P5'

export class InfluenceArea {
  static ALPHA_FILL = 50
  static ALPHA_STROKE = 120

  static _setGrayInfluenceAreaColor() {
    P5.p5.stroke(...ConstColor.GRAY, InfluenceArea.ALPHA_STROKE)
    P5.p5.fill(...ConstColor.GRAY, InfluenceArea.ALPHA_FILL)
  }

  static _setInfluenceAreaColor(towerId: number) {
    switch (towerId) {
      case TowerGreen.ID:
        P5.p5.stroke(...ConstColor.GREEN, InfluenceArea.ALPHA_STROKE)
        P5.p5.fill(...ConstColor.GREEN, InfluenceArea.ALPHA_FILL)
        break
      case TowerRed.ID:
        P5.p5.stroke(...ConstColor.RED, InfluenceArea.ALPHA_STROKE)
        P5.p5.fill(...ConstColor.RED, InfluenceArea.ALPHA_FILL)
        break
      case TowerYellow.ID:
        P5.p5.stroke(...ConstColor.YELLOW, InfluenceArea.ALPHA_STROKE)
        P5.p5.fill(...ConstColor.YELLOW, InfluenceArea.ALPHA_FILL)
        break
    }
  }

  static _getInfluenceAreaFor(towerSelected: number) {
    let influenceArea: number = 0
    switch (towerSelected) {
      case TowerGreen.ID:
        influenceArea = TowerGreen.UPGRADE_INFLUENCE_AREA[0]
        break

      case TowerRed.ID:
        influenceArea = TowerRed.UPGRADE_INFLUENCE_AREA[0]
        break

      case TowerYellow.ID:
        influenceArea = TowerYellow.UPGRADE_INFLUENCE_AREA[0]
        break
    }
    return influenceArea
  }

  static drawNoTowerInfluenceArea(
    hudTowerSelected: any,
    position: Position,
    canBuy: boolean,
  ) {
    P5.p5.strokeWeight(2)

    if (canBuy) {
      InfluenceArea._setInfluenceAreaColor(hudTowerSelected)
    } else {
      InfluenceArea._setGrayInfluenceAreaColor()
    }
    InfluenceArea._drawCircle(
      position.x,
      position.y,
      InfluenceArea._getInfluenceAreaFor(hudTowerSelected),
    )
  }

  static drawTowerInfluenceArea(tower: any, canUpgrade: boolean) {
    P5.p5.strokeWeight(2)

    const towerPosition = tower.position

    let x = towerPosition.x
    let y = towerPosition.y

    if (tower.type === TowerGreen.ID || tower.type === TowerRed.ID) {
      x += Const.TOWER_OFFSET
      y += Const.TOWER_OFFSET
    }
    if (canUpgrade) {
      this._setInfluenceAreaColor(tower.type)
    } else {
      this._setGrayInfluenceAreaColor()
    }
    this._drawCircle(x, y, tower.influenceArea)
  }

  static _drawCircle(x: number, y: number, diameter: number) {
    P5.p5.circle(x + Const.TILE_SIZE / 2, y + Const.TILE_SIZE / 2, diameter)
  }
}
