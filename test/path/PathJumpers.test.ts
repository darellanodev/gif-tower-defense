import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { MapDataType } from '../../src/types/mapDataType'
import { JumpStep } from '../../src/types/jumpStep'
import { getPathFromMap } from '../helpers/levelMap'

const { LEFT, DOWN } = DIRECTION

const emptyRow = '0000000000000000'

// The enemies enter by the tile x (column 15 of the row 1) and leave by the tile y (column 0), going left.
// Columns:      0123456789012345
const jumper2 = 'y11111111051111x' // jumper of 2 tiles in column 10, hole in column 9, landing in column 8
const jumper3 = 'y11111110061111x' // jumper of 3 tiles in column 10, holes in columns 8 and 9, landing in column 7
const jumper4 = 'y11111100071111x' // jumper of 4 tiles in column 10, holes in columns 7, 8 and 9, landing in column 6

const getMap = (
  rows: string[],
  startDirection: number = LEFT,
  endDirection: number = LEFT,
): MapDataType => ({
  id: 9200,
  title: 'jumpers',
  author: 'test',
  comments: '',
  rowsMap: rows,
  money: 150,
  startDirection,
  endDirection,
})

const getCorridorMap = (corridor: string) =>
  getMap([emptyRow, corridor, ...Array(8).fill(emptyRow)])

const makeOrders = (map: MapDataType) => {
  const path = getPathFromMap(map)
  path.makeOrders()
  return path
}

const jumpOrders = (path: ReturnType<typeof makeOrders>) =>
  path.jumps.filter((jump) => jump !== null)

const air = (length: number): JumpStep[] =>
  Array.from({ length }, (_, step) => ({ step, length }))

describe('a jumper of two tiles (symbol 5)', () => {
  const map = getCorridorMap(jumper2)

  test('the enemies jump over the hole and reach the end', () => {
    expect(makeOrders(map).endReached).toBeTruthy()
  })

  test('without the jumper the hole blocks the way', () => {
    const withoutJumper = getCorridorMap(jumper2.replace('5', '1'))

    expect(makeOrders(withoutJumper).endReached).toBeFalsy()
  })

  test('the orders go straight: 1 to enter, 15 tiles to the end tile (2 of them jumping) and 2 more to leave', () => {
    const path = makeOrders(map)

    expect(path.orders).toStrictEqual(Array(1 + 15 + 2).fill(LEFT))
  })

  test('only the 2 orders of the jump are in the air', () => {
    expect(jumpOrders(makeOrders(map))).toStrictEqual(air(2))
  })

  test('the jump starts when the enemy leaves the jumper tile', () => {
    const path = makeOrders(map)

    // the order 0 enters the tile x and the orders 1 to 5 arrive to the columns 14 to 10, where the jumper is
    expect(path.jumps[6]).toStrictEqual({ step: 0, length: 2 })
    expect(path.jumps[7]).toStrictEqual({ step: 1, length: 2 })
  })

  test('the orders before and after the jump are not in the air', () => {
    const path = makeOrders(map)

    expect(path.jumps[5]).toBeNull()
    expect(path.jumps[8]).toBeNull()
  })

  test('the orders in the air have no speed factor', () => {
    const path = makeOrders(map)

    expect([path.speedFactors[6], path.speedFactors[7]]).toStrictEqual([1, 1])
  })

  test('there is one jump entry per order', () => {
    const path = makeOrders(map)

    expect(path.jumps).toHaveLength(path.orders.length)
  })
})

describe('the jump distance depends on the symbol', () => {
  test('a jumper of three tiles (symbol 6) jumps over two holes', () => {
    const path = makeOrders(getCorridorMap(jumper3))

    expect(path.endReached).toBeTruthy()
    expect(jumpOrders(path)).toStrictEqual(air(3))
  })

  test('a jumper of four tiles (symbol 7) jumps over three holes', () => {
    const path = makeOrders(getCorridorMap(jumper4))

    expect(path.endReached).toBeTruthy()
    expect(jumpOrders(path)).toStrictEqual(air(4))
  })

  test('a jumper of two tiles can not cross two holes', () => {
    const map = getCorridorMap('y11111110051111x')

    expect(makeOrders(map).endReached).toBeFalsy()
  })
})

describe('what the enemies jump over', () => {
  test.each([
    ['a black tile', 'y11111111251111x'],
    ['a crystal', 'y11111111c51111x'],
    ['a path tile', 'y11111111151111x'],
  ])('they can jump over %s', (_name, corridor) => {
    const path = makeOrders(getCorridorMap(corridor))

    expect(path.endReached).toBeTruthy()
    expect(jumpOrders(path)).toStrictEqual(air(2))
  })
})

describe('landing', () => {
  test('when the landing tile is not walkable, there is no jump and the end is not reached', () => {
    const path = makeOrders(getCorridorMap('y11111110051111x'))

    expect(path.endReached).toBeFalsy()
    expect(jumpOrders(path)).toHaveLength(0)
  })

  test('when the landing is out of the map, there is no jump and the end is not reached', () => {
    // the jumper of 4 tiles is in column 2 and it would land in column -2
    const path = makeOrders(getCorridorMap('y17111111111111x'))

    expect(path.endReached).toBeFalsy()
    expect(jumpOrders(path)).toHaveLength(0)
  })

  test('after landing the enemies apply the turning rule again: they can turn on the landing tile', () => {
    // jumper in column 10, hole in column 9 and the landing in column 8, where the way turns down to the end tile
    const rows = [
      emptyRow,
      '000000001051111x',
      ...Array(7).fill('0000000010000000'),
      '00000000y0000000',
    ]
    const path = makeOrders(getMap(rows, LEFT, DOWN))

    // 1 to enter, 5 tiles to the jumper, 2 jumping, 8 tiles down to the end tile and 2 more to leave
    const expected = [...Array(8).fill(LEFT), ...Array(10).fill(DOWN)]
    expect(path.orders).toStrictEqual(expected)
  })

  test('the landing tile can be another jumper: the jumps are chained', () => {
    // jumpers in columns 13 and 11, holes in columns 12 and 10
    const path = makeOrders(getCorridorMap('y11111111105051x'))

    expect(path.endReached).toBeTruthy()
    expect(jumpOrders(path)).toStrictEqual([...air(2), ...air(2)])
  })
})

describe('two jumps', () => {
  test('there is one speed factor and one jump entry per order', () => {
    const path = makeOrders(getCorridorMap('y11111111105051x'))

    expect(path.speedFactors).toHaveLength(path.orders.length)
    expect(path.jumps).toHaveLength(path.orders.length)
  })
})
