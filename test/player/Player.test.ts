import { describe, expect } from 'vitest'
import { Player } from '../../src/player/Player'

test('dont call the constructor two times', () => {
  new Player()
  expect(() => new Player()).toThrow(
    'Player is a singleton class. Use getInstance to get the instance of the Player',
  )
})

describe('getPrintScore', () => {
  test('when initially there is no score, print 0000000000', () => {
    const player = Player.getInstance()
    player.score = 0

    const result = player.getPrintScore()

    expect(result).toBe('0000000000')
  })
  test('when score is 45, print 0000000045', () => {
    const player = Player.getInstance()
    player.score = 45
    const result = player.getPrintScore()

    expect(result).toBe('0000000045')
  })
})

test('increaseScore, when initially there is no score and it increases 10 and 15, score is 25', () => {
  const player = Player.getInstance()
  player.score = 0

  player.increaseScore(10)
  player.increaseScore(15)

  expect(player.score).toBe(25)
})
