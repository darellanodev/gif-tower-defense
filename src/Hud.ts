import { Position, TowerType } from './types'
import { TextProperties } from './TextProperties'
import { ProgressBar } from './ProgressBar'
import { Score } from './Score'
import { Wallet } from './Wallet'
import { Image } from 'p5'
import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { MagicFireball } from './MagicFireball'
import { MagicIceball } from './MagicIceball'
import { MagicUFO } from './MagicUFO'
import { Const } from './Const'
import { Player } from './Player'

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

  #hudImages: Image[]
  #hudIconImages: Image[]
  #waveProgressBar: ProgressBar
  #bossProgressBar: ProgressBar
  #wave: number

  #hudType: number
  #selectedItem: number
  #upgradeCost: number = null
  #sellProfit: number = null
  #canBuyTowerGreen: boolean = false
  #canBuyTowerRed: boolean = false
  #canBuyTowerYellow: boolean = false
  #canUpgrade: boolean

  constructor(
    hudImages: Image[],
    hudIconImages: Image[],
    waveProgressBar: ProgressBar,
    bossProgressBar: ProgressBar,
    wave: number,
  ) {
    this.#hudImages = hudImages
    this.#hudIconImages = hudIconImages
    this.#waveProgressBar = waveProgressBar
    this.#bossProgressBar = bossProgressBar
    this.#wave = wave

    this.#waveProgressBar = new ProgressBar(
      { x: 335, y: -19 },
      { w: 150, h: 16 },
    )
    this.#bossProgressBar = new ProgressBar(
      { x: 335, y: -2 },
      { w: 150, h: 10 },
    )

    this.#hudType = Hud.NORMAL
    this.#selectedItem = TowerGreen.ID
  }

  isInsideButtonsBar(px: number, py: number) {
    if (px > 0 && px < 800 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideTowerGreenButton(px: number, py: number) {
    if (px > 0 && px < 98 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideTowerRedButton(px: number, py: number) {
    if (px > 98 && px < 180 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  isInsideTowerYellowButton(px: number, py: number) {
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

  setWaveProgressBar(waveProgressBar: ProgressBar) {
    this.#waveProgressBar = waveProgressBar
  }

  setBossProgressBar(bossProgressBar: ProgressBar) {
    this.#bossProgressBar = bossProgressBar
  }

  selectTower(towerId: number) {
    this.#selectedItem = towerId
  }

  getSelectedTower() {
    return this.#selectedItem
  }

  setType(hudType: number) {
    this.#hudType = hudType
  }

  setCanBuy(
    canBuyTowerGreen: boolean,
    canBuyTowerRed: boolean,
    canBuyTowerYellow: boolean,
  ) {
    this.#canBuyTowerGreen = canBuyTowerGreen
    this.#canBuyTowerRed = canBuyTowerRed
    this.#canBuyTowerYellow = canBuyTowerYellow
  }

  draw() {
    switch (this.#hudType) {
      case Hud.NORMAL:
        image(this.#hudImages[Hud.NORMAL], 0, 0)
        this._drawTowerIcons()
        this.#drawSelectedItem()
        break

      case Hud.UPGRADING:
        image(this.#hudImages[Hud.UPGRADING], 0, 0)
        break

      case Hud.UPGRADING_MAX:
        image(this.#hudImages[Hud.UPGRADING_MAX], 0, 0)
        break
    }

    this.#waveProgressBar.draw()
    this.#bossProgressBar.draw()

    // draw texts
    TextProperties.setForHudData()

    this.#drawMoney()
    this.#drawLives()
    this.#drawScore()
    this.#drawLevelTitle()
    this.#drawWave()
    this.#drawUpgradeCost()
    this.#drawSellProfit()
    this.#drawMagicUFO()
    this.#drawMagicFireball()
    this.#drawMagicIceball()

    if (this.#hudType === Hud.NORMAL) {
      this._drawNewTowerPrices()
    }
  }

  setWave(wave: number) {
    this.#wave = wave
  }

  // can't be private with # because it needs to access their public static properties
  _drawTowerIcons() {
    let greenIconImgPos = Hud.ICON_GREEN_TOWER_OFF
    let redIconImgPos = Hud.ICON_RED_TOWER_OFF
    let yellowIconImgPos = Hud.ICON_YELLOW_TOWER_OFF

    if (this.#canBuyTowerGreen) {
      greenIconImgPos = Hud.ICON_GREEN_TOWER_ON
    }
    if (this.#canBuyTowerRed) {
      redIconImgPos = Hud.ICON_RED_TOWER_ON
    }
    if (this.#canBuyTowerYellow) {
      yellowIconImgPos = Hud.ICON_YELLOW_TOWER_ON
    }

    image(this.#hudIconImages[greenIconImgPos], 60, 38)
    image(this.#hudIconImages[redIconImgPos], 142, 38)
    image(this.#hudIconImages[yellowIconImgPos], 226, 38)
  }

  #drawMoney() {
    text(Wallet.money, 445, 48)
  }

  #drawUpgradeCost() {
    if (this.#upgradeCost !== null) {
      if (!this.#canUpgrade) {
        fill('gray')
      }
      text(this.#upgradeCost, 33, 72)
      // restore color
      fill('white')
    }
  }

  #drawMagicUFO() {
    text(MagicUFO.total, 592, 74)
  }

  #drawMagicFireball() {
    text(MagicFireball.total, 680, 74)
  }

  #drawMagicIceball() {
    text(MagicIceball.total, 769, 74)
  }

  #drawSellProfit() {
    if (this.#sellProfit !== null) {
      text(this.#sellProfit, 182, 72)
    }
  }

  #drawLives() {
    text(Player.lives, 390, 48)
  }

  #drawScore() {
    text(Score.getPrintScore(), 404, 73)
  }

  #drawLevelTitle() {
    text('Serpent by Ocliboy', 130, 18)
  }

  #drawWave() {
    text(`wave ${this.#wave}`, 403, 13)
  }

  _drawTowerGreenPrice() {
    if (!this.#canBuyTowerGreen) {
      fill('gray')
    }
    text(TowerGreen.COST_UPGRADE[0], 40, 72)
    // restore
    fill('white')
  }
  _drawTowerRedPrice() {
    if (!this.#canBuyTowerRed) {
      fill('gray')
    }
    text(TowerRed.COST_UPGRADE[0], 118, 72)
    // restore
    fill('white')
  }
  _drawTowerYellowPrice() {
    if (!this.#canBuyTowerYellow) {
      fill('gray')
    }
    text(TowerYellow.COST_UPGRADE[0], 202, 72)
    // restore
    fill('white')
  }

  _drawNewTowerPrices() {
    this._drawTowerGreenPrice()
    this._drawTowerRedPrice()
    this._drawTowerYellowPrice()
  }

  #drawSelectedItem() {
    strokeWeight(3)
    stroke(255, 204, 0)
    noFill()

    switch (this.#selectedItem) {
      case TowerGreen.ID:
        square(57, 36, 37)
        break

      case TowerRed.ID:
        square(140, 36, 37)
        break

      case TowerYellow.ID:
        square(225, 36, 37)
        break
    }
  }

  selectTowerHudType(tower: TowerType) {
    if (tower.upgradeLevel < Const.UPGRADE_MAX_LEVEL) {
      this.setType(Hud.UPGRADING)
    } else {
      this.setType(Hud.UPGRADING_MAX)
    }
  }

  viewUpgradeCost(tower: TowerType, canUpgrade: boolean) {
    this.#upgradeCost = null
    if (this.#hudType === Hud.UPGRADING) {
      this.#upgradeCost = tower.nextLevelUpgradeCost
    }
    this.#canUpgrade = canUpgrade
  }

  viewSellProfit(tower: TowerType) {
    this.#sellProfit = null
    if (this.#hudType === Hud.UPGRADING) {
      this.#sellProfit = tower.sellProfit
    }
  }

  hideUpgradeCost() {
    this.#upgradeCost = null
  }

  hideSellProfit() {
    this.#sellProfit = null
  }

  handleButtons(
    mouseX: number,
    mouseY: number,
    magicIceballImage: Image,
    magicFireballImage: Image,
    magicUFOImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
  ) {
    if (this.isInsideTowerGreenButton(mouseX, mouseY)) {
      this.selectTower(TowerGreen.ID)
    }
    if (this.isInsideTowerRedButton(mouseX, mouseY)) {
      this.selectTower(TowerRed.ID)
    }
    if (this.isInsideTowerYellowButton(mouseX, mouseY)) {
      this.selectTower(TowerYellow.ID)
    }
    if (this.isInsideMagicFireball(mouseX, mouseY)) {
      MagicFireball.instantiate(
        magicFireballImage,
        initialEnemiesPosition,
        orders,
      )
    }
    if (this.isInsideMagicIceball(mouseX, mouseY)) {
      MagicIceball.instantiate(
        magicIceballImage,
        { x: initialEnemiesPosition.x, y: initialEnemiesPosition.y },
        orders,
      )
    }
    if (this.isInsideMagicUFO(mouseX, mouseY)) {
      MagicUFO.instantiate(
        magicUFOImage,
        { x: initialEnemiesPosition.x, y: initialEnemiesPosition.y },
        orders,
      )
    }
  }
}
