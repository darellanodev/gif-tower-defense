import { TowerGreen } from './TowerGreen'
import { TowerRed } from './TowerRed'
import { TowerYellow } from './TowerYellow'

export class Player {
  static lives: number = 7
  static score: number = 0
  static money: number = 0
  static wave: number = 1

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
}
