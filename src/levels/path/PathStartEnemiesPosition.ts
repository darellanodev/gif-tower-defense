import { TileStart } from '../tiles/TileStart'
import { TILE_SIZE } from '../../constants/tile'
import { DIRECTION } from '../../constants/direction'

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

    const directionMap: Record<number, { x: number; y: number }> = {
      [DIRECTION.RIGHT]: { x: -TILE_SIZE, y: 0 },
      [DIRECTION.UP]: { x: 0, y: TILE_SIZE },
      [DIRECTION.DOWN]: { x: 0, y: -TILE_SIZE },
    }

    const finalPosition = this.#tileStart.position
    const direction = this.#tileStart.getStartDirection()
    const offset = directionMap[direction] ?? { x: TILE_SIZE, y: 0 } // LEFT by default

    return { x: finalPosition.x + offset.x, y: finalPosition.y + offset.y }
  }
}
