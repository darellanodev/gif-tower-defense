import { Tower } from '../towers/Tower'
import { TowerGreen } from '../towers/TowerGreen'
import { TowerRed } from '../towers/TowerRed'
import { TowerYellow } from '../towers/TowerYellow'
import { FlyIndicator } from '../hud/FlyIndicator'
import { TileOrange } from '../tiles/TileOrange'

export class Wallet {
  static #instance: Wallet | null = null

  static GAME_NORMAL_MODE = 0
  static GAME_TESTING_MODE = 1
  static MONEY_IN_TESTING_MODE = 999999

  #mode = 0
  #money: number = 0

  constructor(gameMode: number, money: number) {
    if (Wallet.#instance !== null) {
      throw new Error(
        'Wallet is a singleton class, use getInstance to get the instance',
      )
    }
    this.#mode = gameMode
    this.initialMoney = money

    // assign the singleton instance
    Wallet.#instance = this
  }

  static getInstance(gameMode: number, money: number) {
    if (Wallet.#instance === null) {
      Wallet.#instance = new Wallet(gameMode, money)
    }
    return Wallet.#instance
  }
  // clearInstance is for using in jest
  static clearInstance() {
    Wallet.#instance = null
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

  haveMoneyToUpgradeTower(towerId: number, upgradeLevel: number): boolean {
    const towerCosts = {
      [TowerGreen.ID]: TowerGreen.COST_UPGRADE,
      [TowerRed.ID]: TowerRed.COST_UPGRADE,
      [TowerYellow.ID]: TowerYellow.COST_UPGRADE,
    }

    const cost = towerCosts[towerId]?.[upgradeLevel]

    if (cost === undefined) {
      throw new Error(`Unknown tower id: ${towerId}`)
    }

    return this.money >= cost
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
    this.decreaseMoney(cost)
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
