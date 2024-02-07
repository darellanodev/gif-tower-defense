import { Const } from '../src/Const'
import { LevelsDataProvider } from '../src/LevelsDataProvider'
import { LevelsData } from '../src/LevelsData'

describe('Levels data provider', () => {
  test('get level data', () => {
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
      startDirection: Const.LEFT_DIRECTION,
      endDirection: Const.LEFT_DIRECTION,
      money: 150,
    }

    const levelsDataProvider = new LevelsDataProvider(LevelsData.data)
    const result = levelsDataProvider.getLevel(
      Const.ID_LEVEL_VALID_FOR_UNIT_TESTING,
    )

    expect(result).toStrictEqual(expected)
  })
})
