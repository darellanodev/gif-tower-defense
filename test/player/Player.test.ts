import { Player } from '../../src/player/Player'

describe('getPrintScore', () => {
  test('when initialy there is no score, print 0000000000', () => {
    const player = new Player()
    player.score = 0

    const result = player.getPrintScore()

    expect(result).toBe('0000000000')
  })
  test('when score is 45, print 0000000045', () => {
    const player = new Player()
    player.score = 45
    const result = player.getPrintScore()

    expect(result).toBe('0000000045')
  })
})

test('increaseScore, when initialy there is no score and it increases 10 and 15, score is 25', () => {
  const player = new Player()
  player.score = 0

  player.increaseScore(10)
  player.increaseScore(15)

  expect(player.score).toBe(25)
})
