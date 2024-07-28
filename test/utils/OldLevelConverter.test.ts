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
