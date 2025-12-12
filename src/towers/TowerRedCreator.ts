import { Position } from '../types/position'
import { TileOrange } from '../levels/tiles/TileOrange'
import { Image } from 'p5'
import { TowerRed } from './TowerRed'
import { Tower } from './Tower'

export class TowerRedCreator {
  static #instance: TowerRedCreator | null = null

  #images: Image[]
  constructor(images: Image[]) {
    if (TowerRedCreator.#instance !== null) {
      throw new Error(
        'TowerRedCreator is a singleton class, use getInstance to get the instance',
      )
    }
    this.#images = images

    // assign the singleton instance
    TowerRedCreator.#instance = this
  }
  static getInstance(images: Image[]) {
    if (TowerRedCreator.#instance === null) {
      TowerRedCreator.#instance = new TowerRedCreator(images)
    }
    return TowerRedCreator.#instance
  }
  create(position: Position, tileOrange: TileOrange) {
    return new TowerRed(
      {
        x: position.x - Tower.TOWER_OFFSET,
        y: position.y - Tower.TOWER_OFFSET,
      },
      tileOrange,
      this.#images,
    )
  }
}
