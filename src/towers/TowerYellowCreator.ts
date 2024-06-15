import { Position } from '../types/position'
import { Const } from '../constants/Const'
import { TileOrange } from '../tiles/TileOrange'
import { Image } from 'p5'
import { TowerYellow } from './TowerYellow'
import { Player } from '../player/Player'

export class TowerYellowCreator {
  #images: Image[]
  #player: Player
  constructor(images: Image[], player: Player) {
    this.#images = images
    this.#player = player
  }

  create(position: Position, tileOrange: TileOrange) {
    return new TowerYellow(
      {
        x: position.x - Const.TOWER_OFFSET,
        y: position.y - Const.TOWER_OFFSET,
      },
      tileOrange,
      this.#player,
      this.#images,
    )
  }
}
