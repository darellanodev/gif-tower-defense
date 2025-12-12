import { Obj } from '../Obj'
import { Position } from '../types/position'

export class Magic extends Obj {
  static MAGIC_STATUS_ALIVE = 0
  static MAGIC_STATUS_DEAD = 1

  startPosition: Position

  status: number

  constructor(startPosition: Position) {
    super(startPosition)
    this.startPosition = { ...startPosition }
    this.status = Magic.MAGIC_STATUS_ALIVE
  }

  die() {
    this.status = Magic.MAGIC_STATUS_DEAD
  }

  get alive() {
    return this.status == Magic.MAGIC_STATUS_ALIVE
  }
}
