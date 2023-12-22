import { ConstType } from './types'
import { GreenTower } from './GreenTower'
import { RedTower } from './RedTower'
import { YellowTower } from './YellowTower'

export class TowerGenerator {
  greenTowerImages: any[]
  redTowerImages: any[]
  yellowTowerImages: any[]

  Const: ConstType
  GreenTowerClass: typeof GreenTower
  RedTowerClass: typeof RedTower
  YellowTowerClass: typeof YellowTower
  Distance: any

  constructor(
    greenTowerImages: any[],
    redTowerImages: any[],
    yellowTowerImages: any[],
    Const: ConstType,
    GreenTowerClass: typeof GreenTower,
    RedTowerClass: typeof RedTower,
    YellowTowerClass: typeof YellowTower,
    Distance: any,
  ) {
    this.greenTowerImages = greenTowerImages
    this.redTowerImages = redTowerImages
    this.yellowTowerImages = yellowTowerImages
    this.Const = Const
    this.GreenTowerClass = GreenTowerClass
    this.RedTowerClass = RedTowerClass
    this.YellowTowerClass = YellowTowerClass
    this.Distance = Distance
  }

  newTower(towerType: number, x: number, y: number) {
    let tower = null

    switch (towerType) {
      case this.Const.GREEN_TOWER:
        tower = new this.GreenTowerClass(
          this.greenTowerImages,
          x - this.Const.TOWER_OFFSET,
          y - this.Const.TOWER_OFFSET,
          this.Const,
          this.Distance,
        )
        break
      case this.Const.RED_TOWER:
        tower = new this.RedTowerClass(
          this.redTowerImages,
          x - this.Const.TOWER_OFFSET,
          y - this.Const.TOWER_OFFSET,
          this.Const,
          this.Distance,
        )
        break
      case this.Const.YELLOW_TOWER:
        tower = new this.YellowTowerClass(
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
