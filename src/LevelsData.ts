import { MapDataType } from './types'
import { Const } from './Const'

export class LevelsData {
  static data: MapDataType[] = [
    {
      id: 1,
      title: 'serpent',
      comments: 'first level and also used in unit testing',
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
      money: 150,
      startDirection: Const.LEFT_DIRECTION,
      endDirection: Const.LEFT_DIRECTION,
    },
    {
      id: 6666,
      title: 'no valid map 1',
      comments:
        'invalid map with unreachable exit (look at the last row, there is a "0" blocking the exit), for unit testing purposes',
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
        'y011111111111111',
      ],
      money: 150,
      startDirection: Const.LEFT_DIRECTION,
      endDirection: Const.LEFT_DIRECTION,
    },
    {
      id: 6667,
      title: 'no valid map 2',
      comments: 'empty rowsMap, for unit testing purposes',
      rowsMap: [],
      money: 150,
      startDirection: Const.LEFT_DIRECTION,
      endDirection: Const.LEFT_DIRECTION,
    },
  ]
}
