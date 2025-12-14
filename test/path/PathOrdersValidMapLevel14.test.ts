import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { isIncluded } from '../helpers/arrays'
import { getLevelMap, getPathFromMap } from '../helpers/levelMap'

const levelId = 14
const levelMap = getLevelMap(levelId)
const path = getPathFromMap(levelMap)
path.makeOrders()
const orders = path.orders

describe('makeOrders', () => {
  test('first order', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(3).fill(DIRECTION.LEFT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('middle orders', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(3).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(1).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(7).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(1).fill(DIRECTION.UP))
    expectedOrders.push(...Array(4).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(5).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(11).fill(DIRECTION.RIGHT))
    expectedOrders.push(...Array(2).fill(DIRECTION.UP))
    expectedOrders.push(...Array(7).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(4).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(9).fill(DIRECTION.RIGHT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('last order', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(3).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(1).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(7).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(1).fill(DIRECTION.UP))
    expectedOrders.push(...Array(4).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(5).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(11).fill(DIRECTION.RIGHT))
    expectedOrders.push(...Array(2).fill(DIRECTION.UP))
    expectedOrders.push(...Array(7).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(4).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(9).fill(DIRECTION.RIGHT))
    expectedOrders.push(...Array(1).fill(DIRECTION.RIGHT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('can reach the endTile', () => {
    const result = path.endReached
    expect(result).toBeTruthy()
  })

  test('orders length is 56', () => {
    const result = orders.length
    expect(result).toBe(56)
  })
})
