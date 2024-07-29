import { OldLevelConverter } from '../../src/utils/OldLevelConverter'

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
  const expected = 'comments are not set yet'
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
  const expected = 3
  expect(result).toBe(expected)
})

test('extract endDirection', () => {
  const result = oldLevelConverter.endDirection
  const expected = 1
  expect(result).toBe(expected)
})

test('get the json format', () => {
  const result = oldLevelConverter.json
  const expected = `
    {
      id: 12,
      title: 'question',
      author: 'ocliboy',
      comments: 'comments are not set yet',
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
      startDirection: ConstDirection.RIGHT,
      endDirection: ConstDirection.DOWN,
    },
`
  expect(result).toBe(expected)
})
