import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'

export class Wallet {
  #money: number

  constructor(money: number) {
    this.#money = money
  }

  get money(): number {
    return this.#money
  }

  increase(quantity: number) {
    this.#money += quantity
  }

  decrease(quantity: number) {
    this.#money -= quantity
  }

  haveMoneyToBuy(towerId: number, upgradeLevel: number) {
    let canBuy = false

    switch (towerId) {
      case TowerGreen.ID:
        canBuy = TowerGreen.COST_UPGRADE[upgradeLevel] <= this.#money
        break
      case TowerRed.ID:
        canBuy = TowerRed.COST_UPGRADE[upgradeLevel] <= this.#money
        break
      case TowerYellow.ID:
        canBuy = TowerYellow.COST_UPGRADE[upgradeLevel] <= this.#money
        break

      default:
        break
    }

    return canBuy
  }
}
