import { Position } from './types'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { Image } from 'p5'
import { Const } from './Const'

export class TowerGenerator {
  #greenTowerImages: Image[]
  #redTowerImages: Image[]
  #yellowTowerImages: Image[]

  constructor(
    greenTowerImages: Image[],
    redTowerImages: Image[],
    yellowTowerImages: Image[],
  ) {
    this.#greenTowerImages = greenTowerImages
    this.#redTowerImages = redTowerImages
    this.#yellowTowerImages = yellowTowerImages
  }

  newTower(towerId: number, position: Position) {
    let tower = null

    switch (towerId) {
      case TowerGreen.ID:
        tower = new TowerGreen(this.#greenTowerImages, {
          x: position.x - Const.TOWER_OFFSET,
          y: position.y - Const.TOWER_OFFSET,
        })
        break
      case TowerRed.ID:
        tower = new TowerRed(this.#redTowerImages, {
          x: position.x - Const.TOWER_OFFSET,
          y: position.y - Const.TOWER_OFFSET,
        })
        break
      case TowerYellow.ID:
        tower = new TowerYellow(this.#yellowTowerImages, {
          x: position.x,
          y: position.y,
        })
        break

      default:
        break
    }

    return tower
  }
}
