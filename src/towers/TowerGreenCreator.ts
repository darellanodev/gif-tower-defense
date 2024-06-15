import { Position } from '../types/position'
import { Const } from '../constants/Const'
import { TileOrange } from '../tiles/TileOrange'
import { Image } from 'p5'
import { TowerGreen } from './TowerGreen'

export class TowerGreenCreator {
  #images: Image[]
  constructor(images: Image[]) {
    this.#images = images
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
