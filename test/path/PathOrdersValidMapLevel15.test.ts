import { ConstDirection } from '../../src/constants/ConstDirection'
import { isIncluded } from '../helpers/arrays'
import { getLevelMap, getPathFromMap } from '../helpers/levelMap'
import { getOrdersFromLevelMapId } from '../helpers/orders'

describe('makeOrders', () => {
  test('first orders', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    const levelId = 15
    const orders = getOrdersFromLevelMapId(levelId)
    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })
  test('middle orders', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(7).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(2).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(4).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(4).fill(ConstDirection.UP))
    expectedOrders.push(...Array(2).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    expectedOrders.push(...Array(2).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(3).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(2).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(2).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(4).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    const levelId = 15
    const orders = getOrdersFromLevelMapId(levelId)
    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })
  test('last order', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(7).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(2).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(4).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(4).fill(ConstDirection.UP))
    expectedOrders.push(...Array(2).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    expectedOrders.push(...Array(2).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(3).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(2).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(2).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(2).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(4).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    expectedOrders.push(...Array(1).fill(ConstDirection.UP))
    const levelId = 15
    const orders = getOrdersFromLevelMapId(levelId)
    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('can reach the endTile', () => {
    const levelId = 15
    const levelMap = getLevelMap(levelId)
    const path = getPathFromMap(levelMap)
    const orders = path.makeOrders()
    const result = path.endReached
    expect(result).toBeTruthy()
  })

  test('orders lenght is 59', () => {
    const levelId = 15
    const levelMap = getLevelMap(levelId)
    const path = getPathFromMap(levelMap)
    const orders = path.makeOrders()
    const result = orders.length
    expect(result).toBe(59)
  })
})
