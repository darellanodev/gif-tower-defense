import { Position } from '../../types/position'
import { TowerType } from '../../types/towerType'
import { TextProperties } from '../TextProperties'
import { TowerGreen } from '../../towers/TowerGreen'
import { TowerRed } from '../../towers/TowerRed'
import { TowerYellow } from '../../towers/TowerYellow'
import { P5 } from '../../utils/P5'
import { HudPanel } from '../HudPanel'
import { Wallet } from '../../player/Wallet'
import { PositionInsideRectangle } from '../../utils/PositionInsideRectangle'
import { Button } from './Button'
import { ButtonGreenTowerCreator } from './ButtonGreenTowerCreator'
import { ButtonRedTowerCreator } from './ButtonRedTowerCreator'
import { ButtonYellowTowerCreator } from './ButtonYellowTowerCreator'
import { PANEL_STATE } from '../../constants/panel'
import {
  TOWER_GREEN_UPGRADE,
  TOWER_RED_UPGRADE,
  TOWER_YELLOW_UPGRADE,
} from '../../constants/tower'

export class HudButtonsTowers {
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
  #positionInsideRectangle: PositionInsideRectangle
  #textProperties: TextProperties

  constructor(wallet: Wallet) {
    this.#wallet = wallet
    this.#canUpgrade = false
    this.#positionInsideRectangle = new PositionInsideRectangle()
    this.#textProperties = new TextProperties()
  }

  #isInsideButtonsBar(position: Position) {
    const ButtonsBarRectanglePosition = { x: 0, y: 28 }
    const ButtonsBarRectangleSize = { w: 800, h: 50 }

    return this.#positionInsideRectangle.check(
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
    if (HudPanel.mode === PANEL_STATE.NORMAL) {
      this.#setCanBuy()
      this.#drawTowerButtons()
    }

    this.#textProperties.setForHudData()

    if (HudPanel.mode != PANEL_STATE.UPGRADING_MAX) {
      this.#drawUpgradeCost()
    }
    this.#drawSellProfit()

    if (HudPanel.mode === PANEL_STATE.NORMAL) {
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
    if (this.#upgradeCost === null) {
      return
    }
    if (!this.#canUpgrade) {
      P5.p5.fill('gray')
    }
    P5.p5.text(this.#upgradeCost, 33, 72)
    this.#restoreFill()
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
    P5.p5.text(TOWER_GREEN_UPGRADE.COST[0], 40, 72)
    this.#restoreFill()
  }

  #drawTowerRedPrice() {
    if (!this.#canBuyTowerRed) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TOWER_RED_UPGRADE.COST[0], 118, 72)
    this.#restoreFill()
  }

  #drawTowerYellowPrice() {
    if (!this.#canBuyTowerYellow) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TOWER_YELLOW_UPGRADE.COST[0], 202, 72)
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
    if (HudPanel.mode === PANEL_STATE.UPGRADING) {
      this.#upgradeCost = tower.nextLevelUpgradeCost
    }
    this.#canUpgrade = canUpgrade
  }

  viewSellProfit(tower: TowerType) {
    this.#sellProfit = null
    if (
      HudPanel.mode === PANEL_STATE.UPGRADING ||
      HudPanel.mode === PANEL_STATE.UPGRADING_MAX
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
