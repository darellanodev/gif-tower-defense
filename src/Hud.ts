import { TowerType } from './types'
import { TextProperties } from './TextProperties'
import { ProgressBar } from './ProgressBar'
import { Score } from './Score'
import { Wallet } from './Wallet'
import { Image } from 'p5'
import { GreenTower } from './GreenTower'
import { RedTower } from './RedTower'
import { YellowTower } from './YellowTower'
import { MagicFireball } from './MagicFireball'
import { MagicIceball } from './MagicIceball'
import { MagicUFO } from './MagicUFO'
import { Const } from './Const'

export class Hud {
  static NORMAL = 0
  static UPGRADING = 1
  static UPGRADING_MAX = 2
  static HEIGHT = 84
  static ICON_GREEN_TOWER_ON = 0
  static ICON_GREEN_TOWER_OFF = 1
  static ICON_RED_TOWER_ON = 2
  static ICON_RED_TOWER_OFF = 3
  static ICON_YELLOW_TOWER_ON = 4
  static ICON_YELLOW_TOWER_OFF = 5

  hudImages: Image[]
  hudIconImages: Image[]
  wallet: Wallet
  lives: number
  score: Score
  TextPropertiesClass: typeof TextProperties
  waveProgressBar: ProgressBar
  bossProgressBar: ProgressBar
  wave: number

  hudType: number = Hud.NORMAL
  selectedItem: number = GreenTower.ID
  upgradeCost: number = null
  sellProfit: number = null
  canBuyGreenTower: boolean = false
  canBuyRedTower: boolean = false
  canBuyYellowTower: boolean = false
  magicfireballs: number = MagicFireball.FIREBALLS
  magiciceballs: number = MagicIceball.ICEBALLS
  magicUFOs: number = MagicUFO.UFOS

  canUpgrade: boolean

  constructor(
    hudImages: Image[],
    hudIconImages: Image[],
    wallet: Wallet,
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
    this.lives = lives
    this.score = score
    this.TextPropertiesClass = TextPropertiesClass
    this.waveProgressBar = waveProgressBar
    this.bossProgressBar = bossProgressBar
    this.wave = wave

    this.waveProgressBar = new ProgressBar({ x: 335, y: -19 }, 150, 16)
    this.bossProgressBar = new ProgressBar({ x: 335, y: -2 }, 150, 10)
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

  isInsideMagicFireball(px: number, py: number) {
    if (px > 616 && px < 692 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideMagicIceball(px: number, py: number) {
    if (px > 692 && px < 795 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideMagicUFO(px: number, py: number) {
    if (px > 498 && px < 616 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  setMagicFireballs(magicfireballs: number) {
    this.magicfireballs = magicfireballs
  }

  setMagicIceballs(magiciceballs: number) {
    this.magiciceballs = magiciceballs
  }

  setMagicUFOs(magicUFOs: number) {
    this.magicUFOs = magicUFOs
  }

  setWaveProgressBar(waveProgressBar: ProgressBar) {
    this.waveProgressBar = waveProgressBar
  }

  setBossProgressBar(bossProgressBar: ProgressBar) {
    this.bossProgressBar = bossProgressBar
  }

  selectTower(towerId: number) {
    this.selectedItem = towerId
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
      case Hud.NORMAL:
        image(this.hudImages[Hud.NORMAL], 0, 0)
        this._drawTowerIcons()
        this._drawSelectedItem()
        break

      case Hud.UPGRADING:
        image(this.hudImages[Hud.UPGRADING], 0, 0)
        break

      case Hud.UPGRADING_MAX:
        image(this.hudImages[Hud.UPGRADING_MAX], 0, 0)
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

    if (this.hudType === Hud.NORMAL) {
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
    let greenIconImgPos = Hud.ICON_GREEN_TOWER_OFF
    let redIconImgPos = Hud.ICON_RED_TOWER_OFF
    let yellowIconImgPos = Hud.ICON_YELLOW_TOWER_OFF

    if (this.canBuyGreenTower) {
      greenIconImgPos = Hud.ICON_GREEN_TOWER_ON
    }
    if (this.canBuyRedTower) {
      redIconImgPos = Hud.ICON_RED_TOWER_ON
    }
    if (this.canBuyYellowTower) {
      yellowIconImgPos = Hud.ICON_YELLOW_TOWER_ON
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
    text(this.magicUFOs, 592, 74)
  }

  _drawMagicFireball() {
    text(this.magicfireballs, 680, 74)
  }

  _drawMagicIceball() {
    text(this.magiciceballs, 769, 74)
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
    text(GreenTower.COST_UPGRADE[0], 40, 72)
    // restore
    fill('white')
  }
  _drawRedTowerPrice() {
    if (!this.canBuyRedTower) {
      fill('gray')
    }
    text(RedTower.COST_UPGRADE[0], 118, 72)
    // restore
    fill('white')
  }
  _drawYellowTowerPrice() {
    if (!this.canBuyYellowTower) {
      fill('gray')
    }
    text(YellowTower.COST_UPGRADE[0], 202, 72)
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
      case GreenTower.ID:
        square(57, 36, 37)
        break

      case RedTower.ID:
        square(140, 36, 37)
        break

      case YellowTower.ID:
        square(225, 36, 37)
        break
    }
  }

  selectTowerHudType(tower: TowerType) {
    if (tower.getUpgradeLevel() < Const.UPGRADE_MAX_LEVEL) {
      this.setType(Hud.UPGRADING)
    } else {
      this.setType(Hud.UPGRADING_MAX)
    }
  }

  viewUpgradeCost(tower: TowerType, canUpgrade: boolean) {
    this.upgradeCost = null
    if (this.hudType === Hud.UPGRADING) {
      this.upgradeCost = tower.getNextLevelUpgradeCost()
    }
    this.canUpgrade = canUpgrade
  }

  viewSellProfit(tower: TowerType) {
    this.sellProfit = null
    if (this.hudType === Hud.UPGRADING) {
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
