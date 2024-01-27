import { Score } from '../src/Score'

describe('Score', () => {
  test('print score 25 as 000025', () => {
    const score = new Score()

    score.increase(25)
    const result = score.getPrintScore()

    expect(result).toBe('000025')
  })
})
