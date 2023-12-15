import { Const } from '../src/Const'

export class RedTower {
  UPGRADE_INFLUENCE_AREA = [150, 180, 220, 300, 400, 550]

  images: any
  x: number
  y: number
  upgradeLevel: number

  constructor(images: any, x: number, y: number) {
    this.images = images
    this.x = x
    this.y = y
    this.upgradeLevel = 0
  }

  upgrade() {
    this.upgradeLevel++
  }

  getUpgradeLevel() {
    return this.upgradeLevel
  }

  draw() {
    image(this.images[this.upgradeLevel], this.x, this.y)
  }

  getInfluenceArea() {
    return this.UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > Const.UPGRADE_MAX_LEVEL) {
      return Const.COST_UPGRADE_RED_TOWER[Const.UPGRADE_MAX_LEVEL]
    }
    return Const.COST_UPGRADE_RED_TOWER[selectedUpgradeLevel]
  }

  getCost() {
    return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel())
  }

  getType() {
    return Const.RED_TOWER
  }

  getColor() {
    return Const.RED_COLOR
  }

  selectTarget(enemies: any[]) {
    //TODO
  }
}
