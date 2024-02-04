import { ConstType } from './types'
import { TextProperties } from './TextProperties'
import { ProgressBar } from './ProgressBar'
import { Score } from './Score'
import { Wallet } from './Wallet'
import { Image } from 'p5'

export class Hud {
  hudImages: Image[]
  hudIconImages: Image[]
  wallet: Wallet
  Const: ConstType
  hudType: number
  selectedItem: number
  lives: number
  score: Score
  TextPropertiesClass: typeof TextProperties
  ProgressBarClass: typeof ProgressBar
  waveProgressBar: ProgressBar
  bossProgressBar: ProgressBar
  wave: number
  upgradeCost: number
  canUpgrade: boolean
  sellProfit: number
  canBuyGreenTower: boolean
  canBuyRedTower: boolean
  canBuyYellowTower: boolean

  constructor(
    hudImages: Image[],
    hudIconImages: Image[],
    wallet: Wallet,
    Const: ConstType,
    lives: number,
    score: Score,
    TextPropertiesClass: typeof TextProperties,
    waveProgressBar: ProgressBar,
    bossProgressBar: ProgressBar,
    wave: number,
  ) {
    this.hudImages = hudImages
    this.hudIconImages = hudIconImages
    this.wallet = wallet
    this.Const = Const
    this.lives = lives
    this.score = score
    this.TextPropertiesClass = TextPropertiesClass
    this.waveProgressBar = waveProgressBar
    this.bossProgressBar = bossProgressBar
    this.wave = wave

    this.waveProgressBar = new ProgressBar(335, -19, 150, 16)
    this.bossProgressBar = new ProgressBar(335, -2, 150, 10)

    this.hudType = this.Const.HUD_NORMAL

    this.selectedItem = this.Const.GREEN_TOWER
    this.upgradeCost = null
    this.sellProfit = null

    this.canBuyGreenTower = false
    this.canBuyRedTower = false
    this.canBuyYellowTower = false
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

  setWaveProgressBar(waveProgressBar: ProgressBar) {
    this.waveProgressBar = waveProgressBar
  }

  setBossProgressBar(bossProgressBar: ProgressBar) {
    this.bossProgressBar = bossProgressBar
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

  setCanBuy(
    canBuyGreenTower: boolean,
    canBuyRedTower: boolean,
    canBuyYellowTower: boolean,
  ) {
    this.canBuyGreenTower = canBuyGreenTower
    this.canBuyRedTower = canBuyRedTower
    this.canBuyYellowTower = canBuyYellowTower
  }

  draw() {
    switch (this.hudType) {
      case this.Const.HUD_NORMAL:
        image(this.hudImages[this.Const.HUD_NORMAL], 0, 0)
        this._drawTowerIcons()
        this._drawSelectedItem()
        break

      case this.Const.HUD_UPGRADING:
        image(this.hudImages[this.Const.HUD_UPGRADING], 0, 0)
        break

      case this.Const.HUD_UPGRADING_MAX:
        image(this.hudImages[this.Const.HUD_UPGRADING_MAX], 0, 0)
        break
    }

    this.waveProgressBar.draw()
    this.bossProgressBar.draw()

    // draw texts
    this.TextPropertiesClass.setForHudData()

    this._drawMoney()
    this._drawLives()
    this._drawScore()
    this._drawLevelTitle()
    this._drawWave()
    this._drawUpgradeCost()
    this._drawSellProfit()
    this._drawMagicUFO()
    this._drawMagicFireball()
    this._drawMagicIceball()

    if (this.hudType === this.Const.HUD_NORMAL) {
      this._drawNewTowerPrices()
    }
  }

  setWave(wave: number) {
    this.wave = wave
  }

  setLives(lives: number) {
    this.lives = lives
  }

  _drawTowerIcons() {
    let greenIconImgPos = this.Const.HUD_ICON_GREEN_TOWER_OFF
    let redIconImgPos = this.Const.HUD_ICON_RED_TOWER_OFF
    let yellowIconImgPos = this.Const.HUD_ICON_YELLOW_TOWER_OFF

    if (this.canBuyGreenTower) {
      greenIconImgPos = this.Const.HUD_ICON_GREEN_TOWER_ON
    }
    if (this.canBuyRedTower) {
      redIconImgPos = this.Const.HUD_ICON_RED_TOWER_ON
    }
    if (this.canBuyYellowTower) {
      yellowIconImgPos = this.Const.HUD_ICON_YELLOW_TOWER_ON
    }

    image(this.hudIconImages[greenIconImgPos], 60, 38)
    image(this.hudIconImages[redIconImgPos], 142, 38)
    image(this.hudIconImages[yellowIconImgPos], 226, 38)
  }

  _drawMoney() {
    text(this.wallet.getMoney(), 445, 48)
  }

  _drawUpgradeCost() {
    if (this.upgradeCost !== null) {
      if (!this.canUpgrade) {
        fill('gray')
      }
      text(this.upgradeCost, 33, 72)
      // restore color
      fill('white')
    }
  }

  _drawMagicUFO() {
    text(3, 592, 74)
  }

  _drawMagicFireball() {
    text(3, 680, 74)
  }

  _drawMagicIceball() {
    text(3, 769, 74)
  }

  _drawSellProfit() {
    if (this.sellProfit !== null) {
      text(this.sellProfit, 182, 72)
    }
  }

  _drawLives() {
    text(this.lives, 390, 48)
  }

  _drawScore() {
    text(this.score.getPrintScore(), 404, 73)
  }

  _drawLevelTitle() {
    text('Serpent by Ocliboy', 130, 18)
  }

  _drawWave() {
    text(`wave ${this.wave}`, 403, 13)
  }

  _drawGreenTowerPrice() {
    if (!this.canBuyGreenTower) {
      fill('gray')
    }
    text(this.Const.COST_UPGRADE_GREEN_TOWER[0], 40, 72)
    // restore
    fill('white')
  }
  _drawRedTowerPrice() {
    if (!this.canBuyRedTower) {
      fill('gray')
    }
    text(this.Const.COST_UPGRADE_RED_TOWER[0], 118, 72)
    // restore
    fill('white')
  }
  _drawYellowTowerPrice() {
    if (!this.canBuyYellowTower) {
      fill('gray')
    }
    text(this.Const.COST_UPGRADE_YELLOW_TOWER[0], 202, 72)
    // restore
    fill('white')
  }

  _drawNewTowerPrices() {
    this._drawGreenTowerPrice()
    this._drawRedTowerPrice()
    this._drawYellowTowerPrice()
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
        square(140, 36, 37)
        break

      case this.Const.YELLOW_TOWER:
        square(225, 36, 37)
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

  viewUpgradeCost(tower: any, canUpgrade: boolean) {
    this.upgradeCost = null
    if (this.hudType === this.Const.HUD_UPGRADING) {
      this.upgradeCost = tower.getNextLevelUpgradeCost()
    }
    this.canUpgrade = canUpgrade
  }

  viewSellProfit(tower: any) {
    this.sellProfit = null
    if (this.hudType === this.Const.HUD_UPGRADING) {
      this.sellProfit = tower.getSellProfit()
    }
  }

  hideUpgradeCost() {
    this.upgradeCost = null
  }

  hideSellProfit() {
    this.sellProfit = null
  }
}
