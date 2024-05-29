import { Obj } from '../Obj'
import { Const } from '../constants/Const'
import { Position } from '../types/position'

export class Magic extends Obj {
  startPosition: Position

  status: number

  constructor(startPosition: Position) {
    super(startPosition)
    this.startPosition = { ...startPosition }
    this.status = Const.MAGIC_STATUS_ALIVE
  }

  die() {
    this.status = Const.MAGIC_STATUS_DEAD
  }

  isAlive() {
    return this.status == Const.MAGIC_STATUS_ALIVE
  }
}
