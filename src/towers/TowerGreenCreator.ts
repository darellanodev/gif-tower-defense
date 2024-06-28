import { Position } from '../types/position'
import { Const } from '../constants/Const'
import { TileOrange } from '../tiles/TileOrange'
import { Image } from 'p5'
import { TowerGreen } from './TowerGreen'

export class TowerGreenCreator {
  static #instance: TowerGreenCreator | null = null

  #images: Image[]
  constructor(images: Image[]) {
    if (TowerGreenCreator.#instance !== null) {
      throw new Error(
        'TowerGreenCreator is a singleton class, use getInstance to get the instance',
      )
    }
    this.#images = images
  }
  static getInstance(images: Image[]) {
    if (TowerGreenCreator.#instance === null) {
      TowerGreenCreator.#instance = new TowerGreenCreator(images)
    }
    return TowerGreenCreator.#instance
  }
  create(position: Position, tileOrange: TileOrange) {
    return new TowerGreen(
      {
        x: position.x - Const.TOWER_OFFSET,
        y: position.y - Const.TOWER_OFFSET,
      },
      tileOrange,
      this.#images,
    )
  }
}
