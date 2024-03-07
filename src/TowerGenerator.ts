import { ConstType, Position } from './types'
import { GreenTower } from './GreenTower'
import { RedTower } from './RedTower'
import { YellowTower } from './YellowTower'
import { MathUtils } from './MathUtils'
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
  MathUtilsClass: typeof MathUtils
  ProgressBarClass: typeof ProgressBar

  constructor(
    greenTowerImages: Image[],
    redTowerImages: Image[],
    yellowTowerImages: Image[],
    Const: ConstType,
    GreenTowerClass: typeof GreenTower,
    RedTowerClass: typeof RedTower,
    YellowTowerClass: typeof YellowTower,
    MathUtilsClass: typeof MathUtils,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.greenTowerImages = greenTowerImages
    this.redTowerImages = redTowerImages
    this.yellowTowerImages = yellowTowerImages
    this.Const = Const
    this.GreenTowerClass = GreenTowerClass
    this.RedTowerClass = RedTowerClass
    this.YellowTowerClass = YellowTowerClass
    this.MathUtilsClass = MathUtilsClass
    this.ProgressBarClass = ProgressBarClass
  }

  newTower(towerId: number, position: Position) {
    let tower = null

    switch (towerId) {
      case GreenTower.ID:
        tower = new this.GreenTowerClass(
          this.greenTowerImages,
          {
            x: position.x - this.Const.TOWER_OFFSET,
            y: position.y - this.Const.TOWER_OFFSET,
          },
          this.Const,
          this.MathUtilsClass,
          this.ProgressBarClass,
        )
        break
      case RedTower.ID:
        tower = new this.RedTowerClass(
          this.redTowerImages,
          {
            x: position.x - this.Const.TOWER_OFFSET,
            y: position.y - this.Const.TOWER_OFFSET,
          },
          this.Const,
          this.MathUtilsClass,
          this.ProgressBarClass,
        )
        break
      case YellowTower.ID:
        tower = new this.YellowTowerClass(
          this.yellowTowerImages,
          { x: position.x, y: position.y },
          this.Const,
          this.MathUtilsClass,
          this.ProgressBarClass,
        )
        break

      default:
        break
    }

    return tower
  }
}
