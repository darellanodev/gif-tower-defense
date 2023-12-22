import { ConstType } from './types'
import { Distance } from './Distance'

export class YellowTower {
  x: number
  y: number
  upgradeLevel: number
  images: any[]
  Const: ConstType
  DistanceClass: typeof Distance

  constructor(
    images: any[],
    x: number,
    y: number,
    Const: ConstType,
    DistanceClass: typeof Distance,
  ) {
    this.images = images
    this.x = x
    this.y = y
    this.Const = Const
    this.DistanceClass = DistanceClass
    this.upgradeLevel = 0
  }

  upgrade() {
    this.upgradeLevel++
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  getUpgradeLevel() {
    return this.upgradeLevel
  }

  draw() {
    image(this.images[this.upgradeLevel], this.x, this.y)
  }

  getInfluenceArea() {
    return this.Const.YELLOW_TOWER_UPGRADE_INFLUENCE_AREA[this.upgradeLevel]
  }

  getCostWhenUpgradeLevelIs(selectedUpgradeLevel: number) {
    if (selectedUpgradeLevel > this.Const.UPGRADE_MAX_LEVEL) {
      return this.Const.COST_UPGRADE_YELLOW_TOWER[this.Const.UPGRADE_MAX_LEVEL]
    }
    return this.Const.COST_UPGRADE_YELLOW_TOWER[selectedUpgradeLevel]
  }

  getCost() {
    return this.getCostWhenUpgradeLevelIs(this.getUpgradeLevel())
  }

  getType() {
    return this.Const.YELLOW_TOWER
  }

  getColor() {
    return this.Const.YELLOW_COLOR
  }

  selectTarget(enemies: any[]) {
    //TODO
  }
}
