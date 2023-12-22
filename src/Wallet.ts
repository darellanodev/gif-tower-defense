import { ConstType } from './types'

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

  haveMoneyToBuy(towerType: number, upgradeLevel: number) {
    let canBuy = false

    switch (towerType) {
      case this.Const.GREEN_TOWER:
        canBuy = this.Const.COST_UPGRADE_GREEN_TOWER[upgradeLevel] <= this.money
        break
      case this.Const.RED_TOWER:
        canBuy = this.Const.COST_UPGRADE_RED_TOWER[upgradeLevel] <= this.money
        break
      case this.Const.YELLOW_TOWER:
        canBuy =
          this.Const.COST_UPGRADE_YELLOW_TOWER[upgradeLevel] <= this.money
        break

      default:
        break
    }

    return canBuy
  }
}
