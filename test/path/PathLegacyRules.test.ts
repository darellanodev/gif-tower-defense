import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { MapDataType } from '../../src/types/mapDataType'
import { getPathFromMap } from '../helpers/levelMap'

const { LEFT, RIGHT, DOWN } = DIRECTION

const getMap = (
  rowsMap: string[],
  startDirection: number,
  endDirection: number,
): MapDataType => ({
  id: 9100,
  title: 'path rules',
  author: 'test',
  comments: '',
  rowsMap,
  money: 150,
  startDirection,
  endDirection,
})

const makeOrders = (map: MapDataType) => {
  const path = getPathFromMap(map)
  path.makeOrders()
  return path
}

describe('junctions', () => {
  // the enemies go down from x. In (5,2) the way ahead is blocked and left and right are walkable:
  // left has the priority. The right branch is a dead end that must not be used.
  const rowsMap = [
    '00000x0000000000',
    '0000010000000000',
    'y11111111100000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
  ].map((row) => row.padEnd(16, '0'))
  const map = getMap(rowsMap, DOWN, LEFT)

  test('when left and right are walkable, the enemies turn left', () => {
    const path = makeOrders(map)

    // enter the start tile, 2 tiles down, 5 tiles left to the end tile and 2 more orders to leave the map
    const expected = [DOWN, DOWN, DOWN, ...Array(5).fill(LEFT), LEFT, LEFT]
    expect(path.orders).toStrictEqual(expected)
  })

  test('the end tile is reached', () => {
    const path = makeOrders(map)

    expect(path.endReached).toBeTruthy()
  })
})

describe('dead ends', () => {
  // the enemies go down from x. In (5,2) left has the priority but it is a dead end: they go back and
  // continue to the right until the end tile.
  const rowsMap = [
    '00000x0000000000',
    '0000010000000000',
    '000011111111111y',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
  ]
  const map = getMap(rowsMap, DOWN, RIGHT)

  test('the enemies go into the dead end and go back to continue', () => {
    const path = makeOrders(map)

    // down to (5,2), left to the dead end (4,2), back right to (5,2), 10 tiles right to the end tile, and 2 more orders
    const expected = [DOWN, DOWN, DOWN, LEFT, ...Array(1 + 10 + 2).fill(RIGHT)]
    expect(path.orders).toStrictEqual(expected)
  })

  test('the end tile is reached', () => {
    const path = makeOrders(map)

    expect(path.endReached).toBeTruthy()
  })
})

describe('loops', () => {
  // a closed ring of path tiles connected to the start tile, and an end tile that can not be reached
  const rowsMap = [
    '0000000000000000',
    'x111000000000000',
    '0101000000000000',
    '0111000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '000000000000000y',
  ]
  const map = getMap(rowsMap, RIGHT, RIGHT)

  test('when the enemies walk in circles, the end tile is not reached', () => {
    const path = makeOrders(map)

    expect(path.endReached).toBeFalsy()
  })

  test('the number of orders is limited', () => {
    const path = makeOrders(map)

    expect(path.orders.length).toBeLessThanOrEqual(1001)
  })

  test('there is one speed factor per order', () => {
    const path = makeOrders(map)

    expect(path.speedFactors).toHaveLength(path.orders.length)
  })
})

describe('the start tile is walkable', () => {
  // the enemies enter to the right and reach a dead end. They go back, cross the start tile and continue down.
  // They can only reach the end tile if the start tile is walkable.
  const rowsMap = [
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    'x111000000000000',
    '1000000000000000',
    '1000000000000000',
    '1000000000000000',
    '1000000000000000',
    'y000000000000000',
  ]
  const map = getMap(rowsMap, RIGHT, DOWN)

  test('the enemies go back through the start tile and continue to the end tile', () => {
    const path = makeOrders(map)

    // enter the start tile and 3 tiles right, 3 tiles back left to the start tile, 5 tiles down and 2 more orders
    const expected = [
      ...Array(1 + 3).fill(RIGHT),
      ...Array(3).fill(LEFT),
      ...Array(5 + 2).fill(DOWN),
    ]
    expect(path.orders).toStrictEqual(expected)
  })

  test('the end tile is reached', () => {
    const path = makeOrders(map)

    expect(path.endReached).toBeTruthy()
  })
})
