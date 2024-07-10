import { Position } from '../types/position'
import { Const } from '../constants/Const'
import { TileOrange } from '../tiles/TileOrange'
import { Image } from 'p5'
import { TowerYellow } from './TowerYellow'
import { Player } from '../player/Player'

export class TowerYellowCreator {
  static #instance: TowerYellowCreator | null = null

  #images: Image[]
  #player: Player
  constructor(images: Image[], player: Player) {
    if (TowerYellowCreator.#instance !== null) {
      throw new Error(
        'TowerYellowCreator is a singleton class, use getInstance to get the instance',
      )
    }
    this.#images = images
    this.#player = player

    // assign the singleton instance
    TowerYellowCreator.#instance = this
  }

  static getInstance(images: Image[], player: Player) {
    if (TowerYellowCreator.#instance === null) {
      TowerYellowCreator.#instance = new TowerYellowCreator(images, player)
    }
    return TowerYellowCreator.#instance
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
