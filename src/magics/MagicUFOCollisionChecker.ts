import { Const } from '../constants/Const'
import { Enemy } from '../enemies/Enemy'
import { Position } from '../types/position'
import { PositionUtils } from '../utils/PositionUtils'
import { MagicUFO } from './MagicUFO'

export class MagicUFOCollisionChecker {
  #startPosition: Position
  constructor(startPosition: Position) {
    this.#startPosition = startPosition
  }
  isCollidingWithEnemy(ufo: MagicUFO, enemyTarget: Enemy | null) {
    if (!enemyTarget) {
      return false
    }
    return PositionUtils.isInsideRectangle(
      {
        x: ufo.position.x + Const.TILE_SIZE / 2,
        y: ufo.position.y + Const.TILE_SIZE / 2 + MagicUFO.OFFSET_COLLISION_Y,
      },
      {
        x: enemyTarget.position.x,
        y: enemyTarget.position.y,
      },
      { w: Const.TILE_SIZE, h: Const.TILE_SIZE },
    )
  }

  isCollidingWithStartPosition(ufo: MagicUFO) {
    return PositionUtils.isInsideRectangle(
      {
        x: ufo.position.x + Const.TILE_SIZE / 2,
        y: ufo.position.y + Const.TILE_SIZE / 2 + MagicUFO.OFFSET_COLLISION_Y,
      },
      {
        x: this.#startPosition.x,
        y: this.#startPosition.y,
      },
      { w: Const.TILE_SIZE, h: Const.TILE_SIZE },
    )
  }
}
