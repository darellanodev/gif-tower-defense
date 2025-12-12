import { ConstTile } from '../constants/ConstTile'
import { Enemy } from '../enemies/Enemy'
import { Position } from '../types/position'
import { PositionInsideRectangle } from '../utils/PositionInsideRectangle'
import { MagicUFO } from './MagicUFO'

export class MagicUFOCollisionChecker {
  #startPosition: Position
  #positionInsideRectangle: PositionInsideRectangle
  constructor(startPosition: Position) {
    this.#startPosition = startPosition
    this.#positionInsideRectangle = new PositionInsideRectangle()
  }
  isCollidingWithEnemy(ufo: MagicUFO, enemyTarget: Enemy | null) {
    if (!enemyTarget) {
      return false
    }
    return this.#positionInsideRectangle.check(
      {
        x: ufo.position.x + ConstTile.SIZE / 2,
        y: ufo.position.y + ConstTile.SIZE / 2 + MagicUFO.OFFSET_COLLISION_Y,
      },
      {
        x: enemyTarget.position.x,
        y: enemyTarget.position.y,
      },
      { w: ConstTile.SIZE, h: ConstTile.SIZE },
    )
  }

  isCollidingWithStartPosition(ufo: MagicUFO) {
    return this.#positionInsideRectangle.check(
      {
        x: ufo.position.x + ConstTile.SIZE / 2,
        y: ufo.position.y + ConstTile.SIZE / 2 + MagicUFO.OFFSET_COLLISION_Y,
      },
      {
        x: this.#startPosition.x,
        y: this.#startPosition.y,
      },
      { w: ConstTile.SIZE, h: ConstTile.SIZE },
    )
  }
}
