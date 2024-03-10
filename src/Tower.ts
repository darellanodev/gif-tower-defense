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

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    // To implement in child export classes
  }

  get cost() {
    return this.getCostWhenUpgradeLevelIs(this.upgradeLevel)
  }

  get nextLevelUpgradeCost() {
    if (this.maxUpgraded) {
      return this.getCostWhenUpgradeLevelIs(Const.UPGRADE_MAX_LEVEL - 1)
    } else {
      return this.getCostWhenUpgradeLevelIs(this.upgradeLevel + 1)
    }
  }
}
