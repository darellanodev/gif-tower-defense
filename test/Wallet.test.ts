import { Wallet } from '../src/Wallet'
import { Const } from '../src/Const'
import { GreenTower } from '../src/GreenTower'

describe('Wallet', () => {
  test('have money to buy a green tower', () => {
    const wallet = new Wallet(150, Const)
    const upgradeLevel = 0

    const result = wallet.haveMoneyToBuy(GreenTower.ID, upgradeLevel)

    expect(result).toBeTruthy()
  })
  test('have no money to buy a green tower', () => {
    const wallet = new Wallet(20, Const)
    const upgradeLevel = 30

    const result = wallet.haveMoneyToBuy(GreenTower.ID, upgradeLevel)

    expect(result).toBeFalsy()
  })
})
