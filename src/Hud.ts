export class Hud {
  hudNormal: any
  hudUpgrading: any
  hudUpgradingMax: any
  hudType: any
  selectedItem: number
  hudImages: any[]
  money: number
  Const: any

  constructor(hudImages: any[], money: number, Const: any) {
    this.hudImages = hudImages
    this.money = money
    this.Const = Const

    this.hudNormal = this.hudImages[0]
    this.hudUpgrading = this.hudImages[1]
    this.hudUpgradingMax = this.hudImages[2]

    this.hudType = this.Const.HUD_NORMAL

    this.selectedItem = this.Const.GREEN_TOWER
  }

  isInsideButtonsBar(px: number, py: number) {
    if (px > 0 && px < 800 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideGreenTowerButton(px: number, py: number) {
    if (px > 0 && px < 98 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideRedTowerButton(px: number, py: number) {
    if (px > 98 && px < 180 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideYellowTowerButton(px: number, py: number) {
    if (px > 180 && px < 263 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  selectTower(towerType: number) {
    this.selectedItem = towerType
  }

  getSelectedTower() {
    return this.selectedItem
  }

  setType(hudType: number) {
    this.hudType = hudType
  }

  draw() {
    switch (this.hudType) {
      case this.Const.HUD_NORMAL:
        image(this.hudNormal, 0, 0)

        this._drawSelectedItem()
        this._drawLevelTitle()
        break

      case this.Const.HUD_UPGRADING:
        image(this.hudUpgrading, 0, 0)
        break

      case this.Const.HUD_UPGRADING_MAX:
        image(this.hudUpgradingMax, 0, 0)
        break
    }

    this._drawMoney()
  }

  setMoney(money: number) {
    this.money = money
  }

  _drawMoney() {
    fill(255)
    stroke(0)
    strokeWeight(4)
    text(this.money, 445, 48)
  }

  _drawLevelTitle() {
    fill(255)
    stroke(0)
    strokeWeight(4)
    text('Serpent by Ocliboy', 130, 18)
  }

  _drawSelectedItem() {
    strokeWeight(3)
    stroke(255, 204, 0)
    noFill()

    switch (this.selectedItem) {
      case this.Const.GREEN_TOWER:
        square(57, 36, 37)
        break

      case this.Const.RED_TOWER:
        square(139, 36, 37)
        break

      case this.Const.YELLOW_TOWER:
        square(224, 36, 37)
        break
    }
  }

  selectTowerHudType(tower: any) {
    if (tower.getUpgradeLevel() < this.Const.UPGRADE_MAX_LEVEL) {
      this.setType(this.Const.HUD_UPGRADING)
    } else {
      this.setType(this.Const.HUD_UPGRADING_MAX)
    }
  }
}
