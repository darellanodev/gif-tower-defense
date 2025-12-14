import { expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { LevelsDataTesting } from '../../src/levels/LevelsDataTesting'
import { TESTING_LEVEL } from '../../src/constants/testing'

test('getLevel, when request the id of a testing level, return data of the corresponding level', () => {
  const expected = {
    id: 1,
    comments: 'first level and also used in unit testing',
    title: 'serpent',
    author: 'ocliboy',
    rowsMap: [
      '111111111111111x',
      '1000000000000000',
      '1011111111111111',
      '1010000000000001',
      '1010000111111101',
      '1011111100000101',
      '1000000000000101',
      '1111111111111101',
      '0000000000000001',
      'y111111111111111',
    ],
    startDirection: DIRECTION.LEFT,
    endDirection: DIRECTION.LEFT,
    money: 150,
  }

  const levelsDataProvider = LevelsDataProvider.getInstance()

  levelsDataProvider.initLevels(LevelsDataTesting.data)

  const result = levelsDataProvider.getById(TESTING_LEVEL.ID_VALID)

  expect(result).toStrictEqual(expected)
})

test('getPageLevels, when request the page 1, return the first 15 levels', () => {
  const levelsDataProvider = LevelsDataProvider.getInstance()

  levelsDataProvider.initLevels(LevelsDataTesting.data)

  const result = levelsDataProvider.getPageLevelsIds(1)
  expect(result).toStrictEqual([
    1, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ])
})

test('getPageLevels, when request the page 2, return the next 15 levels', () => {
  const levelsDataProvider = LevelsDataProvider.getInstance()

  levelsDataProvider.initLevels(LevelsDataTesting.data)

  const result = levelsDataProvider.getPageLevelsIds(2)
  expect(result).toStrictEqual([
    21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36,
  ])
})

test('getTotalPages, when called, returns the total pages that can contain a maximum of 15 levels', () => {
  const levelsDataProvider = LevelsDataProvider.getInstance()

  levelsDataProvider.initLevels(LevelsDataTesting.data)

  const result = levelsDataProvider.getTotalPages()
  expect(result).toStrictEqual(3)
})
