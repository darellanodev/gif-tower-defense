import { MapDataType } from '../types/mapDataType'
import { ConstDirection } from '../constants/ConstDirection'

export class LevelsData {
  static data: MapDataType[] = [
    {
      id: 1,
      title: 'serpent',
      author: 'ocliboy',
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
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 13,
      title: 'doble loop',
      author: 'ocliboy',
      comments: 'third level',
      rowsMap: [
        '00000000x0000000',
        '000000011000011y',
        '0000001100001100',
        '0000011000011000',
        '0000110000110000',
        '0000100000100000',
        '0111111111111100',
        '0100100000100100',
        '0111100000111100',
        '0000000000000000',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.UP,
    },
    {
      id: 14,
      title: 'one loop',
      author: 'ocliboy',
      comments: 'second valid level',
      rowsMap: [
        '0000000000000000',
        '001111100000011x',
        '0010001111111100',
        '0010000000000000',
        '0010001111111100',
        '0010001000000100',
        '0011111111111100',
        '0000001000000000',
        '000000111111111y',
        '0000000000000000',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.RIGHT,
    },

    {
      id: 6666,
      title: 'no valid map 1',
      author: 'admin',
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
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 6667,
      title: 'no valid map 2',
      author: 'admin',
      comments: 'empty rowsMap, for unit testing purposes',
      rowsMap: [],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
  ]
}
