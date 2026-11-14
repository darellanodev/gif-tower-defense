import { beforeEach, describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { ENEMY_TELEPORT } from '../../src/constants/enemy'
import { TILE_CREATION_MARGIN_TOP, TILE_SIZE } from '../../src/constants/tile'
import { Path } from '../../src/levels/path/Path'
import { MapDataType } from '../../src/types/mapDataType'
import { getPathFromMap } from '../helpers/levelMap'

const { LEFT, DOWN } = DIRECTION

const emptyRow = '0000000000000000'

const getMap = (
  rows: string[],
  startDirection: number = LEFT,
  endDirection: number = LEFT,
): MapDataType => ({
  id: 9400,
  title: 'teleports',
  author: 'test',
  comments: '',
  rowsMap: rows,
  money: 150,
  startDirection,
  endDirection,
})

// the row 1 of the map is the corridor: the enemies enter by the tile x (column 15) and go left
const getCorridorMap = (corridor: string) =>
  getMap([emptyRow, corridor, ...Array(8).fill(emptyRow)])

const makeOrders = (map: MapDataType) => {
  const path = getPathFromMap(map)
  path.makeOrders()
  return path
}

const teleportSteps = (path: ReturnType<typeof makeOrders>) =>
  path.teleports.filter((teleport) => teleport !== null)

// Columns:                       0123456789012345
const withTeleport = getCorridorMap('y111q00000p1111x') // teleport in in column 10, teleport out in column 4
const corridorY = TILE_SIZE * 2 + TILE_CREATION_MARGIN_TOP

describe('a teleport in the corridor', () => {
  test('the enemies are teleported over the blocked tiles and reach the end', () => {
    expect(makeOrders(withTeleport).endReached).toBeTruthy()
  })

  test('without the teleport tiles the blocked tiles stop the enemies', () => {
    const withoutTeleport = getCorridorMap('y111100000p1111x')

    expect(makeOrders(withoutTeleport).endReached).toBeFalsy()
  })

  test('there is only one teleport', () => {
    expect(teleportSteps(makeOrders(withTeleport))).toHaveLength(1)
  })

  test('the teleport goes to the position of the teleport out tile', () => {
    const path = makeOrders(withTeleport)

    expect(teleportSteps(path)[0]).toStrictEqual({
      to: { x: 4 * TILE_SIZE, y: corridorY },
    })
  })

  test('the teleport is made before the order that leaves the teleport out tile', () => {
    const path = makeOrders(withTeleport)

    // order 0 enters the tile x, the orders 1 to 5 arrive to the columns 14 to 10 (teleport in tile)
    expect(path.teleports[6]).not.toBeNull()
  })

  test('the orders before and after the teleport are not teleports', () => {
    const path = makeOrders(withTeleport)

    expect(path.teleports[5]).toBeNull()
    expect(path.teleports[7]).toBeNull()
  })

  test('the orders continue from the teleport out tile: 1 to enter, 5 to the teleport in tile, 4 to the end tile and 2 more to leave', () => {
    const path = makeOrders(withTeleport)

    expect(path.orders).toStrictEqual(Array(1 + 5 + 4 + 2).fill(LEFT))
  })

  test('there is one teleport entry per order', () => {
    const path = makeOrders(withTeleport)

    expect(path.teleports).toHaveLength(path.orders.length)
  })

  test('the speed factors and the jumps keep the same length', () => {
    const path = makeOrders(withTeleport)

    expect(path.speedFactors).toHaveLength(path.orders.length)
    expect(path.jumps).toHaveLength(path.orders.length)
  })
})

describe('the direction after the teleport', () => {
  // the enemies arrive at the teleport in tile going left and they are teleported to a corner:
  // the turning rule is applied again from the teleport out tile, and they go down to the end tile
  const rows = [
    emptyRow,
    '0000q00000p1111x',
    ...Array(7).fill('0000100000000000'),
    '0000y00000000000',
  ]
  const map = getMap(rows, LEFT, DOWN)

  test('the enemies reach the end tile', () => {
    expect(makeOrders(map).endReached).toBeTruthy()
  })

  test('they turn after the teleport: 6 orders to the teleport in tile, 8 down tiles and 2 more orders', () => {
    const path = makeOrders(map)

    expect(path.orders).toStrictEqual([
      ...Array(6).fill(LEFT),
      ...Array(10).fill(DOWN),
    ])
  })
})

describe('the teleport tiles without their pair', () => {
  test('a teleport in tile without teleport out tile is a normal path tile', () => {
    const path = makeOrders(getCorridorMap('y11111111p11111x'))

    expect(path.endReached).toBeTruthy()
    expect(teleportSteps(path)).toHaveLength(0)
  })

  test('a teleport out tile without teleport in tile is a normal path tile', () => {
    const path = makeOrders(getCorridorMap('y11111q11111111x'))

    expect(path.endReached).toBeTruthy()
    expect(teleportSteps(path)).toHaveLength(0)
  })
})

describe('the movement of the magics and of the enemies', () => {
  beforeEach(() => {
    const path = makeOrders(withTeleport)
    Path.orders = path.orders
    Path.speedFactors = path.speedFactors
    Path.jumps = path.jumps
    Path.teleports = path.teleports
  })

  const startPosition = { x: 900, y: corridorY }

  const updateTimes = (
    movement: ReturnType<typeof Path.createMovement>,
    times: number,
  ) => {
    for (let i = 0; i < times; i++) {
      movement.update()
    }
  }

  test('an enemy waits in the teleport in tile', () => {
    const movement = Path.createMovement(startPosition, 1)

    // 6 orders of one tile at speed 1
    updateTimes(movement, 6 * TILE_SIZE)

    expect(movement.isTeleporting).toBeTruthy()
  })

  test('a magic is moved to the teleport out tile at once and it does not wait', () => {
    const movement = Path.createMagicMovement(startPosition, Path.orders, 1)

    updateTimes(movement, 6 * TILE_SIZE)

    expect(movement.isTeleporting).toBeFalsy()
    expect(movement.position).toStrictEqual({
      x: 4 * TILE_SIZE,
      y: corridorY,
    })
  })
})
