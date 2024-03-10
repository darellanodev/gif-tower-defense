import { Position } from './types'
import { GreenTower } from './GreenTower'
import { RedTower } from './RedTower'
import { YellowTower } from './YellowTower'
import { ConstColor } from './ConstColor'
import { Const } from './Const'

export class InfluenceArea {
  static ALPHA_FILL = 50
  static ALPHA_STROKE = 120

  constructor() {}

  _setGrayInfluenceAreaColor() {
    stroke(...ConstColor.GRAY, InfluenceArea.ALPHA_STROKE)
    fill(...ConstColor.GRAY, InfluenceArea.ALPHA_FILL)
  }

  _setInfluenceAreaColor(towerId: number) {
    switch (towerId) {
      case GreenTower.ID:
        stroke(...ConstColor.GREEN, InfluenceArea.ALPHA_STROKE)
        fill(...ConstColor.GREEN, InfluenceArea.ALPHA_FILL)
        break
      case RedTower.ID:
        stroke(...ConstColor.RED, InfluenceArea.ALPHA_STROKE)
        fill(...ConstColor.RED, InfluenceArea.ALPHA_FILL)
        break
      case YellowTower.ID:
        stroke(...ConstColor.YELLOW, InfluenceArea.ALPHA_STROKE)
        fill(...ConstColor.YELLOW, InfluenceArea.ALPHA_FILL)
        break
    }
  }

  _getInfluenceAreaFor(towerSelected: number) {
    let influenceArea: number = GreenTower.INFLUENCE_AREA
    switch (towerSelected) {
      case GreenTower.ID:
        influenceArea = GreenTower.INFLUENCE_AREA
        break

      case RedTower.ID:
        influenceArea = RedTower.INFLUENCE_AREA
        break

      case YellowTower.ID:
        influenceArea = YellowTower.INFLUENCE_AREA
        break
    }
    return influenceArea
  }

  drawHudTowerInfluenceArea(
    hudTowerSelected: any,
    position: Position,
    canBuy: boolean,
  ) {
    strokeWeight(2)

    if (canBuy) {
      this._setInfluenceAreaColor(hudTowerSelected)
    } else {
      this._setGrayInfluenceAreaColor()
    }
    this._drawCircle(
      position.x,
      position.y,
      this._getInfluenceAreaFor(hudTowerSelected),
    )
  }

  drawTowerInfluenceArea(tower: any, canUpgrade: boolean) {
    strokeWeight(2)

    const towerPosition = tower.position

    let x = towerPosition.x
    let y = towerPosition.y

    if (tower.type === GreenTower.ID || tower.type === RedTower.ID) {
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

  _drawCircle(x: number, y: number, diameter: number) {
    circle(x + Const.TILE_SIZE / 2, y + Const.TILE_SIZE / 2, diameter)
  }
}
