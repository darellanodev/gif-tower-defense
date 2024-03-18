import { Position, TowerType } from './types'
import { TextProperties } from './TextProperties'
import { ProgressBar } from './ProgressBar'
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

  static waveProgressBar: ProgressBar
  static waveProgressDelay: number = Const.WAVE_PROGRESS_DELAY
  static bossProgressBar: ProgressBar
  static bossProgressDelay: number = Const.BOSS_PROGRESS_DELAY
  static selectedItem: number = 1
  static mode: number = 0
  static canBuyTowerGreen: boolean = false
  static canBuyTowerRed: boolean = false
  static canBuyTowerYellow: boolean = false

  static hudImages: Image[]
  static hudIconImages: Image[]
  static upgradeCost: number = null
  static sellProfit: number = null
  static canUpgrade: boolean

  static initialize(hudImages: Image[], hudIconImages: Image[]) {
    Hud.hudImages = hudImages
    Hud.hudIconImages = hudIconImages

    Hud.waveProgressBar = new ProgressBar({ x: 335, y: -19 }, { w: 150, h: 16 })
    Hud.bossProgressBar = new ProgressBar({ x: 335, y: -2 }, { w: 150, h: 10 })
  }

  static updateWaveProgressBar() {
    let instantiateEnemies = false
    if (Hud.waveProgressDelay > 0) {
      Hud.waveProgressDelay--
    } else {
      Hud.waveProgressDelay = Const.WAVE_PROGRESS_DELAY
      Hud.waveProgressBar.increaseProgress()

      if (Hud.waveProgressBar.isFullOfProgress()) {
        // next wave
        Hud.waveProgressBar.setProgress(0)
        Player.wave++
        instantiateEnemies = true
      }
    }
    return instantiateEnemies
  }

  static updateBossProgressBar() {
    let instantiateBoss = false
    if (Hud.bossProgressDelay > 0) {
      Hud.bossProgressDelay--
    } else {
      Hud.bossProgressDelay = Const.BOSS_PROGRESS_DELAY
      Hud.bossProgressBar.increaseProgress()

      if (Hud.bossProgressBar.isFullOfProgress()) {
        // next boss
        Hud.bossProgressBar.setProgress(0)
        instantiateBoss = true
      }
    }
    return instantiateBoss
  }

  static isInsideButtonsBar(px: number, py: number) {
    if (px > 0 && px < 800 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  static isInsideTowersButtonsBar(px: number, py: number) {
    if (this.isInsideButtonsBar(px, py) && px < 265) {
      return true
    }
    return false
  }

  static isInsideMagicsButtonsBar(px: number, py: number) {
    if (this.isInsideButtonsBar(px, py) && px > 495) {
      return true
    }
    return false
  }

  static isInsideTowerGreenButton(px: number, py: number) {
    if (px > 0 && px < 98 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  static isInsideTowerRedButton(px: number, py: number) {
    if (px > 98 && px < 180 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  static isInsideTowerYellowButton(px: number, py: number) {
    if (px > 180 && px < 263 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  static isInsideMagicFireball(px: number, py: number) {
    if (px > 616 && px < 692 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  static isInsideMagicIceball(px: number, py: number) {
    if (px > 692 && px < 795 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  static isInsideMagicUFO(px: number, py: number) {
    if (px > 498 && px < 616 && py > 28 && py < 78) {
      return true
    }
    return false
  }

  static selectTower(towerId: number) {
    Hud.selectedItem = towerId
  }

  static getSelectedTower() {
    return Hud.selectedItem
  }

  static setCanBuy(
    canBuyTowerGreen: boolean,
    canBuyTowerRed: boolean,
    canBuyTowerYellow: boolean,
  ) {
    Hud.canBuyTowerGreen = canBuyTowerGreen
    Hud.canBuyTowerRed = canBuyTowerRed
    Hud.canBuyTowerYellow = canBuyTowerYellow
  }

  static draw() {
    switch (Hud.mode) {
      case Hud.NORMAL:
        image(Hud.hudImages[Hud.NORMAL], 0, 0)
        Hud._drawTowerIcons()
        Hud._drawSelectedItem()
        break

      case Hud.UPGRADING:
        image(Hud.hudImages[Hud.UPGRADING], 0, 0)
        break

      case Hud.UPGRADING_MAX:
        image(Hud.hudImages[Hud.UPGRADING_MAX], 0, 0)
        break
    }

    Hud.waveProgressBar.draw()
    Hud.bossProgressBar.draw()

    // draw texts
    TextProperties.setForHudData()

    Hud._drawMoney()
    Hud._drawLives()
    Hud._drawScore()
    Hud._drawLevelTitle()
    Hud._drawWave()
    Hud._drawUpgradeCost()
    Hud._drawSellProfit()
    Hud._drawMagicUFO()
    Hud._drawMagicFireball()
    Hud._drawMagicIceball()

    if (Hud.mode === Hud.NORMAL) {
      Hud._drawNewTowerPrices()
    }
  }

  static _drawTowerIcons() {
    let greenIconImgPos = Hud.ICON_GREEN_TOWER_OFF
    let redIconImgPos = Hud.ICON_RED_TOWER_OFF
    let yellowIconImgPos = Hud.ICON_YELLOW_TOWER_OFF

    if (Hud.canBuyTowerGreen) {
      greenIconImgPos = Hud.ICON_GREEN_TOWER_ON
    }
    if (Hud.canBuyTowerRed) {
      redIconImgPos = Hud.ICON_RED_TOWER_ON
    }
    if (Hud.canBuyTowerYellow) {
      yellowIconImgPos = Hud.ICON_YELLOW_TOWER_ON
    }

    image(Hud.hudIconImages[greenIconImgPos], 60, 38)
    image(Hud.hudIconImages[redIconImgPos], 142, 38)
    image(Hud.hudIconImages[yellowIconImgPos], 226, 38)
  }

  static _drawMoney() {
    text(Player.money, 445, 48)
  }

  static _drawUpgradeCost() {
    if (Hud.upgradeCost !== null) {
      if (!Hud.canUpgrade) {
        fill('gray')
      }
      text(Hud.upgradeCost, 33, 72)
      // restore color
      fill('white')
    }
  }

  static _drawMagicUFO() {
    text(MagicUFO.total, 592, 74)
  }

  static _drawMagicFireball() {
    text(MagicFireball.total, 680, 74)
  }

  static _drawMagicIceball() {
    text(MagicIceball.total, 769, 74)
  }

  static _drawSellProfit() {
    if (Hud.sellProfit !== null) {
      text(Hud.sellProfit, 182, 72)
    }
  }

  static _drawLives() {
    text(Player.lives, 390, 48)
  }

  static _drawScore() {
    text(Player.getPrintScore(), 404, 73)
  }

  static _drawLevelTitle() {
    text('Serpent by Ocliboy', 130, 18)
  }

  static _drawWave() {
    text(`wave ${Player.wave}`, 403, 13)
  }

  static _drawTowerGreenPrice() {
    if (!Hud.canBuyTowerGreen) {
      fill('gray')
    }
    text(TowerGreen.COST_UPGRADE[0], 40, 72)
    // restore
    fill('white')
  }
  static _drawTowerRedPrice() {
    if (!Hud.canBuyTowerRed) {
      fill('gray')
    }
    text(TowerRed.COST_UPGRADE[0], 118, 72)
    // restore
    fill('white')
  }
  static _drawTowerYellowPrice() {
    if (!Hud.canBuyTowerYellow) {
      fill('gray')
    }
    text(TowerYellow.COST_UPGRADE[0], 202, 72)
    // restore
    fill('white')
  }

  static _drawNewTowerPrices() {
    this._drawTowerGreenPrice()
    this._drawTowerRedPrice()
    this._drawTowerYellowPrice()
  }

  static _drawSelectedItem() {
    strokeWeight(3)
    stroke(255, 204, 0)
    noFill()

    switch (Hud.selectedItem) {
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

  static selectHudMode(tower: TowerType) {
    if (tower.upgradeLevel < Const.UPGRADE_MAX_LEVEL) {
      Hud.mode = Hud.UPGRADING
    } else {
      Hud.mode = Hud.UPGRADING_MAX
    }
  }

  static viewUpgradeCost(tower: TowerType, canUpgrade: boolean) {
    Hud.upgradeCost = null
    if (Hud.mode === Hud.UPGRADING) {
      Hud.upgradeCost = tower.nextLevelUpgradeCost
    }
    Hud.canUpgrade = canUpgrade
  }

  static viewSellProfit(tower: TowerType) {
    Hud.sellProfit = null
    if (Hud.mode === Hud.UPGRADING) {
      Hud.sellProfit = tower.sellProfit
    }
  }

  static hideUpgradeCost() {
    Hud.upgradeCost = null
  }

  static hideSellProfit() {
    Hud.sellProfit = null
  }

  static handleTowerButtons(mouseX: number, mouseY: number) {
    if (Hud.isInsideTowerGreenButton(mouseX, mouseY)) {
      Hud.selectTower(TowerGreen.ID)
    }
    if (Hud.isInsideTowerRedButton(mouseX, mouseY)) {
      Hud.selectTower(TowerRed.ID)
    }
    if (Hud.isInsideTowerYellowButton(mouseX, mouseY)) {
      Hud.selectTower(TowerYellow.ID)
    }
  }

  static handleMagicButtons(
    mouseX: number,
    mouseY: number,
    magicIceballImage: Image,
    magicFireballImage: Image,
    magicUFOImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
  ) {
    if (Hud.isInsideMagicFireball(mouseX, mouseY)) {
      MagicFireball.instantiate(
        magicFireballImage,
        initialEnemiesPosition,
        orders,
      )
    }
    if (Hud.isInsideMagicIceball(mouseX, mouseY)) {
      MagicIceball.instantiate(
        magicIceballImage,
        { x: initialEnemiesPosition.x, y: initialEnemiesPosition.y },
        orders,
      )
    }
    if (Hud.isInsideMagicUFO(mouseX, mouseY)) {
      MagicUFO.instantiate(
        magicUFOImage,
        { x: initialEnemiesPosition.x, y: initialEnemiesPosition.y },
        orders,
      )
    }
  }
}
