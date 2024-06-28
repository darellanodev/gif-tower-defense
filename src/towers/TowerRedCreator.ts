import { Position } from '../types/position'
import { Const } from '../constants/Const'
import { TileOrange } from '../tiles/TileOrange'
import { Image } from 'p5'
import { TowerRed } from './TowerRed'

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
        x: position.x - Const.TOWER_OFFSET,
        y: position.y - Const.TOWER_OFFSET,
      },
      tileOrange,
      this.#images,
    )
  }
}
