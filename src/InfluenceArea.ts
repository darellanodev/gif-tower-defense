export class InfluenceArea {
  Const: any

  constructor(Const: any) {
    this.Const = Const
  }

  _setInfluenceAreaColor(towerType: number) {
    const GREEN_COLOR: [number, number, number] = [75, 185, 35]
    const RED_COLOR: [number, number, number] = [185, 35, 35]
    const YELLOW_COLOR: [number, number, number] = [202, 191, 24]

    switch (towerType) {
      case this.Const.GREEN_TOWER:
        stroke(...GREEN_COLOR, this.Const.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...GREEN_COLOR, this.Const.ALPHA_INFLUENCE_AREA_FILL)
        break

      case this.Const.RED_TOWER:
        stroke(...RED_COLOR, this.Const.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...RED_COLOR, this.Const.ALPHA_INFLUENCE_AREA_FILL)
        break

      case this.Const.YELLOW_TOWER:
        stroke(...YELLOW_COLOR, this.Const.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...YELLOW_COLOR, this.Const.ALPHA_INFLUENCE_AREA_FILL)
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
