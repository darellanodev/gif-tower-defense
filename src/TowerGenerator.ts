import { Position } from './types'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { Image } from 'p5'
import { Const } from './Const'

export class TowerGenerator {
  static greenTowerImages: Image[]
  static redTowerImages: Image[]
  static yellowTowerImages: Image[]

  static initialize(
    greenTowerImages: Image[],
    redTowerImages: Image[],
    yellowTowerImages: Image[],
  ) {
    TowerGenerator.greenTowerImages = greenTowerImages
    TowerGenerator.redTowerImages = redTowerImages
    TowerGenerator.yellowTowerImages = yellowTowerImages
  }

  static newTower(towerId: number, position: Position) {
    let tower = null

    switch (towerId) {
      case TowerGreen.ID:
        tower = new TowerGreen(TowerGenerator.greenTowerImages, {
          x: position.x - Const.TOWER_OFFSET,
          y: position.y - Const.TOWER_OFFSET,
        })
        break
      case TowerRed.ID:
        tower = new TowerRed(TowerGenerator.redTowerImages, {
          x: position.x - Const.TOWER_OFFSET,
          y: position.y - Const.TOWER_OFFSET,
        })
        break
      case TowerYellow.ID:
        tower = new TowerYellow(TowerGenerator.yellowTowerImages, {
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
