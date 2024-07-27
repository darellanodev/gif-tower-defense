import { TileStart } from '../tiles/TileStart'
import { Const } from '../constants/Const'
import { ConstDirection } from '../constants/ConstDirection'

export class PathStartEnemiesPosition {
  static #instance: PathStartEnemiesPosition | null = null

  #tileStart: TileStart | null = null

  constructor() {
    if (PathStartEnemiesPosition.#instance !== null) {
      throw new Error(
        'PathStartEnemiesPosition is a singleton class, use getInstance to get the instance',
      )
    }

    // assign the singleton instance
    PathStartEnemiesPosition.#instance = this
  }

  static getInstance() {
    if (PathStartEnemiesPosition.#instance === null) {
      PathStartEnemiesPosition.#instance = new PathStartEnemiesPosition()
    }
    return PathStartEnemiesPosition.#instance
  }

  set tileStart(tileStart: TileStart) {
    this.#tileStart = tileStart
  }

  get() {
    if (this.#tileStart === null) {
      throw new Error('tileStart is null')
    }
    let finalX = 0
    let finalY = 0

    // LEFT by default
    const finalPosition = this.#tileStart.position

    switch (this.#tileStart.getStartDirection()) {
      case ConstDirection.RIGHT:
        finalX = finalPosition.x - Const.TILE_SIZE
        finalY = finalPosition.y
        break
      case ConstDirection.UP:
        finalX = finalPosition.x
        finalY = finalPosition.y + Const.TILE_SIZE
        break
      case ConstDirection.DOWN:
        finalX = finalPosition.x
        finalY = finalPosition.y - Const.TILE_SIZE
        break
      default:
        // LEFT by default
        finalX = finalPosition.x + Const.TILE_SIZE
        finalY = finalPosition.y
        break
    }

    return { x: finalX, y: finalY }
  }
}
