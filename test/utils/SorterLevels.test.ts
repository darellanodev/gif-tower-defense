import { expect } from 'vitest'
import { LevelsDataSortingTesting } from '../../src/levels/LevelsDataSortingTesting'
import { SorterLevels } from '../../src/utils/SorterLevels'

test('sort, when the levels ids are consecutively 8,1,7, return the levels ordered by ids 1,7,8', () => {
  const sorterLevels = new SorterLevels(LevelsDataSortingTesting.data)
  const result = sorterLevels.sort()
  expect(result).toStrictEqual(LevelsDataSortingTesting.sortedData)
})
