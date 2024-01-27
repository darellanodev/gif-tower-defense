import { Score } from '../src/Score'

describe('Score', () => {
  test('when creating a new score object print 000000', () => {
    const score = new Score()

    const result = score.getPrintScore()

    expect(result).toBe('000000')
  })
  test('print score 25 as 000025', () => {
    const score = new Score()

    score.increase(25)
    const result = score.getPrintScore()

    expect(result).toBe('000025')
  })
})
