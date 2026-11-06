import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { TilesManager } from '../../src/levels/tiles/TilesManager'
import { TileIce } from '../../src/levels/tiles/TileIce'
import { MapDataType } from '../../src/types/mapDataType'
import { getTilePathCreator } from '../helpers/levelMap'

const emptyRows = Array(10).fill('0000000000000000')

const getLevelMapWithRow = (row: string): MapDataType => ({
  id: 9002,
  title: 'ice tiles',
  author: 'test',
  comments: '',
  rowsMap: [emptyRows[0], row, ...emptyRows.slice(2)],
  money: 150,
  startDirection: DIRECTION.LEFT,
  endDirection: DIRECTION.LEFT,
})

const createTiles = (row: string) => {
  const tilesManager = new TilesManager()
  const tilePathCreator = getTilePathCreator()
  tilePathCreator.setLevelMap(getLevelMapWithRow(row))
  tilePathCreator.create(tilesManager)
  return tilesManager
}

describe('TilePathCreator with ice symbols', () => {
  test('creates one ice tile for every ice symbol', () => {
    const tilesManager = createTiles('y1ss11s11111111x')

    expect(tilesManager.getAllIceTiles).toHaveLength(3)
  })

  test('the ice tiles are instances of TileIce', () => {
    const tilesManager = createTiles('y1ss11s11111111x')

    const result = tilesManager.getAllIceTiles.every(
      (tile) => tile instanceof TileIce,
    )

    expect(result).toBeTruthy()
  })

  test('the ice tiles are placed in the columns of the ice symbols', () => {
    const tilesManager = createTiles('y1ss11s11111111x')

    const result = tilesManager.getAllIceTiles.map((tile) => tile.position.x)

    expect(result).toStrictEqual([100, 150, 300])
  })

  test('the ice tiles are also path tiles, so the enemies can walk over them', () => {
    const tilesManager = createTiles('y1ss11s11111111x')

    // 11 normal path tiles + 3 ice tiles
    expect(tilesManager.getAllPathTiles).toHaveLength(14)
  })

  test('when there are no ice symbols, there are no ice tiles', () => {
    const tilesManager = createTiles('y111111111111111x')

    expect(tilesManager.getAllIceTiles).toHaveLength(0)
  })
})
