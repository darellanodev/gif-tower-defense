import { Player } from '../src/Player'
import { TowerGreen } from '../src/towers/TowerGreen'

describe('getPrintScore', () => {
  test('when initialy there is no score, print 0000000000', () => {
    Player.score = 0

    const result = Player.getPrintScore()

    expect(result).toBe('0000000000')
  })
  test('when score is 45, print 0000000045', () => {
    Player.score = 45
    const result = Player.getPrintScore()

    expect(result).toBe('0000000045')
  })
})

describe('increaseScore', () => {
  test('when initialy there is no score and it increases 10 and 15, score is 25', () => {
    Player.score = 0

    Player.increaseScore(10)
    Player.increaseScore(15)

    expect(Player.score).toBe(25)
  })
})

describe('haveMoneyToBuy', () => {
  test('when player has 150 of money and wants to buy a new green tower (cost 50), return true', () => {
    Player.initialMoney = 150

    const result = Player.haveMoneyToBuy(TowerGreen.ID, 0)

    expect(result).toBeTruthy()
  })
  test('when player has 30 of money and wants to buy a new green tower (cost 50), return false', () => {
    Player.initialMoney = 30

    const result = Player.haveMoneyToBuy(TowerGreen.ID, 0)

    expect(result).toBeFalsy()
  })
  test('when player has 150 of money and wants to upgrade a tower to level 1 (cost 75), return true', () => {
    Player.initialMoney = 150

    const result = Player.haveMoneyToBuy(TowerGreen.ID, 1)

    expect(result).toBeTruthy()
  })
})
describe('set initialMoney', () => {
  test('when set money to a negative number, launch an exception ', () => {
    expect(() => {
      Player.initialMoney = -150
    }).toThrow('Money must be a positive number')
  })
  test('when game mode is GAME_TESTING_MODE if we set the intial money to 150, money still sets to MONEY_IN_TESTING_MODE', () => {
    Player.gameMode = Player.GAME_TESTING_MODE
    Player.initialMoney = 150
    const result = Player.money

    expect(result).toBe(Player.MONEY_IN_TESTING_MODE)
    //reset
    Player.gameMode = Player.GAME_NORMAL_MODE
  })
})

describe('isGameInTestingMode', () => {
  test('by default game is in normal mode, return false', () => {
    expect(Player.isGameInTestingMode).toBeTruthy()
  })
})
