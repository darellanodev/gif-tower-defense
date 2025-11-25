import { Position } from '../../types/position'
import { TowerType } from '../../types/towerType'
import { TextProperties } from '../TextProperties'
import { TowerGreen } from '../../towers/TowerGreen'
import { TowerRed } from '../../towers/TowerRed'
import { TowerYellow } from '../../towers/TowerYellow'
import { P5 } from '../../utils/P5'
import { HudPanel } from '../HudPanel'
import { Wallet } from '../../player/Wallet'
import { PositionUtils } from '../../utils/PositionUtils'
import { Button } from './Button'
import { ButtonGreenTowerCreator } from './ButtonGreenTowerCreator'
import { ButtonRedTowerCreator } from './ButtonRedTowerCreator'
import { ButtonYellowTowerCreator } from './ButtonYellowTowerCreator'

export class HudButtonsTowers {
  static ICON_GREEN_TOWER_ON = 0
  static ICON_GREEN_TOWER_OFF = 1
  static ICON_RED_TOWER_ON = 0
  static ICON_RED_TOWER_OFF = 1
  static ICON_YELLOW_TOWER_ON = 0
  static ICON_YELLOW_TOWER_OFF = 1

  static greenTowerButton: Button
  static redTowerButton: Button
  static yellowTowerButton: Button

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
    return this.#isInsideButtonsBar(position) && position.x < 265
  }
  static initializeButtons() {
    HudButtonsTowers._initializeTowerButtons()
  }

  static _initializeTowerButtons() {
    ButtonGreenTowerCreator._initializeGreenTowerButton()
    ButtonRedTowerCreator._initializeRedTowerButton()
    ButtonYellowTowerCreator._initializeYellowTowerButton()

    HudButtonsTowers.greenTowerButton.check()
  }

  uncheckAllTowerButtons() {
    HudButtonsTowers.greenTowerButton.uncheck()
    HudButtonsTowers.redTowerButton.uncheck()
    HudButtonsTowers.yellowTowerButton.uncheck()
  }

  selectTower(towerId: number) {
    this.uncheckAllTowerButtons()
    switch (towerId) {
      case TowerGreen.ID:
        HudButtonsTowers.greenTowerButton.check()
        break

      case TowerRed.ID:
        HudButtonsTowers.redTowerButton.check()
        break

      case TowerYellow.ID:
        HudButtonsTowers.yellowTowerButton.check()
        break
    }
  }

  getSelectedTower() {
    if (HudButtonsTowers.greenTowerButton.checked) {
      return TowerGreen.ID
    }
    if (HudButtonsTowers.redTowerButton.checked) {
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
    HudButtonsTowers.greenTowerButton.on = this.#canBuyTowerGreen
    HudButtonsTowers.redTowerButton.on = this.#canBuyTowerRed
    HudButtonsTowers.yellowTowerButton.on = this.#canBuyTowerYellow

    HudButtonsTowers.greenTowerButton.draw()
    HudButtonsTowers.redTowerButton.draw()
    HudButtonsTowers.yellowTowerButton.draw()
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
    if (HudButtonsTowers.greenTowerButton.isMouseOver(mousePosition)) {
      this.selectTower(TowerGreen.ID)
    }
    if (HudButtonsTowers.redTowerButton.isMouseOver(mousePosition)) {
      this.selectTower(TowerRed.ID)
    }
    if (HudButtonsTowers.yellowTowerButton.isMouseOver(mousePosition)) {
      this.selectTower(TowerYellow.ID)
    }
  }
}
