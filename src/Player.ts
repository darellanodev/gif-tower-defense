import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'
import { TowerType } from './types'
import { Const } from './Const'
import { Hud } from './Hud'
import { Image } from 'p5'
import { Position } from './types'
import { TileOrange } from './TileOrange'

export class Player {
  static lives: number = 7
  static score: number = 0
  static money: number = 0
  static wave: number = 1
  static mouseTileOrangeOver: TileOrange

  static increaseScore(score: number) {
    Player.score += score
  }

  static getPrintScore(): string {
    return String(Player.score).padStart(10, '0')
  }

  static increaseMoney(profit: number) {
    Player.money += profit
  }

  static decreaseMoney(cost: number) {
    Player.money -= cost
  }

  static haveMoneyToBuy(towerId: number, upgradeLevel: number) {
    let canBuy = false

    switch (towerId) {
      case TowerGreen.ID:
        canBuy = TowerGreen.COST_UPGRADE[upgradeLevel] <= Player.money
        break
      case TowerRed.ID:
        canBuy = TowerRed.COST_UPGRADE[upgradeLevel] <= Player.money
        break
      case TowerYellow.ID:
        canBuy = TowerYellow.COST_UPGRADE[upgradeLevel] <= Player.money
        break

      default:
        break
    }

    return canBuy
  }

  static canBuyNewTower(hudSelectedTower: number) {
    let canBuy = false
    const zeroUpgradeLevel = 0
    if (Player.haveMoneyToBuy(hudSelectedTower, zeroUpgradeLevel)) {
      canBuy = true
    }
    return canBuy
  }

  static canBuyTower(tower: TowerType) {
    let result = false
    if (tower) {
      result = Player.canUpgradeTower(tower)
    } else {
      result = Player.canBuyNewTower(Hud.getSelectedTower())
    }
    return result
  }

  static canUpgradeTower(tower: TowerType) {
    let canUpgrade = false
    if (tower.upgradeLevel < Const.UPGRADE_MAX_LEVEL) {
      if (Player.haveMoneyToBuy(tower.type, tower.upgradeLevel + 1)) {
        canUpgrade = true
      }
    }
    return canUpgrade
  }

  static keyPressed() {
    switch (keyCode) {
      case Const.KEY_1:
        Hud.selectTower(TowerGreen.ID)
        break
      case Const.KEY_2:
        Hud.selectTower(TowerRed.ID)
        break
      case Const.KEY_3:
        Hud.selectTower(TowerYellow.ID)
        break
    }
  }

  static mouseClicked(
    mouseX: number,
    mouseY: number,
    magicIceballImage: Image,
    magicFireballImage: Image,
    magicUFOImage: Image,
    initialEnemiesPosition: Position,
    orders: number[],
    mouseTileOrangeOver: TileOrange,
  ) {
    if (Hud.isInsideButtonsBar(mouseX, mouseY)) {
      if (Hud.isInsideTowersButtonsBar(mouseX, mouseY)) {
        Hud.handleTowerButtons(mouseX, mouseY)
      }
      if (Hud.isInsideMagicsButtonsBar(mouseX, mouseY)) {
        Hud.handleMagicButtons(
          mouseX,
          mouseY,
          magicIceballImage,
          magicFireballImage,
          magicUFOImage,
          initialEnemiesPosition,
          orders,
        )
      }
      return
    }

    if (mouseTileOrangeOver !== null) {
      if (mouseButton === RIGHT && mouseTileOrangeOver.hasTower()) {
        if (mouseTileOrangeOver.getTower().notUpgrading) {
          Player.sellTower(mouseTileOrangeOver)
        }
      }

      if (mouseButton === LEFT) {
        Player.buyTower(mouseTileOrangeOver)
      }
    }
  }

  static sellTower(mouseTileOrangeOver: TileOrange) {
    const profit = mouseTileOrangeOver.sellTower()
    Player.increaseMoney(profit)
  }

  static buyTower(mouseTileOrangeOver: TileOrange) {
    if (Player.canBuyTower(mouseTileOrangeOver.getTower())) {
      const cost = mouseTileOrangeOver.buyTower(Hud.getSelectedTower())
      Player.decreaseMoney(cost)
    }
  }
}
