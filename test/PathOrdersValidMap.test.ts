import { ConstDirection } from '../src/constants/ConstDirection'
import { isIncluded } from './helpers/arrays'
import { getPathFromMap, getValidLevelMap } from './helpers/levelMap'

const levelMap = getValidLevelMap()
const path = getPathFromMap(levelMap)

describe('makeOrders', () => {
  test('if there are 15 tiles consecutively to the left, the enemy moves first 16 times to left (15 tiles to the left + 1 tile to left when the enemy starts before the startTile', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, if there is no other left path tile then the direction is down 7 times', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and 7 down path tiles, if there is no other down path tile, then the direction is right 13 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, go up 3 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, go left 6 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, 6 left, go down 1 path tile', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, 6 left, 1 down, go 5 left path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(5).fill(ConstDirection.LEFT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, go up 3 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(5).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, go right 13 path tiles', () => {
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

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, 13 right, go down 7 path tiles', () => {
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

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, 13 right, 7 down, go left 16 path tiles (15 path tiles + 1 path tile from endTile to outside)', () => {
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

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })
})
