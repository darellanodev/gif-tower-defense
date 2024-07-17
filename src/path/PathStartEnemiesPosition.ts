import { TileStart } from '../tiles/TileStart'
import { Const } from '../constants/Const'
import { ConstDirection } from '../constants/ConstDirection'

export class PathStartEnemiesPosition {
  static #instance: PathStartEnemiesPosition | null = null

  #tileStart: TileStart

  constructor(tileStart: TileStart) {
    if (PathStartEnemiesPosition.#instance !== null) {
      throw new Error(
        'PathStartEnemiesPosition is a singleton class, use getInstance to get the instance',
      )
    }
    this.#tileStart = tileStart

    // assign the singleton instance
    PathStartEnemiesPosition.#instance = this
  }

  static getInstance(tileStart: TileStart) {
    if (PathStartEnemiesPosition.#instance === null) {
      PathStartEnemiesPosition.#instance = new PathStartEnemiesPosition(
        tileStart,
      )
    }
    return PathStartEnemiesPosition.#instance
  }

  get() {
    let finalX = 0
    let finalY = 0

    if (this.#tileStart.getStartDirection() === ConstDirection.LEFT) {
      const finalPosition = this.#tileStart.position
      finalX = finalPosition.x + Const.TILE_SIZE
      finalY = finalPosition.y
    }

    return { x: finalX, y: finalY }
  }
}
