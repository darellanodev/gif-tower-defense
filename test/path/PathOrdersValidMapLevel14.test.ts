import { ConstDirection } from '../../src/constants/ConstDirection'
import { isIncluded } from '../helpers/arrays'
import { getOrdersFromLevelMapId } from '../helpers/orders'

describe('makeOrders', () => {
  test('if there are 3 tiles consecutively to the left, the enemy moves first 3 times to left (2 tiles to the left + 1 tile to left when the enemy starts before the startTile', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(3).fill(ConstDirection.LEFT))

    const levelId = 14
    const orders = getOrdersFromLevelMapId(levelId)

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 3 first left path tiles, make 1 down, 7 left, 1 up, 4 left, 5 down, 11 right, 2 up, 7 left, 4 down, 9 right', () => {
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

    const levelId = 14
    const orders = getOrdersFromLevelMapId(levelId)

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after all the orders, the last one is 1 right to exit', () => {
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

    const levelId = 14
    const orders = getOrdersFromLevelMapId(levelId)

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })
})
