import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { TILE_SIZE } from '../../src/constants/tile'
import { TileTeleportIn } from '../../src/levels/tiles/TileTeleportIn'
import { TileTeleportOut } from '../../src/levels/tiles/TileTeleportOut'
import { TilesManager } from '../../src/levels/tiles/TilesManager'
import { MapDataType } from '../../src/types/mapDataType'
import { getTileTeleportCreator } from '../helpers/levelMap'

const emptyRow = '0000000000000000'

const getLevelMapWithRow = (row: string): MapDataType => ({
  id: 9401,
  title: 'teleport tiles',
  author: 'test',
  comments: '',
  rowsMap: [emptyRow, row, ...Array(8).fill(emptyRow)],
  money: 150,
  startDirection: DIRECTION.LEFT,
  endDirection: DIRECTION.LEFT,
})

const createTiles = (row: string) => {
  const tilesManager = new TilesManager()
  const creator = getTileTeleportCreator()
  creator.setLevelMap(getLevelMapWithRow(row))
  creator.create(tilesManager)
  return tilesManager
}

describe('TileTeleportCreator', () => {
  test('creates a teleport in tile for the symbol p', () => {
    const tilesManager = createTiles('000p000000000000')

    expect(tilesManager.getAllTeleportInTiles).toHaveLength(1)
    expect(tilesManager.getAllTeleportInTiles[0]).toBeInstanceOf(TileTeleportIn)
  })

  test('creates a teleport out tile for the symbol q', () => {
    const tilesManager = createTiles('00000000q0000000')

    expect(tilesManager.getAllTeleportOutTiles).toHaveLength(1)
    expect(tilesManager.getAllTeleportOutTiles[0]).toBeInstanceOf(
      TileTeleportOut,
    )
  })

  test('the tiles are placed in the columns of their symbols', () => {
    const tilesManager = createTiles('000p0000q0000000')

    expect(tilesManager.getAllTeleportInTiles[0].position.x).toBe(3 * TILE_SIZE)
    expect(tilesManager.getAllTeleportOutTiles[0].position.x).toBe(
      8 * TILE_SIZE,
    )
  })

  test('both tiles are also path tiles, so the enemies can walk over them', () => {
    const tilesManager = createTiles('000p0000q0000000')

    expect(tilesManager.getAllPathTiles).toHaveLength(2)
  })

  test('when there are no teleport symbols, there are no teleport tiles', () => {
    const tilesManager = createTiles('0111100000000000')

    expect(tilesManager.getAllTeleportInTiles).toHaveLength(0)
    expect(tilesManager.getAllTeleportOutTiles).toHaveLength(0)
  })
})
