import { Tower } from '../towers/Tower'
import { FlyIndicator } from '../hud/FlyIndicator'
import { TileOrange } from '../levels/tiles/TileOrange'
import { MODE } from '../constants/mode'
import { MONEY_IN_TESTING_MODE } from '../constants/player'
import {
  TOWER_GREEN_UPGRADE,
  TOWER_ID,
  TOWER_RED_UPGRADE,
  TOWER_YELLOW_UPGRADE,
} from '../constants/tower'

export class Wallet {
  static #instance: Wallet | null = null

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

  set initialMoney(money: number) {
    if (money < 0) {
      throw new Error('Money must be a positive number')
    }
    this.#money = money
    if (this.#mode === MODE.TESTING) {
      this.#money = MONEY_IN_TESTING_MODE
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
      [TOWER_ID.GREEN]: TOWER_GREEN_UPGRADE.COST,
      [TOWER_ID.RED]: TOWER_RED_UPGRADE.COST,
      [TOWER_ID.YELLOW]: TOWER_YELLOW_UPGRADE.COST,
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
    this.increaseMoney(tower.sellProfit)

    FlyIndicator.instantiateFlyIndicator(
      tower.position,
      this.#getProfitText(tower.sellProfit),
    )

    tower.tileOrange.removeTower()
  }

  #getProfitText(profit: number) {
    return `+${profit} $`
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

    this.decreaseMoney(tower.cost)
    FlyIndicator.instantiateFlyIndicator(
      tower.position,
      this.#getCostText(tower.cost),
    )
  }

  #getCostText(cost: number) {
    return `-${cost} $`
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

    this.decreaseMoney(tower.cost)

    FlyIndicator.instantiateFlyIndicator(
      tower.position,
      this.#getCostText(tower.cost),
    )
  }
}
