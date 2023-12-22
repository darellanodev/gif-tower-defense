import { ConstType, TowerType } from './types'
import { TowerGenerator } from './TowerGenerator'
import { UpgradeDisplay } from './UpgradeDisplay'

export class OrangeTile {
  img: any
  x: number
  y: number
  Const: ConstType
  UpgradeDisplayClass: typeof UpgradeDisplay
  towerGenerator: TowerGenerator

  tower: TowerType
  upgradeDisplay: any

  constructor(
    img: any,
    x: number,
    y: number,
    Const: ConstType,
    UpgradeDisplayClass: typeof UpgradeDisplay,
    towerGenerator: TowerGenerator,
  ) {
    this.img = img
    this.x = x
    this.y = y
    this.Const = Const
    this.UpgradeDisplayClass = UpgradeDisplayClass
    this.towerGenerator = towerGenerator

    this.tower = null
    this.upgradeDisplay = null
  }

  sellTower() {
    let profit = 0

    if (this.tower) {
      profit = this.tower.getCost()
      this.tower = null
    }
    return profit
  }

  _showUpgradeDisplay(towerType: number) {
    if (this.upgradeDisplay === null) {
      this.upgradeDisplay = new this.UpgradeDisplayClass(
        this.x,
        this.y,
        this.tower.getColor(),
      )
    }
  }

  buyTower(towerType: number) {
    let cost = 0

    if (this.tower === null) {
      this.tower = this.towerGenerator.newTower(towerType, this.x, this.y)
      cost = this.tower.getCost()
    } else {
      const currentUpgradeLevel = this.tower.getUpgradeLevel()
      if (currentUpgradeLevel < this.Const.UPGRADE_MAX_LEVEL) {
        this._showUpgradeDisplay(towerType)
        cost = this.tower.getCostWhenUpgradeLevelIs(currentUpgradeLevel + 1)
      }
    }

    return cost
  }

  updateUpgradeDisplay() {
    if (this.upgradeDisplay) {
      if (this.upgradeDisplay.isFinished()) {
        this.upgradeDisplay = null
        this._upgradeTower()
      }
    }
  }

  _upgradeTower() {
    if (this.tower) {
      this.tower.upgrade()
    }
  }

  drawTile() {
    image(this.img, this.x, this.y)
  }

  drawUpgradeDisplay() {
    if (this.upgradeDisplay) {
      this.upgradeDisplay.draw()
    }
  }

  drawTower() {
    if (this.tower && this.upgradeDisplay === null) {
      this.tower.draw()
    }
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  selectTarget(enemies: any[]) {
    if (this.tower) {
      this.tower.selectTarget(enemies)
    }
  }

  isInside(mouse_x: number, mouse_y: number) {
    let insideX = false
    let insideY = false

    if (this.x < mouse_x && this.x + this.Const.TILE_SIZE > mouse_x) {
      insideX = true
    }
    if (this.y < mouse_y && this.y + this.Const.TILE_SIZE > mouse_y) {
      insideY = true
    }

    if (insideX && insideY) {
      return true
    }
    return false
  }

  hasTower() {
    return this.tower !== null
  }

  getTower() {
    if (this.hasTower()) {
      return this.tower
    }
    return null
  }
}
