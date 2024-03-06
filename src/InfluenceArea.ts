import { ConstType, Position, RGBType } from './types'

export class InfluenceArea {
  Const: ConstType

  constructor(Const: ConstType) {
    this.Const = Const
  }

  _setGrayInfluenceAreaColor() {
    stroke(...this.Const.GRAY_COLOR, this.Const.ALPHA_INFLUENCE_AREA_STROKE)
    fill(...this.Const.GRAY_COLOR, this.Const.ALPHA_INFLUENCE_AREA_FILL)
  }

  _setInfluenceAreaColor(towerId: number) {
    switch (towerId) {
      case GreenTower.ID:
        stroke(...GreenTower.COLOR, this.Const.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...GreenTower.COLOR, this.Const.ALPHA_INFLUENCE_AREA_FILL)
        break
      case RedTower.ID:
        stroke(...RedTower.COLOR, this.Const.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...RedTower.COLOR, this.Const.ALPHA_INFLUENCE_AREA_FILL)
        break
      case YellowTower.ID:
        stroke(...YellowTower.COLOR, this.Const.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...YellowTower.COLOR, this.Const.ALPHA_INFLUENCE_AREA_FILL)
        break
    }
  }

  _getInfluenceAreaFor(towerSelected: number) {
    let influenceArea: number = GreenTower.ID_INFLUENCE_AREA
    switch (towerSelected) {
      case GreenTower.ID:
        influenceArea = GreenTower.ID_INFLUENCE_AREA
        break

      case RedTower.ID:
        influenceArea = RedTower.ID_INFLUENCE_AREA
        break

      case YellowTower.ID:
        influenceArea = YellowTower.ID_INFLUENCE_AREA
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

    const towerPosition = tower.getPosition()

    let x = towerPosition.x
    let y = towerPosition.y

    if (tower.getType() === GreenTower.ID || tower.getType() === RedTower.ID) {
      x += this.Const.TOWER_OFFSET
      y += this.Const.TOWER_OFFSET
    }
    if (canUpgrade) {
      this._setInfluenceAreaColor(tower.getType())
    } else {
      this._setGrayInfluenceAreaColor()
    }
    this._drawCircle(x, y, tower.getInfluenceArea())
  }

  _drawCircle(x: number, y: number, diameter: number) {
    circle(x + this.Const.TILE_SIZE / 2, y + this.Const.TILE_SIZE / 2, diameter)
  }
}
