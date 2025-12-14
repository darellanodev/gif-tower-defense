import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/DIRECTION'
import { isIncluded } from '../helpers/arrays'
import { getLevelMap, getPathFromMap } from '../helpers/levelMap'

const levelId = 1
const levelMap = getLevelMap(levelId)
const path = getPathFromMap(levelMap)
path.makeOrders()
const orders = path.orders

describe('makeOrders', () => {
  test('first order', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(DIRECTION.LEFT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('middle orders', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(7).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(13).fill(DIRECTION.RIGHT))
    expectedOrders.push(...Array(3).fill(DIRECTION.UP))
    expectedOrders.push(...Array(6).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(1).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(5).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(3).fill(DIRECTION.UP))
    expectedOrders.push(...Array(13).fill(DIRECTION.RIGHT))
    expectedOrders.push(...Array(7).fill(DIRECTION.DOWN))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('last order', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(7).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(13).fill(DIRECTION.RIGHT))
    expectedOrders.push(...Array(3).fill(DIRECTION.UP))
    expectedOrders.push(...Array(6).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(1).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(5).fill(DIRECTION.LEFT))
    expectedOrders.push(...Array(3).fill(DIRECTION.UP))
    expectedOrders.push(...Array(13).fill(DIRECTION.RIGHT))
    expectedOrders.push(...Array(7).fill(DIRECTION.DOWN))
    expectedOrders.push(...Array(16).fill(DIRECTION.LEFT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('can reach the endTile', () => {
    const result = path.endReached
    expect(result).toBeTruthy()
  })

  test('orders length is 91', () => {
    const result = orders.length
    expect(result).toBe(91)
  })
})
