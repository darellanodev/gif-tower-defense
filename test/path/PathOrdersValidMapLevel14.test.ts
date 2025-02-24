import { describe, expect } from 'vitest'
import { ConstDirection } from '../../src/constants/ConstDirection'
import { isIncluded } from '../helpers/arrays'
import { getLevelMap, getPathFromMap } from '../helpers/levelMap'

const levelId = 14
const levelMap = getLevelMap(levelId)
const path = getPathFromMap(levelMap)
const orders = path.makeOrders()

describe('makeOrders', () => {
  test('first order', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(3).fill(ConstDirection.LEFT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('middle orders', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(3).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(7).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    expectedOrders.push(...Array(4).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(5).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(11).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(7).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(4).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(9).fill(ConstDirection.RIGHT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('last order', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(3).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(7).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    expectedOrders.push(...Array(4).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(5).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(11).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(7).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(4).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(9).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(1).fill(ConstDirection.RIGHT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('can reach the endTile', () => {
    const result = path.endReached
    expect(result).toBeTruthy()
  })

  test('orders lenght is 56', () => {
    const result = orders.length
    expect(result).toBe(56)
  })
})
