import { beforeEach, describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { ENEMY_JUMP_SPEED, ENEMY_VELOCITY } from '../../src/constants/enemy'
import { TILE_SIZE } from '../../src/constants/tile'
import { Path } from '../../src/levels/path/Path'
import { PathMovement } from '../../src/levels/path/PathMovement'
import { MapDataType } from '../../src/types/mapDataType'
import { getPathFromMap } from '../helpers/levelMap'

const emptyRow = '0000000000000000'

// the enemies enter by the tile x (column 15) and go left to the tile y (column 0).
// Columns of row 1: a jumper in column 10 and an ice tile in column 13
const rowsMap = [emptyRow, 'y11111111051s11x', ...Array(8).fill(emptyRow)]

const map: MapDataType = {
  id: 9300,
  title: 'movement',
  author: 'test',
  comments: '',
  rowsMap,
  money: 150,
  startDirection: DIRECTION.LEFT,
  endDirection: DIRECTION.LEFT,
}

const startPosition = { x: 900, y: 100 }

const updateTimes = (pathMovement: PathMovement, times: number) => {
  for (let i = 0; i < times; i++) {
    pathMovement.update()
  }
}

// the game saves the orders of the level in the static properties of Path
beforeEach(() => {
  const path = getPathFromMap(map)
  path.makeOrders()
  Path.orders = path.orders
  Path.speedFactors = path.speedFactors
  Path.jumps = path.jumps
})

// Orders of the level, from the tile x (column 15) to the end tile y (column 0):
//  0: enters the tile x
//  1, 2: arrive to the columns 14 and 13
//  3: arrives to the ice tile (column 12)
//  4: leaves the ice tile to the column 11 (double speed)
//  5: arrives to the jumper (column 10)
//  6, 7: jump over the hole of the column 9 and land in the column 8
describe('createMovement', () => {
  const walkingOrdersBeforeIce = 4

  test('the movement follows the orders of the level', () => {
    const pathMovement = Path.createMovement(startPosition, 1)

    expect(pathMovement.currentDirection).toBe(DIRECTION.LEFT)
  })

  test('the movement uses the speed factors of the level: the order that leaves the ice tile is faster', () => {
    const pathMovement = Path.createMovement(startPosition, 1)

    updateTimes(pathMovement, walkingOrdersBeforeIce * TILE_SIZE)

    expect(pathMovement.currentSpeed).toBe(2)
  })

  test('the movement uses the jumps of the level: the enemy jumps after the jumper tile', () => {
    const pathMovement = Path.createMovement(startPosition, 1)

    // 4 orders at speed 1, the order on the ice at speed 2 and the order that arrives to the jumper at speed 1
    updateTimes(
      pathMovement,
      walkingOrdersBeforeIce * TILE_SIZE + TILE_SIZE / 2 + TILE_SIZE,
    )

    expect(pathMovement.isJumping).toBeTruthy()
  })

  test('while a boss jumps, the speed is the jump speed', () => {
    const boss = ENEMY_VELOCITY.BOSS
    const pathMovement = Path.createMovement(startPosition, boss)

    updateTimes(
      pathMovement,
      walkingOrdersBeforeIce * (TILE_SIZE / boss) +
        TILE_SIZE / (boss * 2) +
        TILE_SIZE / boss,
    )

    expect(pathMovement.currentSpeed).toBe(ENEMY_JUMP_SPEED)
  })
})
