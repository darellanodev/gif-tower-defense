import { ConstType } from './types'
import { TextProperties } from './TextProperties'
import { ProgressBar } from './ProgressBar'
import { Score } from './Score'
import { Wallet } from './Wallet'
import { Image } from 'p5'

export class Hud {
  hudImages: Image[]
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

  constructor(
    hudImages: Image[],
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

  draw() {
    switch (this.hudType) {
      case this.Const.HUD_NORMAL:
        image(this.hudImages[this.Const.HUD_NORMAL], 0, 0)
        this._drawNewTowerPrices()
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

    this.TextPropertiesClass.setForHudData()
    this._drawMoney()
    this._drawLives()
    this._drawScore()
    this._drawLevelTitle()
    this._drawWave()
    this._drawUpgradeCost()
    this._drawSellProfit()
  }

  setWave(wave: number) {
    this.wave = wave
  }

  setLives(lives: number) {
    this.lives = lives
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

  _drawNewTowerPrices() {
    text(this.Const.COST_UPGRADE_GREEN_TOWER[0], 40, 72)
    text(this.Const.COST_UPGRADE_RED_TOWER[0], 118, 72)
    text(this.Const.COST_UPGRADE_YELLOW_TOWER[0], 202, 72)
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
