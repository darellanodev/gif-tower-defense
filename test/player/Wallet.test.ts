import { describe, expect } from 'vitest'
import { Wallet } from '../../src/player/Wallet'
import { TowerGreen } from '../../src/towers/TowerGreen'

test('can not call constructor two times', () => {
  const money = 150
  new Wallet(Wallet.GAME_NORMAL_MODE, money)
  expect(() => new Wallet(Wallet.GAME_NORMAL_MODE, money)).toThrow(
    'Wallet is a singleton class, use getInstance to get the instance',
  )
})

describe('haveMoneyToBuy', () => {
  test('when wallet has 150 of money and wants to buy a new green tower (cost 50), return true', () => {
    Wallet.clearInstance()
    const money = 150
    const wallet = Wallet.getInstance(Wallet.GAME_NORMAL_MODE, money)

    const result = wallet.haveMoneyToBuyNewTower(TowerGreen.ID)

    expect(result).toBeTruthy()
  })
  test('when wallet has 30 of money and wants to buy a new green tower (cost 50), return false', () => {
    Wallet.clearInstance()
    const money = 30
    const wallet = Wallet.getInstance(Wallet.GAME_NORMAL_MODE, money)

    const result = wallet.haveMoneyToBuyNewTower(TowerGreen.ID)

    expect(result).toBeFalsy()
  })
  test('when wallet has 150 of money and wants to upgrade a tower to level 1 (cost 75), return true', () => {
    Wallet.clearInstance()
    const money = 150
    const wallet = Wallet.getInstance(Wallet.GAME_NORMAL_MODE, money)

    const result = wallet.haveMoneyToUpgradeTower(TowerGreen.ID, 1)

    expect(result).toBeTruthy()
  })
})
describe('set initialMoney', () => {
  test('when set money to a negative number, launch an exception ', () => {
    Wallet.clearInstance()
    const money = -150

    expect(() => {
      const wallet = Wallet.getInstance(Wallet.GAME_NORMAL_MODE, money)
    }).toThrow('Money must be a positive number')
  })
  test('when game mode is GAME_TESTING_MODE if we set the initial money to 150, money still sets to MONEY_IN_TESTING_MODE', () => {
    Wallet.clearInstance()
    const money = 150
    const wallet = Wallet.getInstance(Wallet.GAME_TESTING_MODE, money)
    const result = wallet.money

    expect(result).toBe(Wallet.MONEY_IN_TESTING_MODE)
  })
})
