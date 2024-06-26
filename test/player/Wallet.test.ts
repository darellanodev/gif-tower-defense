import { Wallet } from '../../src/player/Wallet'
import { TowerGreen } from '../../src/towers/TowerGreen'

describe('haveMoneyToBuy', () => {
  test('when wallet has 150 of money and wants to buy a new green tower (cost 50), return true', () => {
    const money = 150
    const wallet = new Wallet(Wallet.GAME_NORMAL_MODE, money)

    const result = wallet.haveMoneyToBuyNewTower(TowerGreen.ID)

    expect(result).toBeTruthy()
  })
  test('when wallet has 30 of money and wants to buy a new green tower (cost 50), return false', () => {
    const money = 30
    const wallet = new Wallet(Wallet.GAME_NORMAL_MODE, money)

    const result = wallet.haveMoneyToBuyNewTower(TowerGreen.ID)

    expect(result).toBeFalsy()
  })
  test('when wallet has 150 of money and wants to upgrade a tower to level 1 (cost 75), return true', () => {
    const money = 150
    const wallet = new Wallet(Wallet.GAME_NORMAL_MODE, money)

    const result = wallet.haveMoneyToUpgradeTower(TowerGreen.ID, 1)

    expect(result).toBeTruthy()
  })
})
describe('set initialMoney', () => {
  test('when set money to a negative number, launch an exception ', () => {
    const money = -150

    expect(() => {
      const wallet = new Wallet(Wallet.GAME_NORMAL_MODE, money)
    }).toThrow('Money must be a positive number')
  })
  test('when game mode is GAME_TESTING_MODE if we set the intial money to 150, money still sets to MONEY_IN_TESTING_MODE', () => {
    const money = 150
    const wallet = new Wallet(Wallet.GAME_TESTING_MODE, money)
    const result = wallet.money

    expect(result).toBe(Wallet.MONEY_IN_TESTING_MODE)
  })
})
