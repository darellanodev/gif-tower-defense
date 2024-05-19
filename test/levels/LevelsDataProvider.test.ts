import { ConstDirection } from '../../src/constants/ConstDirection'
import { ConstTest } from '../../src/constants/ConstTest'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { LevelsData } from '../../src/levels/LevelsData'

test('getLevel, when request the id of a testing level, return data of the corresponding level', () => {
  const expected = {
    id: 1,
    comments: 'first level and also used in unit testing',
    title: 'serpent',
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
    startDirection: ConstDirection.LEFT,
    endDirection: ConstDirection.LEFT,
    money: 150,
  }

  const levelsDataProvider = new LevelsDataProvider(LevelsData.data)

  const result = levelsDataProvider.getLevel(
    ConstTest.ID_LEVEL_VALID_FOR_UNIT_TESTING,
  )

  expect(result).toStrictEqual(expected)
})
