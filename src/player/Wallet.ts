import { Tower } from '../towers/Tower'
import { TowerGreen } from '../towers/TowerGreen'
import { TowerRed } from '../towers/TowerRed'
import { TowerYellow } from '../towers/TowerYellow'
import { FlyIndicator } from '../hud/FlyIndicator'
import { TileOrange } from '../tiles/TileOrange'

export class Wallet {
  static GAME_NORMAL_MODE = 0
  static GAME_TESTING_MODE = 1
  static MONEY_IN_TESTING_MODE = 999999

  #mode = 0
  #money: number = 0

  constructor(gameMode: number, money: number) {
    this.#mode = gameMode
    this.initialMoney = money
  }

  isGameInTestingMode() {
    return this.#mode === Wallet.GAME_TESTING_MODE
  }

  set initialMoney(money: number) {
    if (money < 0) {
      throw new Error('Money must be a positive number')
    }
    this.#money = money
    if (this.#mode === Wallet.GAME_TESTING_MODE) {
      this.#money = Wallet.MONEY_IN_TESTING_MODE
    }
  }

  get money() {
    return this.#money
  }

  decreaseMoney(cost: number) {
    this.#money -= cost
  }

  increaseMoney(value: number) {
    this.#money += value
  }

  haveMoneyToUpgradeTower(towerId: number, upgradeLevel: number) {
    let canBuy = false

    switch (towerId) {
      case TowerGreen.ID:
        canBuy = this.money >= TowerGreen.COST_UPGRADE[upgradeLevel]
        break
      case TowerRed.ID:
        canBuy = this.money >= TowerRed.COST_UPGRADE[upgradeLevel]
        break
      case TowerYellow.ID:
        canBuy = this.money >= TowerYellow.COST_UPGRADE[upgradeLevel]
        break

      default:
        break
    }

    return canBuy
  }

  haveMoneyToBuyNewTower(towerId: number) {
    const upgradeLevel = 0
    return this.haveMoneyToUpgradeTower(towerId, upgradeLevel)
  }

  sellTower(tower: Tower) {
    if (tower.upgrading) {
      return
    }
    const profit = tower.sellProfit
    this.increaseMoney(profit)

    const profitText = `+${profit} $`
    FlyIndicator.instantiateFlyIndicator(tower.position, profitText)

    tower.tileOrange.removeTower()
  }

  upgradeTower(tower: Tower) {
    if (tower.isMaxUpgraded) {
      return
    }
    if (!this.haveMoneyToUpgradeTower(tower.type, tower.upgradeLevel + 1)) {
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

  buyTower(mouseTileOrangeOver: TileOrange, selectedTower: number) {
    if (!this.haveMoneyToBuyNewTower(selectedTower)) {
      return
    }

    mouseTileOrangeOver.instantiateNewTower(selectedTower)
    const tower = mouseTileOrangeOver.getTower()

    if (!tower) {
      return
    }

    const cost = tower.cost
    this.decreaseMoney(cost)

    const costText = `-${cost} $`
    FlyIndicator.instantiateFlyIndicator(tower.position, costText)
  }
}
