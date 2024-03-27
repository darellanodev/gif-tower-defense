import { Position } from './types'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { ConstColor } from './ConstColor'
import { Const } from './Const'

export class InfluenceArea {
  static ALPHA_FILL = 50
  static ALPHA_STROKE = 120

  static _setGrayInfluenceAreaColor() {
    stroke(...ConstColor.GRAY, InfluenceArea.ALPHA_STROKE)
    fill(...ConstColor.GRAY, InfluenceArea.ALPHA_FILL)
  }

  static _setInfluenceAreaColor(towerId: number) {
    switch (towerId) {
      case TowerGreen.ID:
        stroke(...ConstColor.GREEN, InfluenceArea.ALPHA_STROKE)
        fill(...ConstColor.GREEN, InfluenceArea.ALPHA_FILL)
        break
      case TowerRed.ID:
        stroke(...ConstColor.RED, InfluenceArea.ALPHA_STROKE)
        fill(...ConstColor.RED, InfluenceArea.ALPHA_FILL)
        break
      case TowerYellow.ID:
        stroke(...ConstColor.YELLOW, InfluenceArea.ALPHA_STROKE)
        fill(...ConstColor.YELLOW, InfluenceArea.ALPHA_FILL)
        break
    }
  }

  static _getInfluenceAreaFor(towerSelected: number) {
    let influenceArea: number = TowerGreen.INFLUENCE_AREA
    switch (towerSelected) {
      case TowerGreen.ID:
        influenceArea = TowerGreen.INFLUENCE_AREA
        break

      case TowerRed.ID:
        influenceArea = TowerRed.INFLUENCE_AREA
        break

      case TowerYellow.ID:
        influenceArea = TowerYellow.INFLUENCE_AREA
        break
    }
    return influenceArea
  }

  static drawHudTowerInfluenceArea(
    hudTowerSelected: any,
    position: Position,
    canBuy: boolean,
  ) {
    strokeWeight(2)

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
    strokeWeight(2)

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
    circle(x + Const.TILE_SIZE / 2, y + Const.TILE_SIZE / 2, diameter)
  }
}
