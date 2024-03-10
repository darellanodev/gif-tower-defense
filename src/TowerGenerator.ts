import { Position } from './types'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { MathUtils } from './MathUtils'
import { ProgressBar } from './ProgressBar'
import { Image } from 'p5'
import { Const } from './Const'

export class TowerGenerator {
  #greenTowerImages: Image[]
  #redTowerImages: Image[]
  #yellowTowerImages: Image[]
  #TowerGreenClass: typeof TowerGreen
  #TowerRedClass: typeof TowerRed
  #TowerYellowClass: typeof TowerYellow
  #MathUtilsClass: typeof MathUtils
  #ProgressBarClass: typeof ProgressBar

  constructor(
    greenTowerImages: Image[],
    redTowerImages: Image[],
    yellowTowerImages: Image[],
    TowerGreenClass: typeof TowerGreen,
    TowerRedClass: typeof TowerRed,
    TowerYellowClass: typeof TowerYellow,
    MathUtilsClass: typeof MathUtils,
    ProgressBarClass: typeof ProgressBar,
  ) {
    this.#greenTowerImages = greenTowerImages
    this.#redTowerImages = redTowerImages
    this.#yellowTowerImages = yellowTowerImages
    this.#TowerGreenClass = TowerGreenClass
    this.#TowerRedClass = TowerRedClass
    this.#TowerYellowClass = TowerYellowClass
    this.#MathUtilsClass = MathUtilsClass
    this.#ProgressBarClass = ProgressBarClass
  }

  newTower(towerId: number, position: Position) {
    let tower = null

    switch (towerId) {
      case TowerGreen.ID:
        tower = new this.#TowerGreenClass(
          this.#greenTowerImages,
          {
            x: position.x - Const.TOWER_OFFSET,
            y: position.y - Const.TOWER_OFFSET,
          },
          this.#MathUtilsClass,
          this.#ProgressBarClass,
        )
        break
      case TowerRed.ID:
        tower = new this.#TowerRedClass(
          this.#redTowerImages,
          {
            x: position.x - Const.TOWER_OFFSET,
            y: position.y - Const.TOWER_OFFSET,
          },
          this.#MathUtilsClass,
          this.#ProgressBarClass,
        )
        break
      case TowerYellow.ID:
        tower = new this.#TowerYellowClass(
          this.#yellowTowerImages,
          { x: position.x, y: position.y },
          this.#MathUtilsClass,
          this.#ProgressBarClass,
        )
        break

      default:
        break
    }

    return tower
  }
}
