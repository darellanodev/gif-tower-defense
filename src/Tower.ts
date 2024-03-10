import { Position } from './types'
import { Const } from './Const'

export class Tower {
  #position: Position
  #upgrading: boolean = false
  #upgradeLevel: number = 0
  constructor(position: Position) {
    this.#position = { ...position }
    this.#upgrading = false
    this.#upgradeLevel = 0
  }

  get notUpgrading() {
    return !this.#upgrading
  }

  get position() {
    return this.#position
  }

  get upgradeLevel() {
    return this.#upgradeLevel
  }

  get maxUpgraded() {
    return this.#upgradeLevel === Const.UPGRADE_MAX_LEVEL - 1
  }
}
