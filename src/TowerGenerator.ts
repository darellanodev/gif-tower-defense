export class TowerGenerator {
  greenTowerImages: any[]
  redTowerImages: any[]
  yellowTowerImages: any[]

  Const: any
  GreenTower: any
  RedTower: any
  YellowTower: any
  Distance: any

  constructor(
    greenTowerImages: any[],
    redTowerImages: any[],
    yellowTowerImages: any[],
    Const: any,
    GreenTower: any,
    RedTower: any,
    YellowTower: any,
    Distance: any,
  ) {
    this.greenTowerImages = greenTowerImages
    this.redTowerImages = redTowerImages
    this.yellowTowerImages = yellowTowerImages
    this.Const = Const
    this.GreenTower = GreenTower
    this.RedTower = RedTower
    this.YellowTower = YellowTower
    this.Distance = Distance
  }

  newTower(towerType: number, x: number, y: number) {
    let tower = null

    switch (towerType) {
      case this.Const.GREEN_TOWER:
        tower = new this.GreenTower(
          this.greenTowerImages,
          x - this.Const.TOWER_OFFSET,
          y - this.Const.TOWER_OFFSET,
          this.Const,
          this.Distance,
        )
        break
      case this.Const.RED_TOWER:
        tower = new this.RedTower(
          this.redTowerImages,
          x - this.Const.TOWER_OFFSET,
          y - this.Const.TOWER_OFFSET,
          this.Const,
          this.Distance,
        )
        break
      case this.Const.YELLOW_TOWER:
        tower = new this.YellowTower(
          this.yellowTowerImages,
          x,
          y,
          this.Const,
          this.Distance,
        )
        break

      default:
        break
    }

    return tower
  }
}
