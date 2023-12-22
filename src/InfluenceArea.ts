import { ConstType, RGBType } from './types'

export class InfluenceArea {
  Const: any

  constructor(Const: ConstType) {
    this.Const = Const
  }

  _setInfluenceAreaColor(towerType: number) {
    switch (towerType) {
      case this.Const.GREEN_TOWER:
        stroke(
          ...(this.Const.GREEN_COLOR as RGBType),
          this.Const.ALPHA_INFLUENCE_AREA_STROKE,
        )
        fill(
          ...(this.Const.GREEN_COLOR as RGBType),
          this.Const.ALPHA_INFLUENCE_AREA_FILL,
        )
        break
      case this.Const.RED_TOWER:
        stroke(
          ...(this.Const.RED_COLOR as RGBType),
          this.Const.ALPHA_INFLUENCE_AREA_STROKE,
        )
        fill(
          ...(this.Const.RED_COLOR as RGBType),
          this.Const.ALPHA_INFLUENCE_AREA_FILL,
        )
        break
      case this.Const.YELLOW_TOWER:
        stroke(
          ...(this.Const.YELLOW_COLOR as RGBType),
          this.Const.ALPHA_INFLUENCE_AREA_STROKE,
        )
        fill(
          ...(this.Const.YELLOW_COLOR as RGBType),
          this.Const.ALPHA_INFLUENCE_AREA_FILL,
        )
        break
    }
  }

  _getInfluenceAreaFor(towerSelected: any) {
    let influenceArea: number = this.Const.GREEN_TOWER_INFLUENCE_AREA
    switch (towerSelected) {
      case this.Const.GREEN_TOWER:
        influenceArea = this.Const.GREEN_TOWER_INFLUENCE_AREA
        break

      case this.Const.RED_TOWER:
        influenceArea = this.Const.RED_TOWER_INFLUENCE_AREA
        break

      case this.Const.YELLOW_TOWER:
        influenceArea = this.Const.YELLOW_TOWER_INFLUENCE_AREA
        break
    }
    return influenceArea
  }

  drawHudTowerInfluenceArea(hudTowerSelected: any, x: number, y: number) {
    strokeWeight(2)

    this._setInfluenceAreaColor(hudTowerSelected)
    this._drawCircle(x, y, this._getInfluenceAreaFor(hudTowerSelected))
  }

  drawTowerInfluenceArea(tower: any) {
    strokeWeight(2)

    let x = tower.getX()
    let y = tower.getY()

    if (
      tower.getType() === this.Const.GREEN_TOWER ||
      tower.getType() === this.Const.RED_TOWER
    ) {
      x += this.Const.TOWER_OFFSET
      y += this.Const.TOWER_OFFSET
    }

    this._setInfluenceAreaColor(tower.getType())
    this._drawCircle(x, y, tower.getInfluenceArea())
  }

  _drawCircle(x: number, y: number, diameter: number) {
    circle(x + this.Const.TILE_SIZE / 2, y + this.Const.TILE_SIZE / 2, diameter)
  }
}
