import { Player } from '../src/Player'
import { TowerGreen } from '../src/TowerGreen'

describe('Score', () => {
  test('when creating a new score object print 0000000000', () => {
    const result = Player.getPrintScore()

    expect(result).toBe('0000000000')
  })
  test('print score 25 as 0000000025', () => {
    Player.increaseScore(10)
    Player.increaseScore(15)
    const result = Player.getPrintScore()

    expect(result).toBe('0000000025')
  })
  test('have money to buy a green tower', () => {
    Player.money = 150
    const upgradeLevel = 0

    const result = Player.haveMoneyToBuy(TowerGreen.ID, upgradeLevel)

    expect(result).toBeTruthy()
  })
  test('have no money to buy a green tower', () => {
    Player.money = 20
    const upgradeLevel = 30

    const result = Player.haveMoneyToBuy(TowerGreen.ID, upgradeLevel)

    expect(result).toBeFalsy()
  })
})
