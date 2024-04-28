import { TowerGreen } from './towers/TowerGreen'
import { TowerRed } from './towers/TowerRed'
import { TowerYellow } from './towers/TowerYellow'
import { Const } from './constants/Const'
import { Hud } from './hud/Hud'
import { Image } from 'p5'
import { Position } from './utils/types'
import { TileOrange } from './tiles/TileOrange'
import { P5 } from './utils/P5'
import { Tower } from './towers/Tower'
import { FlyIndicator } from './hud/FlyIndicator'

export class Player {
  static GAME_NORMAL_MODE = 0
  static GAME_TESTING_MODE = 1
  static MONEY_IN_TESTING_MODE = 999999

  static _mode = 0
  static _money: number = 0
  static lives: number = 7
  static score: number = 0
  static wave: number = 1
  static mouseTileOrangeOver: TileOrange | null

  static set gameMode(mode: number) {
    Player._mode = mode
  }

  static isGameInTestingMode() {
    return Player._mode === Player.GAME_TESTING_MODE
  }

  static set initialMoney(money: number) {
    if (money < 0) {
      throw new Error('Money must be a positive number')
    }
    Player._money = money
    if (Player._mode === this.GAME_TESTING_MODE) {
      Player._money = Player.MONEY_IN_TESTING_MODE
    }
  }

  static get money() {
    return Player._money
  }

  static increaseScore(score: number) {
    Player.score += score
  }

  static getPrintScore(): string {
    return String(Player.score).padStart(10, '0')
  }

  static increaseMoney(profit: number) {
    Player._money += profit
  }

  static increaseLives(increment: number) {
    Player.lives += increment
  }

  static decreaseMoney(cost: number) {
    Player._money -= cost
  }

  static haveMoneyToUpgradeTower(towerId: number, upgradeLevel: number) {
    let canBuy = false

    switch (towerId) {
      case TowerGreen.ID:
        canBuy = Player.money >= TowerGreen.COST_UPGRADE[upgradeLevel]
        break
      case TowerRed.ID:
        canBuy = Player.money >= TowerRed.COST_UPGRADE[upgradeLevel]
        break
      case TowerYellow.ID:
        canBuy = Player.money >= TowerYellow.COST_UPGRADE[upgradeLevel]
        break

      default:
        break
    }

    return canBuy
  }

  static haveMoneyToBuyNewTower(towerId: number) {
    const upgradeLevel = 0
    return Player.haveMoneyToUpgradeTower(towerId, upgradeLevel)
  }

  static keyPressed() {
    switch (P5.p5.keyCode) {
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
    mouseTileOrangeOver: TileOrange | null,
  ) {
    const mousePosition: Position = { x: mouseX, y: mouseY }

    if (Hud.isInsideButtonsBar(mousePosition)) {
      if (Hud.isInsideTowersButtonsBar(mousePosition)) {
        Hud.handleTowerButtons(mousePosition)
      }
      if (Hud.isInsideMagicsButtonsBar(mousePosition)) {
        Hud.handleMagicButtons(
          mousePosition,
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
      Player.clicOrangeTile(mouseTileOrangeOver)
    }
  }

  static clicOrangeTile(mouseTileOrangeOver: TileOrange) {
    const tower = mouseTileOrangeOver.getTower()

    if (P5.p5.mouseButton === P5.p5.RIGHT && tower) {
      Player.sellTower(tower)
    }

    if (P5.p5.mouseButton === P5.p5.LEFT) {
      if (tower) {
        Player.upgradeTower(tower)
      } else {
        Player.buyTower(mouseTileOrangeOver)
      }
    }
  }

  static sellTower(tower: Tower) {
    if (tower.upgrading) {
      return
    }
    const profit = tower.sellProfit
    Player.increaseMoney(profit)

    const profitText = `+${profit} $`
    FlyIndicator.instantiateFlyIndicator(tower.position, profitText)

    tower.tileOrange.removeTower()
  }

  static upgradeTower(tower: Tower) {
    if (tower.isMaxUpgraded) {
      return
    }
    if (!Player.haveMoneyToUpgradeTower(tower.type, tower.upgradeLevel + 1)) {
      return
    }
    if (tower.upgrading) {
      return
    }

    tower.upgrade()

    const cost = tower.cost
    const costText = `-${cost} $`
    FlyIndicator.instantiateFlyIndicator(tower.position, costText)
  }

  static buyTower(mouseTileOrangeOver: TileOrange) {
    if (!Player.haveMoneyToBuyNewTower(Hud.getSelectedTower())) {
      return
    }

    mouseTileOrangeOver.instantiateNewTower(Hud.getSelectedTower())
    const tower = mouseTileOrangeOver.getTower()

    if (!tower) {
      return
    }

    const cost = tower.cost
    Player.decreaseMoney(cost)

    const costText = `-${cost} $`
    FlyIndicator.instantiateFlyIndicator(tower.position, costText)
  }
}
