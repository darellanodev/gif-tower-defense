import { Position } from './types'
import { Const } from './Const'
import { ProgressBar } from './ProgressBar'

export class Tower {
  position: Position
  upgrading: boolean = false
  upgradeLevel: number = 0
  progressBar: ProgressBar
  upgradeProgress: number = 0
  delayUpgradeProgress: number

  constructor(position: Position) {
    this.position = { ...position }

    this.progressBar = new ProgressBar(
      {
        x: this.position.x + Const.TOWER_OFFSET,
        y: this.position.y + Const.TOWER_OFFSET,
      },
      { w: ProgressBar.WIDTH, h: ProgressBar.HEIGHT },
    )
  }

  get notUpgrading() {
    return !this.upgrading
  }

  get maxUpgraded() {
    return this.upgradeLevel === Const.UPGRADE_MAX_LEVEL - 1
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number): number {
    // To implement in child export classes
    return null
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
