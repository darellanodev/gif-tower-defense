import { Position } from '../types/position'
import { TileOrange } from '../levels/tiles/TileOrange'
import { Image } from 'p5'
import { TowerGreen } from './TowerGreen'
import { Tower } from './Tower'
import { TOWER_CREATION_OFFSET } from '../constants/tower'

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

    // assign the singleton instance
    TowerGreenCreator.#instance = this
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
        x: position.x - TOWER_CREATION_OFFSET.X,
        y: position.y - TOWER_CREATION_OFFSET.Y,
      },
      tileOrange,
      this.#images,
    )
  }
}
