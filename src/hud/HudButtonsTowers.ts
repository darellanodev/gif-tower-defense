import { Position, TowerType } from '../utils/types'
import { TextProperties } from './TextProperties'
import { Image } from 'p5'
import { TowerGreen } from '../towers/TowerGreen'
import { TowerRed } from '../towers/TowerRed'
import { TowerYellow } from '../towers/TowerYellow'
import { Player } from '../Player'
import { InfluenceArea } from '../towers/InfluenceArea'
import { P5 } from '../utils/P5'
import { ButtonTower } from './ButtonTower'
import { HudPanel } from './HudPanel'
import { MathUtils } from '../utils/MathUtils'

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

  #towerGreenButtonImages: Image[]
  #towerRedButtonImages: Image[]
  #towerYellowButtonImages: Image[]

  #upgradeCost: number | null = null
  #sellProfit: number | null = null
  #canUpgrade: boolean

  constructor(
    towerGreenButtonImages: Image[],
    towerRedButtonImages: Image[],
    towerYellowButtonImages: Image[],
  ) {
    this.#towerGreenButtonImages = towerGreenButtonImages
    this.#towerRedButtonImages = towerRedButtonImages
    this.#towerYellowButtonImages = towerYellowButtonImages

    this.#canUpgrade = false
  }

  #isInsideButtonsBar(position: Position) {
    const ButtonsBarRectanglePosition = { x: 0, y: 28 }
    const ButtonsBarRectangleSize = { w: 800, h: 50 }

    return MathUtils.isPositionInsideRectangle(
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
    if (ButtonTower.greenTowerButton.isChecked) {
      return TowerGreen.ID
    } else if (ButtonTower.redTowerButton.isChecked) {
      return TowerRed.ID
    }
    return TowerYellow.ID
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
    if (HudPanel.mode === HudPanel.NORMAL) {
      this._drawTowerButtons()
    }

    TextProperties.setForHudData()

    if (HudPanel.mode != HudPanel.UPGRADING_MAX) {
      this._drawUpgradeCost()
    }
    this._drawSellProfit()

    if (HudPanel.mode === HudPanel.NORMAL) {
      this._drawNewTowerPrices()
    }
  }

  _drawTowerButtons() {
    ButtonTower.greenTowerButton.on = this.#canBuyTowerGreen
    ButtonTower.redTowerButton.on = this.#canBuyTowerRed
    ButtonTower.yellowTowerButton.on = this.#canBuyTowerYellow

    ButtonTower.greenTowerButton.draw()
    ButtonTower.redTowerButton.draw()
    ButtonTower.yellowTowerButton.draw()
  }

  _drawUpgradeCost() {
    if (this.#upgradeCost !== null) {
      if (!this.#canUpgrade) {
        P5.p5.fill('gray')
      }
      P5.p5.text(this.#upgradeCost, 33, 72)
      this._restoreFill()
    }
  }

  _drawSellProfit() {
    if (this.#sellProfit !== null) {
      P5.p5.text(this.#sellProfit, 182, 72)
    }
  }

  _drawTowerGreenPrice() {
    if (!this.#canBuyTowerGreen) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TowerGreen.COST_UPGRADE[0], 40, 72)
    this._restoreFill()
  }
  _drawTowerRedPrice() {
    if (!this.#canBuyTowerRed) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TowerRed.COST_UPGRADE[0], 118, 72)
    this._restoreFill()
  }
  _drawTowerYellowPrice() {
    if (!this.#canBuyTowerYellow) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TowerYellow.COST_UPGRADE[0], 202, 72)
    this._restoreFill()
  }

  _restoreFill() {
    P5.p5.fill('white')
  }

  _drawNewTowerPrices() {
    this._drawTowerGreenPrice()
    this._drawTowerRedPrice()
    this._drawTowerYellowPrice()
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

  drawMouseIsOverOrangeTileWithTower() {
    const playerMouseTileOrangeOver = Player.mouseTileOrangeOver

    if (!playerMouseTileOrangeOver) {
      return
    }

    const tower = playerMouseTileOrangeOver.getTower()

    if (!tower) {
      return
    }

    if (!tower.isMaxUpgraded) {
      const canUpgrade = Player.haveMoneyToUpgradeTower(
        tower.type,
        tower.upgradeLevel + 1,
      )
      this.viewUpgradeCost(tower, canUpgrade)
      InfluenceArea.drawTowerInfluenceArea(tower, canUpgrade)
    } else {
      InfluenceArea.drawTowerInfluenceArea(tower, false)
    }

    this.viewSellProfit(tower)
  }

  drawMouseIsOverOrangeTileWithoutTower() {
    if (Player.mouseTileOrangeOver) {
      InfluenceArea.drawNoTowerInfluenceArea(
        Player.mouseTileOrangeOver.position,
      )
    }
  }
}
