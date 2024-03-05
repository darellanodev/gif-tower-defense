import { ConstType, Position } from './types'
import { GreenTower } from './GreenTower'
import { RedTower } from './RedTower'
import { YellowTower } from './YellowTower'
import { Distance } from './Distance'
import { ProgressBar } from './ProgressBar'
import { Image } from 'p5'

export class TowerGenerator {
  greenTowerImages: Image[]
  redTowerImages: Image[]
  yellowTowerImages: Image[]

  Const: ConstType
  GreenTowerClass: typeof GreenTower
  RedTowerClass: typeof RedTower
  YellowTowerClass: typeof YellowTower
  DistanceClass: typeof Distance
  ProgressBarClass: typeof ProgressBar

  constructor(
    greenTowerImages: Image[],
    redTowerImages: Image[],
    yellowTowerImages: Image[],
    Const: ConstType,
    GreenTowerClass: typeof GreenTower,
    RedTowerClass: typeof RedTower,
    YellowTowerClass: typeof YellowTower,
    DistanceClass: typeof Distance,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.greenTowerImages = greenTowerImages
    this.redTowerImages = redTowerImages
    this.yellowTowerImages = yellowTowerImages
    this.Const = Const
    this.GreenTowerClass = GreenTowerClass
    this.RedTowerClass = RedTowerClass
    this.YellowTowerClass = YellowTowerClass
    this.DistanceClass = DistanceClass
    this.ProgressBarClass = ProgressBarClass
  }

  newTower(towerId: number, position: Position) {
    let tower = null

    switch (towerId) {
      case this.Const.GREEN_TOWER:
        tower = new this.GreenTowerClass(
          this.greenTowerImages,
          {
            x: position.x - this.Const.TOWER_OFFSET,
            y: position.y - this.Const.TOWER_OFFSET,
          },
          this.Const,
          this.DistanceClass,
          this.ProgressBarClass,
        )
        break
      case this.Const.RED_TOWER:
        tower = new this.RedTowerClass(
          this.redTowerImages,
          {
            x: position.x - this.Const.TOWER_OFFSET,
            y: position.y - this.Const.TOWER_OFFSET,
          },
          this.Const,
          this.DistanceClass,
          this.ProgressBarClass,
        )
        break
      case this.Const.YELLOW_TOWER:
        tower = new this.YellowTowerClass(
          this.yellowTowerImages,
          { x: position.x, y: position.y },
          this.Const,
          this.DistanceClass,
          this.ProgressBarClass,
        )
        break

      default:
        break
    }

    return tower
  }
}
