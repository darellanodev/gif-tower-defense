import { Position } from '../types/position'
import { Const } from '../constants/Const'
import { TileOrange } from '../tiles/TileOrange'
import { Image } from 'p5'
import { TowerRed } from './TowerRed'

export class TowerRedCreator {
  #images: Image[]
  constructor(images: Image[]) {
    this.#images = images
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
