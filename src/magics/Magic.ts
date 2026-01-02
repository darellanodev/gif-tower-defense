import { MAGIC_STATUS } from '../constants/magics'
import { Obj } from '../Obj'
import { Position } from '../types/position'

export class Magic extends Obj {
  startPosition: Position

  status: number

  constructor(startPosition: Position) {
    super(startPosition)
    this.startPosition = { ...startPosition }
    this.status = MAGIC_STATUS.ALIVE
  }

  die() {
    this.status = MAGIC_STATUS.DEAD
  }

  get isAlive() {
    return this.status == MAGIC_STATUS.ALIVE
  }
}
