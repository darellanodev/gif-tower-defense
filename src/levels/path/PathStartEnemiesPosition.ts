import { TileStart } from '../tiles/TileStart'
import { Const } from '../../constants/Const'
import { ConstDirection } from '../../constants/ConstDirection'

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
      [ConstDirection.RIGHT]: { x: -Const.TILE_SIZE, y: 0 },
      [ConstDirection.UP]: { x: 0, y: Const.TILE_SIZE },
      [ConstDirection.DOWN]: { x: 0, y: -Const.TILE_SIZE },
    }

    const finalPosition = this.#tileStart.position
    const direction = this.#tileStart.getStartDirection()
    const offset = directionMap[direction] ?? { x: Const.TILE_SIZE, y: 0 } // LEFT by default

    return { x: finalPosition.x + offset.x, y: finalPosition.y + offset.y }
  }
}
