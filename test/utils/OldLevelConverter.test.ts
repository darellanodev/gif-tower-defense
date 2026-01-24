import { expect } from 'vitest'
import { OldLevelConverter } from '../../src/utils/OldLevelConverter'
import { DIRECTION } from '../../src/constants/direction'
const allLevels = [
  {
    id: 27,
    title: 'La escalera',
    author: 'unknown321',
    comments: '',
    rowsMap: [
      'y222222222111111',
      '1100200222100001',
      '2110020022100001',
      '2011002002100021',
      '2001100202100201',
      '220011002210201x',
      '2020011002120110',
      '2202001102101102',
      '2220200112121022',
      '2222222211111222',
    ],
    money: 150,
    startDirection: DIRECTION.UP,
    endDirection: DIRECTION.LEFT,
  },
  {
    id: 7,
    title: 'serpiente',
    author: 'ocliboy',
    comments: '',
    rowsMap: [
      '0000000000000000',
      '011111111111111y',
      '0100000000000000',
      '0100000000000000',
      '0100001111111100',
      '0100001000000100',
      '0111111000000100',
      '0000000000000100',
      '0000000000111100',
      '0000000000x00000',
    ],
    money: 150,
    startDirection: DIRECTION.DOWN,
    endDirection: DIRECTION.UP,
  },
  {
    id: 8,
    title: 'cross',
    author: 'ocliboy',
    comments: '',
    rowsMap: [
      '000y000000000000',
      '0001000000000000',
      '0001022011111100',
      '0001022010000100',
      '0001000010220100',
      '0001111110220100',
      '0000000000000100',
      '0000002201111100',
      '0000002201000000',
      '000000000x000000',
    ],
    money: 150,
    startDirection: DIRECTION.UP,
    endDirection: DIRECTION.UP,
  },
]
const oldLevelData =
  "(12,'question','ocliboy','0000000000000000,x111111111111110,0000002222220010,0111020000002010,0101000022220010,0101000020000010,0101000000000010,0101000020000010,0101111111111110,0y00000000000000@1,3,50,450,150',1297020179,'127.0.0.1',0,288,3)"
const oldLevelConverter = new OldLevelConverter(oldLevelData)

test('extract author', () => {
  const result = oldLevelConverter.author
  const expected = 'ocliboy'
  expect(result).toBe(expected)
})

test('extract id', () => {
  const result = oldLevelConverter.id
  const expected = 12
  expect(result).toBe(expected)
})

test('extract title', () => {
  const result = oldLevelConverter.title
  const expected = 'question'
  expect(result).toBe(expected)
})

test('extract comments', () => {
  const result = oldLevelConverter.comments
  const expected = ''
  expect(result).toBe(expected)
})

test('extract rowsmap', () => {
  const result = oldLevelConverter.rowsmap
  const expected = [
    '0000000000000000',
    'x111111111111110',
    '0000002222220010',
    '0111020000002010',
    '0101000022220010',
    '0101000020000010',
    '0101000000000010',
    '0101000020000010',
    '0101111111111110',
    '0y00000000000000',
  ]
  expect(result).toStrictEqual(expected)
})

test('extract money', () => {
  const result = oldLevelConverter.money
  const expected = 150
  expect(result).toBe(expected)
})

test('extract startDirection', () => {
  const result = oldLevelConverter.startDirection
  const expected = 1
  expect(result).toBe(expected)
})

test('extract endDirection', () => {
  const result = oldLevelConverter.endDirection
  const expected = 3
  expect(result).toBe(expected)
})

test('get the json format', () => {
  const result = oldLevelConverter.json
  const expected = `
    {
      id: 12,
      title: 'question',
      author: 'ocliboy',
      comments: '',
      rowsMap: [
        
        '0000000000000000',
        'x111111111111110',
        '0000002222220010',
        '0111020000002010',
        '0101000022220010',
        '0101000020000010',
        '0101000000000010',
        '0101000020000010',
        '0101111111111110',
        '0y00000000000000',
    
      ],
      money: 150,
      startDirection: DIRECTION.RIGHT,
      endDirection: DIRECTION.DOWN,
    },
`
  expect(result).toBe(expected)
})

test('can convert the level', () => {
  const availableTiles = ['0', '1', '2', 'x', 'y']
  const result = oldLevelConverter.canBeConverted(availableTiles)
  expect(result).toBeTruthy()
})

test('can not convert the level', () => {
  const availableTiles = ['0', '1', 'x', 'y']
  const result = oldLevelConverter.canBeConverted(availableTiles)
  expect(result).toBeFalsy()
})

test('existsLevelId return true if the level id exists', () => {
  const processedLevel = `(27,'La escalera','unknown321','y222222222111111,1100200222100001,2110020022100001,2011002002100021,2001100202100201,220011002210201x,2020011002120110,2202001102101102,2220200112121022,2222222211111222@2,4,0,0,150',1297927251,'83.56.250.126',0,67,1),`
  const result = oldLevelConverter.existsLevelId(allLevels, processedLevel)
  expect(result).toBeTruthy()
})

test('existsLevelId return false if the level id does not exists', () => {
  const processedLevel = `(48,'Blue cacao','unknown321','2020202020202020,ys1s1s1s1s1s1s12,02020202020202s0,22201s1s101s1012,0202s020s2s0s2s0,2s1sss0210121012,0120ss20s1s0s1s0,2s02020202020202,01s1s1s1s1sssssx,2020202020202020@2,2,0,50,150',1299836796,'79.159.13.189',0,52,2),
`
  const result = oldLevelConverter.existsLevelId(allLevels, processedLevel)
  expect(result).toBeFalsy()
})
