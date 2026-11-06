import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { ENEMY_ICE_SPEED_FACTOR } from '../../src/constants/enemy'
import { MapDataType } from '../../src/types/mapDataType'
import { getLevelMap, getPathFromMap } from '../helpers/levelMap'

const levelWithIce: MapDataType = {
  id: 9001,
  title: 'ice test',
  author: 'test',
  comments: 'three ice tiles in the path',
  rowsMap: [
    '0000000000000000',
    'y1ss11s11111111x',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
  ],
  money: 150,
  startDirection: DIRECTION.LEFT,
  endDirection: DIRECTION.LEFT,
}

const getPathWithOrders = (levelMap: MapDataType) => {
  const path = getPathFromMap(levelMap)
  path.makeOrders()
  return path
}

describe('speedFactors', () => {
  test('there is one speed factor per order', () => {
    const path = getPathWithOrders(levelWithIce)

    expect(path.speedFactors).toHaveLength(path.orders.length)
  })

  test('when the level has no ice tiles, all the factors are 1', () => {
    const path = getPathWithOrders(getLevelMap(1))

    expect(path.speedFactors.every((factor) => factor === 1)).toBeTruthy()
  })

  test('when the level has three ice tiles, there are three ice factors', () => {
    const path = getPathWithOrders(levelWithIce)

    const iceFactors = path.speedFactors.filter(
      (factor) => factor === ENEMY_ICE_SPEED_FACTOR,
    )

    expect(iceFactors).toHaveLength(3)
  })

  test('the ice factor is applied to the order that leaves the ice tile', () => {
    const path = getPathWithOrders(levelWithIce)
    const firstOrderLeavingStartTile = 1
    const iceColumns = [6, 3, 2]
    const lastColumnBeforeEnd = 15

    // the order k leaves the tile in column 15 - (k - 1): the start tile is in column 15
    const expectedIceOrders = iceColumns.map(
      (column) => lastColumnBeforeEnd - column + firstOrderLeavingStartTile,
    )
    const result = path.speedFactors
      .map((factor, index) => (factor > 1 ? index : -1))
      .filter((index) => index !== -1)

    expect(result).toStrictEqual(expectedIceOrders)
  })

  test('the first order, from out of the map to the start tile, is never fast', () => {
    const path = getPathWithOrders(levelWithIce)

    expect(path.speedFactors[0]).toBe(1)
  })

  test('the last order, from the end tile to out of the map, is never fast', () => {
    const path = getPathWithOrders(levelWithIce)

    expect(path.speedFactors[path.speedFactors.length - 1]).toBe(1)
  })

  test('the orders are not changed by the ice tiles', () => {
    const levelWithoutIce: MapDataType = {
      ...levelWithIce,
      rowsMap: levelWithIce.rowsMap.map((row) => row.replace(/s/g, '1')),
    }

    const withIce = getPathWithOrders(levelWithIce).orders
    const withoutIce = getPathWithOrders(levelWithoutIce).orders

    expect(withIce).toStrictEqual(withoutIce)
  })
})
