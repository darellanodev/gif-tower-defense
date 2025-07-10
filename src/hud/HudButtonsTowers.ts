import { Position } from '../types/position'
import { TowerType } from '../types/towerType'
import { TextProperties } from './TextProperties'
import { TowerGreen } from '../towers/TowerGreen'
import { TowerRed } from '../towers/TowerRed'
import { TowerYellow } from '../towers/TowerYellow'
import { P5 } from '../utils/P5'
import { ButtonTower } from './ButtonTower'
import { HudPanel } from './HudPanel'
import { Wallet } from '../player/Wallet'
import { PositionUtils } from '../utils/PositionUtils'

export class HudButtonsTowers {
  static ICON_GREEN_TOWER_ON = 0
  static ICON_GREEN_TOWER_OFF = 1
  static ICON_RED_TOWER_ON = 0
  static ICON_RED_TOWER_OFF = 1
  static ICON_YELLOW_TOWER_ON = 0
  static ICON_YELLOW_TOWER_OFF = 1

  #canBuyTowerGreen: boolean = false
  #canBuyTowerRed: boolean = false
  #canBuyTowerYellow: boolean = false

  #wallet: Wallet

  #upgradeCost: number | null = null
  #sellProfit: number | null = null
  #canUpgrade: boolean

  constructor(wallet: Wallet) {
    this.#wallet = wallet
    this.#canUpgrade = false
  }

  #isInsideButtonsBar(position: Position) {
    const ButtonsBarRectanglePosition = { x: 0, y: 28 }
    const ButtonsBarRectangleSize = { w: 800, h: 50 }

    return PositionUtils.isInsideRectangle(
      position,
      ButtonsBarRectanglePosition,
      ButtonsBarRectangleSize,
    )
  }

  isInsideTowersButtonsBar(position: Position) {
    if (this.#isInsideButtonsBar(position) && position.x < 265) {
      return true
    }
    return false
  }

  selectTower(towerId: number) {
    ButtonTower.uncheckAllTowerButtons()
    switch (towerId) {
      case TowerGreen.ID:
        ButtonTower.greenTowerButton.check()
        break

      case TowerRed.ID:
        ButtonTower.redTowerButton.check()
        break

      case TowerYellow.ID:
        ButtonTower.yellowTowerButton.check()
        break
    }
  }

  getSelectedTower() {
    if (ButtonTower.greenTowerButton.checked) {
      return TowerGreen.ID
    } else if (ButtonTower.redTowerButton.checked) {
      return TowerRed.ID
    }
    return TowerYellow.ID
  }

  draw() {
    if (HudPanel.mode === HudPanel.NORMAL) {
      this.#setCanBuy()
      this.#drawTowerButtons()
    }

    TextProperties.setForHudData()

    if (HudPanel.mode != HudPanel.UPGRADING_MAX) {
      this.#drawUpgradeCost()
    }
    this.#drawSellProfit()

    if (HudPanel.mode === HudPanel.NORMAL) {
      this.#drawNewTowerPrices()
    }
  }

  #drawTowerButtons() {
    ButtonTower.greenTowerButton.on = this.#canBuyTowerGreen
    ButtonTower.redTowerButton.on = this.#canBuyTowerRed
    ButtonTower.yellowTowerButton.on = this.#canBuyTowerYellow

    ButtonTower.greenTowerButton.draw()
    ButtonTower.redTowerButton.draw()
    ButtonTower.yellowTowerButton.draw()
  }

  #drawUpgradeCost() {
    if (this.#upgradeCost !== null) {
      if (!this.#canUpgrade) {
        P5.p5.fill('gray')
      }
      P5.p5.text(this.#upgradeCost, 33, 72)
      this.#restoreFill()
    }
  }

  #drawSellProfit() {
    if (this.#sellProfit !== null) {
      P5.p5.text(this.#sellProfit, 182, 72)
    }
  }

  #drawTowerGreenPrice() {
    if (!this.#canBuyTowerGreen) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TowerGreen.COST_UPGRADE[0], 40, 72)
    this.#restoreFill()
  }

  #drawTowerRedPrice() {
    if (!this.#canBuyTowerRed) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TowerRed.COST_UPGRADE[0], 118, 72)
    this.#restoreFill()
  }

  #drawTowerYellowPrice() {
    if (!this.#canBuyTowerYellow) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TowerYellow.COST_UPGRADE[0], 202, 72)
    this.#restoreFill()
  }

  #restoreFill() {
    P5.p5.fill('white')
  }

  #drawNewTowerPrices() {
    this.#drawTowerGreenPrice()
    this.#drawTowerRedPrice()
    this.#drawTowerYellowPrice()
  }

  #setCanBuy() {
    this.#canBuyTowerGreen = this.#wallet.haveMoneyToBuyNewTower(TowerGreen.ID)
    this.#canBuyTowerRed = this.#wallet.haveMoneyToBuyNewTower(TowerRed.ID)
    this.#canBuyTowerYellow = this.#wallet.haveMoneyToBuyNewTower(
      TowerYellow.ID,
    )
  }

  viewUpgradeCost(tower: TowerType, canUpgrade: boolean) {
    this.#upgradeCost = null
    if (HudPanel.mode === HudPanel.UPGRADING) {
      this.#upgradeCost = tower.nextLevelUpgradeCost
    }
    this.#canUpgrade = canUpgrade
  }

  viewSellProfit(tower: TowerType) {
    this.#sellProfit = null
    if (
      HudPanel.mode === HudPanel.UPGRADING ||
      HudPanel.mode === HudPanel.UPGRADING_MAX
    ) {
      this.#sellProfit = tower.sellProfit
    }
  }

  hideUpgradeCost() {
    this.#upgradeCost = null
  }

  hideSellProfit() {
    this.#sellProfit = null
  }

  handleTowerButtons(mousePosition: Position) {
    if (ButtonTower.greenTowerButton.isMouseOver(mousePosition)) {
      this.selectTower(TowerGreen.ID)
    }
    if (ButtonTower.redTowerButton.isMouseOver(mousePosition)) {
      this.selectTower(TowerRed.ID)
    }
    if (ButtonTower.yellowTowerButton.isMouseOver(mousePosition)) {
      this.selectTower(TowerYellow.ID)
    }
  }
}
