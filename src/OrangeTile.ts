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
  greenTowerImages: any[]
  redTowerImages: any[]
  yellowTowerImages: any[]

  Const: any
  GreenTower: any
  RedTower: any
  YellowTower: any
  UpgradeDisplay: any
  Distance: any

  constructor(
    img: any,
    x: number,
    y: number,
    greenTowerImages: any[],
    redTowerImages: any[],
    yellowTowerImages: any[],
    Const: any,
    GreenTower: any,
    RedTower: any,
    YellowTower: any,
    UpgradeDisplay: any,
    Distance: any,
  ) {
    this.img = img
    this.x = x
    this.y = y
    this.greenTowerImages = greenTowerImages
    this.redTowerImages = redTowerImages
    this.yellowTowerImages = yellowTowerImages
    this.Const = Const
    this.GreenTower = GreenTower
    this.RedTower = RedTower
    this.YellowTower = YellowTower
    this.UpgradeDisplay = UpgradeDisplay
    this.Distance = Distance

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
      this.upgradeDisplay = new this.UpgradeDisplay(
        this.x,
        this.y,
        this.tower.getColor(),
      )
    }
  }

  _newTower(towerType: number) {
    let tower = null

    switch (towerType) {
      case this.Const.GREEN_TOWER:
        tower = new this.GreenTower(
          this.greenTowerImages,
          this.x - this.TOWER_OFFSET,
          this.y - this.TOWER_OFFSET,
          this.Const,
          this.Distance,
        )
        break
      case this.Const.RED_TOWER:
        tower = new this.RedTower(
          this.redTowerImages,
          this.x - this.TOWER_OFFSET,
          this.y - this.TOWER_OFFSET,
          this.Const,
          this.Distance,
        )
        break
      case this.Const.YELLOW_TOWER:
        tower = new this.YellowTower(
          this.yellowTowerImages,
          this.x,
          this.y,
          this.Const,
          this.Distance,
        )
        break

      default:
        break
    }

    this.tower = tower
  }

  buyTower(towerType: number) {
    let cost = 0

    if (this.tower === null) {
      this._newTower(towerType)
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

  _setInfluenceAreaColor(towerType: number) {
    const GREEN_COLOR: [number, number, number] = [75, 185, 35]
    const RED_COLOR: [number, number, number] = [185, 35, 35]
    const YELLOW_COLOR: [number, number, number] = [202, 191, 24]

    switch (towerType) {
      case this.Const.GREEN_TOWER:
        stroke(...GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
        break

      case this.Const.RED_TOWER:
        stroke(...RED_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...RED_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
        break

      case this.Const.YELLOW_TOWER:
        stroke(...YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
        fill(...YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
        break
    }

    // switch (towerType) {
    //   case this.Const.GREEN_TOWER:
    //     stroke(...this.Const.GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
    //     fill(...this.Const.GREEN_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
    //     break

    //   case this.Const.RED_TOWER:
    //     stroke(...this.Const.RED_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
    //     fill(...this.Const.RED_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
    //     break

    //   case this.Const.YELLOW_TOWER:
    //     stroke(...this.Const.YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_STROKE)
    //     fill(...this.Const.YELLOW_COLOR, this.ALPHA_INFLUENCE_AREA_FILL)
    //     break
    // }
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

  _getInfluenceAreaFor(towerSelected: any) {
    let influenceArea: number = this.GREEN_TOWER_INFLUENCE_AREA
    switch (towerSelected) {
      case this.Const.GREEN_TOWER:
        influenceArea = this.GREEN_TOWER_INFLUENCE_AREA

      case this.Const.RED_TOWER:
        influenceArea = this.RED_TOWER_INFLUENCE_AREA

      case this.Const.YELLOW_TOWER:
        influenceArea = this.YELLOW_TOWER_INFLUENCE_AREA
    }
    return influenceArea
  }

  drawInfluenceArea(towerSelected: any) {
    let influenceArea: number = 120
    strokeWeight(2)

    if (this.tower) {
      influenceArea = this.tower.getInfluenceArea()
      this._setInfluenceAreaColor(this.tower.getType())
    } else {
      this._setInfluenceAreaColor(towerSelected)
      influenceArea = this._getInfluenceAreaFor(towerSelected)
    }
    circle(
      this.x + this.Const.TILE_SIZE / 2,
      this.y + this.Const.TILE_SIZE / 2,
      influenceArea,
    )
  }

  selectHudType(hud: any) {
    if (this.hasTower()) {
      if (this.tower.getUpgradeLevel() < this.Const.UPGRADE_MAX_LEVEL) {
        hud.setType(this.Const.HUD_UPGRADING)
      } else {
        hud.setType(this.Const.HUD_UPGRADING_MAX)
      }
    } else {
      hud.setType(this.Const.HUD_NORMAL)
    }
  }
}
