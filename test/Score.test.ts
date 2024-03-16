import { Score } from '../src/Score'

describe('Score', () => {
  test('when creating a new score object print 0000000000', () => {
    const result = Score.getPrintScore()

    expect(result).toBe('0000000000')
  })
  test('print score 25 as 0000000025', () => {
    Score.increase(10)
    Score.increase(15)
    const result = Score.getPrintScore()

    expect(result).toBe('0000000025')
  })
})
