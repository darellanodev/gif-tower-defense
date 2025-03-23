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

test('getButtons, when there are more than 15 * 10 * 5 group pages levels and group page is 2, returns the correct pages', () => {
  const expected = [
    '<<',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '>>',
  ]

  const totalLevels = 150
  const currentPagesGroup = 2
  const paginator = new Paginator(totalLevels)
  const result = paginator.getLabels(currentPagesGroup)

  expect(result).toStrictEqual(expected)
})
