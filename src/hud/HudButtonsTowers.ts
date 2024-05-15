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

export class HudButtonsTowers {
  static NORMAL = 0
  static UPGRADING = 1
  static UPGRADING_MAX = 2
  static HEIGHT = 84
  static ICON_GREEN_TOWER_ON = 0
  static ICON_GREEN_TOWER_OFF = 1
  static ICON_RED_TOWER_ON = 0
  static ICON_RED_TOWER_OFF = 1
  static ICON_YELLOW_TOWER_ON = 0
  static ICON_YELLOW_TOWER_OFF = 1

  static mode: number = 0
  static canBuyTowerGreen: boolean = false
  static canBuyTowerRed: boolean = false
  static canBuyTowerYellow: boolean = false

  static hudImages: Image[]
  static towerGreenButtonImages: Image[]
  static towerRedButtonImages: Image[]
  static towerYellowButtonImages: Image[]
  static upgradeCost: number | null = null
  static sellProfit: number | null = null
  static canUpgrade: boolean

  static setImages(hudImages: Image[]) {
    HudPanel.hudImages = hudImages
  }

  static isInsideTowersButtonsBar(position: Position) {
    if (HudPanel.isInsideButtonsBar(position) && position.x < 265) {
      return true
    }
    return false
  }

  static selectTower(towerId: number) {
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

  static getSelectedTower() {
    if (ButtonTower.greenTowerButton.isChecked) {
      return TowerGreen.ID
    } else if (ButtonTower.redTowerButton.isChecked) {
      return TowerRed.ID
    }
    return TowerYellow.ID
  }

  static setCanBuy(
    canBuyTowerGreen: boolean,
    canBuyTowerRed: boolean,
    canBuyTowerYellow: boolean,
  ) {
    HudButtonsTowers.canBuyTowerGreen = canBuyTowerGreen
    HudButtonsTowers.canBuyTowerRed = canBuyTowerRed
    HudButtonsTowers.canBuyTowerYellow = canBuyTowerYellow
  }

  static draw() {
    if (HudPanel.mode === HudPanel.NORMAL) {
      HudButtonsTowers._drawTowerButtons()
    }

    TextProperties.setForHudData()

    if (HudPanel.mode != HudPanel.UPGRADING_MAX) {
      HudButtonsTowers._drawUpgradeCost()
    }
    HudButtonsTowers._drawSellProfit()

    if (HudPanel.mode === HudPanel.NORMAL) {
      HudButtonsTowers._drawNewTowerPrices()
    }
  }

  static _drawTowerButtons() {
    ButtonTower.greenTowerButton.on = HudButtonsTowers.canBuyTowerGreen
    ButtonTower.redTowerButton.on = HudButtonsTowers.canBuyTowerRed
    ButtonTower.yellowTowerButton.on = HudButtonsTowers.canBuyTowerYellow

    ButtonTower.greenTowerButton.draw()
    ButtonTower.redTowerButton.draw()
    ButtonTower.yellowTowerButton.draw()
  }

  static _drawUpgradeCost() {
    if (HudButtonsTowers.upgradeCost !== null) {
      if (!HudButtonsTowers.canUpgrade) {
        P5.p5.fill('gray')
      }
      P5.p5.text(HudButtonsTowers.upgradeCost, 33, 72)
      HudButtonsTowers._restoreFill()
    }
  }

  static _drawSellProfit() {
    if (HudButtonsTowers.sellProfit !== null) {
      P5.p5.text(HudButtonsTowers.sellProfit, 182, 72)
    }
  }

  static _drawTowerGreenPrice() {
    if (!HudButtonsTowers.canBuyTowerGreen) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TowerGreen.COST_UPGRADE[0], 40, 72)
    HudButtonsTowers._restoreFill()
  }
  static _drawTowerRedPrice() {
    if (!HudButtonsTowers.canBuyTowerRed) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TowerRed.COST_UPGRADE[0], 118, 72)
    HudButtonsTowers._restoreFill()
  }
  static _drawTowerYellowPrice() {
    if (!HudButtonsTowers.canBuyTowerYellow) {
      P5.p5.fill('gray')
    }
    P5.p5.text(TowerYellow.COST_UPGRADE[0], 202, 72)
    HudButtonsTowers._restoreFill()
  }

  static _restoreFill() {
    P5.p5.fill('white')
  }

  static _drawNewTowerPrices() {
    this._drawTowerGreenPrice()
    this._drawTowerRedPrice()
    this._drawTowerYellowPrice()
  }

  static viewUpgradeCost(tower: TowerType, canUpgrade: boolean) {
    HudButtonsTowers.upgradeCost = null
    if (HudPanel.mode === HudPanel.UPGRADING) {
      HudButtonsTowers.upgradeCost = tower.nextLevelUpgradeCost
    }
    HudButtonsTowers.canUpgrade = canUpgrade
  }

  static viewSellProfit(tower: TowerType) {
    HudButtonsTowers.sellProfit = null
    if (
      HudPanel.mode === HudPanel.UPGRADING ||
      HudPanel.mode === HudPanel.UPGRADING_MAX
    ) {
      HudButtonsTowers.sellProfit = tower.sellProfit
    }
  }

  static hideUpgradeCost() {
    HudButtonsTowers.upgradeCost = null
  }

  static hideSellProfit() {
    HudButtonsTowers.sellProfit = null
  }

  static handleTowerButtons(mousePosition: Position) {
    if (ButtonTower.greenTowerButton.isMouseOver(mousePosition)) {
      HudButtonsTowers.selectTower(TowerGreen.ID)
    }
    if (ButtonTower.redTowerButton.isMouseOver(mousePosition)) {
      HudButtonsTowers.selectTower(TowerRed.ID)
    }
    if (ButtonTower.yellowTowerButton.isMouseOver(mousePosition)) {
      HudButtonsTowers.selectTower(TowerYellow.ID)
    }
  }

  static drawMouseIsOverOrangeTileWithTower() {
    const playerMouseTileOrangeOver = Player.mouseTileOrangeOver

    if (!playerMouseTileOrangeOver) {
      return
    }

    const tower = playerMouseTileOrangeOver.getTower()

    HudPanel.selectHudMode(tower)

    if (!tower) {
      return
    }

    if (!tower.isMaxUpgraded) {
      const canUpgrade = Player.haveMoneyToUpgradeTower(
        tower.type,
        tower.upgradeLevel + 1,
      )
      HudButtonsTowers.viewUpgradeCost(tower, canUpgrade)
      InfluenceArea.drawTowerInfluenceArea(tower, canUpgrade)
    } else {
      InfluenceArea.drawTowerInfluenceArea(tower, false)
    }

    HudButtonsTowers.viewSellProfit(tower)
  }

  static drawMouseIsOverOrangeTileWithoutTower() {
    if (Player.mouseTileOrangeOver) {
      InfluenceArea.drawNoTowerInfluenceArea(
        Player.mouseTileOrangeOver.position,
      )
    }

    HudPanel.drawNormalHud()
  }
}
