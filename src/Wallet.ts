import { ConstType } from './types'
import { GreenTower } from './GreenTower'
import { RedTower } from './RedTower'
import { YellowTower } from './YellowTower'

export class Wallet {
  money: number
  Const: ConstType

  constructor(money: number, Const: ConstType) {
    this.money = money
    this.Const = Const
  }

  getMoney(): number {
    return this.money
  }

  increase(quantity: number) {
    this.money += quantity
  }

  decrease(quantity: number) {
    this.money -= quantity
  }

  haveMoneyToBuy(towerId: number, upgradeLevel: number) {
    let canBuy = false

    switch (towerId) {
      case GreenTower.ID:
        canBuy = GreenTower.COST_UPGRADE[upgradeLevel] <= this.money
        break
      case RedTower.ID:
        canBuy = RedTower.COST_UPGRADE[upgradeLevel] <= this.money
        break
      case YellowTower.ID:
        canBuy = YellowTower.COST_UPGRADE[upgradeLevel] <= this.money
        break

      default:
        break
    }

    return canBuy
  }
}
