import { expect } from 'vitest'
import { Paginator } from '../../src/hud/Paginator'

test('getLabels, when there are 25 level pages and the current group of pages is 1, returns the correct pages', () => {
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

  const levelsPages = 25
  const currentPagesGroup = 1
  const paginator = new Paginator(levelsPages)
  const result = paginator.getLabels(currentPagesGroup)

  expect(result).toStrictEqual(expected)
})

test('getLabels, when there are 25 level pages and the current group of pages is 2, returns the correct pages', () => {
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

  const levelsPages = 25
  const currentPagesGroup = 2
  const paginator = new Paginator(levelsPages)
  const result = paginator.getLabels(currentPagesGroup)

  expect(result).toStrictEqual(expected)
})

test('getLabels, when there are 25 level pages and the current group of pages is 2, returns the correct pages', () => {
  const expected = ['<<', '21', '22', '23', '24', '25', '>>']

  const levelsPages = 25
  const currentPagesGroup = 3
  const paginator = new Paginator(levelsPages)
  const result = paginator.getLabels(currentPagesGroup)

  expect(result).toStrictEqual(expected)
})
