import { expect } from 'vitest'
import { Paginator } from '../../src/hud/Paginator'

test('getButtons, when there are more than 15 * 10 levels and pages group is 1, returns the correct pages', () => {
  const expected = [
    '<<',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '>>',
  ]

  const totalLevels = 150
  const currentPagesGroup = 1
  const paginator = new Paginator(totalLevels)
  const result = paginator.getLabels(currentPagesGroup)

  expect(result).toStrictEqual(expected)
})
