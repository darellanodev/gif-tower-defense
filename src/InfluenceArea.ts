import { ConstType, RGBType } from './types'

export class InfluenceArea {
  Const: ConstType

  constructor(Const: ConstType) {
    this.Const = Const
  }

  _setGrayInfluenceAreaColor() {
    stroke(
      ...(this.Const.GRAY_COLOR as RGBType),
      this.Const.ALPHA_INFLUENCE_AREA_STROKE,
    )
    fill(
      ...(this.Const.GRAY_COLOR as RGBType),
      this.Const.ALPHA_INFLUENCE_AREA_FILL,
    )
  }

  _setInfluenceAreaColor(towerId: number) {
    switch (towerId) {
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

  _getInfluenceAreaFor(towerSelected: number) {
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

  drawHudTowerInfluenceArea(
    hudTowerSelected: any,
    x: number,
    y: number,
    canBuy: boolean,
  ) {
    strokeWeight(2)

    if (canBuy) {
      this._setInfluenceAreaColor(hudTowerSelected)
    } else {
      this._setGrayInfluenceAreaColor()
    }
    this._drawCircle(x, y, this._getInfluenceAreaFor(hudTowerSelected))
  }

  drawTowerInfluenceArea(tower: any, canUpgrade: boolean) {
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
