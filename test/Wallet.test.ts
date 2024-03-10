import { Wallet } from '../src/Wallet'
import { TowerGreen } from '../src/TowerGreen'

describe('Wallet', () => {
  test('have money to buy a green tower', () => {
    const wallet = new Wallet(150)
    const upgradeLevel = 0

    const result = wallet.haveMoneyToBuy(TowerGreen.ID, upgradeLevel)

    expect(result).toBeTruthy()
  })
  test('have no money to buy a green tower', () => {
    const wallet = new Wallet(20)
    const upgradeLevel = 30

    const result = wallet.haveMoneyToBuy(TowerGreen.ID, upgradeLevel)

    expect(result).toBeFalsy()
  })
})
