import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'

export class Wallet {
  static money: number

  static increase(quantity: number) {
    this.money += quantity
  }

  static decrease(quantity: number) {
    this.money -= quantity
  }

  static haveMoneyToBuy(towerId: number, upgradeLevel: number) {
    let canBuy = false

    switch (towerId) {
      case TowerGreen.ID:
        canBuy = TowerGreen.COST_UPGRADE[upgradeLevel] <= Wallet.money
        break
      case TowerRed.ID:
        canBuy = TowerRed.COST_UPGRADE[upgradeLevel] <= Wallet.money
        break
      case TowerYellow.ID:
        canBuy = TowerYellow.COST_UPGRADE[upgradeLevel] <= Wallet.money
        break

      default:
        break
    }

    return canBuy
  }
}
