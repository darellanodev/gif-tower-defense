import { Const } from '../src/Const'
import { GreenTower } from '../src/GreenTower'
import { RedTower } from '../src/RedTower'
import { YellowTower } from '../src/YellowTower'
import { UpgradeDisplay } from '../src/UpgradeDisplay'

export class OrangeTile {
  TOWER_OFFSET = 5

  UPGRADE_MAX_LEVEL = 5

  GREEN_TOWER_INFLUENCE_AREA = 150
  RED_TOWER_INFLUENCE_AREA = 240
  YELLOW_TOWER_INFLUENCE_AREA = 290

  ALPHA_INFLUENCE_AREA_FILL = 50
  ALPHA_INFLUENCE_AREA_STROKE = 120

  x: number
  y: number
  img: any
  tower: any
  upgradeDisplay: any

  constructor(img: any, x: number, y: number) {
    this.x = x
    this.y = y
    this.img = img
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
      this.upgradeDisplay = new UpgradeDisplay(
        this.x,
        this.y,
        this.tower.getColor(),
      )
    }
  }

  _newTower(towerType: number) {
    let tower = null

    switch (towerType) {
      case Const.GREEN_TOWER:
        tower = new GreenTower(
          greenTowerImages,
          this.x - this.TOWER_OFFSET,
          this.y - this.TOWER_OFFSET,
        )
        break
      case Const.RED_TOWER:
        tower = new RedTower(
          redTowerImages,
          this.x - this.TOWER_OFFSET,
          this.y - this.TOWER_OFFSET,
        )
        break
      case Const.YELLOW_TOWER:
        tower = new YellowTower(yellowTowerImages, this.x, this.y)
        break

      default:
        break
    }

    this.tower = tower
  }

  haveMoneyToBuy(towerType: number, money: number) {
    let canBuy = false

    if (this.tower) {
      const currentUpgradeLevel = this.tower.getUpgradeLevel()
      const costToUpgrade = this.tower.getCostWhenUpgradeLevelIs(
        currentUpgradeLevel + 1,
      )
      canBuy = costToUpgrade <= money
    } else {
      switch (towerType) {
        case Const.GREEN_TOWER:
          canBuy = Const.COST_UPGRADE_GREEN_TOWER[0] <= money
          break
        case Const.RED_TOWER:
          canBuy = Const.COST_UPGRADE_RED_TOWER[0] <= money
          break
        case Const.YELLOW_TOWER:
          canBuy = Const.COST_UPGRADE_YELLOW_TOWER[0] <= money
          break

        default:
          break
      }
    }

    return canBuy
  }

  buyTower(towerType: number) {
    let cost = 0

    if (this.tower === null) {
      this._newTower(towerType)
      cost = this.tower.getCost()
    } else {
      const currentUpgradeLevel = this.tower.getUpgradeLevel()
      if (currentUpgradeLevel < Const.UPGRADE_MAX_LEVEL) {
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

    if (this.x < mouse_x && this.x + Const.TILE_SIZE > mouse_x) {
      insideX = true
    }
    if (this.y < mouse_y && this.y + Const.TILE_SIZE > mouse_y) {
      insideY = true
    }

    if (insideX && insideY) {
      return true
    }
    return false
  }

  _setInfluenceAreaColor(towerType: number) {
    switch (towerType) {
      case Const.GREEN_TOWER:
        stroke(...Const.GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...Const.GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
        break

      case Const.RED_TOWER:
        stroke(...Const.RED_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...Const.RED_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
        break

      case Const.YELLOW_TOWER:
        stroke(...Const.YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...Const.YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
        break
    }
  }

  hasTower() {
    return this.tower !== null
  }

  _getInfluenceAreaFor(towerSelected: any) {
    switch (towerSelected) {
      case Const.GREEN_TOWER:
        return this.GREEN_TOWER_INFLUENCE_AREA

      case Const.RED_TOWER:
        return this.RED_TOWER_INFLUENCE_AREA

      case Const.YELLOW_TOWER:
        return this.YELLOW_TOWER_INFLUENCE_AREA
    }
  }

  drawInfluenceArea(towerSelected: any) {
    let influenceArea = 120
    strokeWeight(2)

    if (this.tower) {
      influenceArea = this.tower.getInfluenceArea()
      this._setInfluenceAreaColor(this.tower.getType())
    } else {
      this._setInfluenceAreaColor(towerSelected)
      influenceArea = this._getInfluenceAreaFor(towerSelected)
    }
    circle(
      this.x + Const.TILE_SIZE / 2,
      this.y + Const.TILE_SIZE / 2,
      influenceArea,
    )
  }

  selectHudType(hud: any) {
    if (this.hasTower()) {
      if (this.tower.getUpgradeLevel() < Const.UPGRADE_MAX_LEVEL) {
        hud.setType(Const.HUD_UPGRADING)
      } else {
        hud.setType(Const.HUD_UPGRADING_MAX)
      }
    } else {
      hud.setType(Const.HUD_NORMAL)
    }
  }
}
