import { ConstDirection } from '../../src/constants/ConstDirection'
import { isIncluded } from '../helpers/arrays'
import { getLevelMap, getPathFromMap } from '../helpers/levelMap'

const levelId = 1
const levelMap = getLevelMap(levelId)
const path = getPathFromMap(levelMap)
const orders = path.makeOrders()

describe('makeOrders', () => {
  test('first order', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('middle orders', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(5).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('last order', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(5).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('can reach the endTile', () => {
    const result = path.endReached
    expect(result).toBeTruthy()
  })

  test('orders lenght is 91', () => {
    const result = orders.length
    expect(result).toBe(91)
  })
})
