import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { TileJumper } from '../../src/levels/tiles/TileJumper'
import { TilesManager } from '../../src/levels/tiles/TilesManager'
import { MapDataType } from '../../src/types/mapDataType'
import { getTileJumperCreator } from '../helpers/levelMap'

const emptyRow = '0000000000000000'

const getLevelMapWithRow = (row: string): MapDataType => ({
  id: 9201,
  title: 'jumper tiles',
  author: 'test',
  comments: '',
  rowsMap: [emptyRow, row, ...Array(8).fill(emptyRow)],
  money: 150,
  startDirection: DIRECTION.LEFT,
  endDirection: DIRECTION.LEFT,
})

const createTiles = (row: string) => {
  const tilesManager = new TilesManager()
  const creator = getTileJumperCreator()
  creator.setLevelMap(getLevelMapWithRow(row))
  creator.create(tilesManager)
  return tilesManager
}

describe('TileJumperCreator', () => {
  test('creates one jumper for every jumper symbol', () => {
    const tilesManager = createTiles('0550600000700000')

    expect(tilesManager.getAllJumperTiles).toHaveLength(4)
  })

  test('the jumpers are instances of TileJumper', () => {
    const tilesManager = createTiles('0550600000700000')

    const result = tilesManager.getAllJumperTiles.every(
      (tile) => tile instanceof TileJumper,
    )

    expect(result).toBeTruthy()
  })

  test('the symbol 5 jumps two tiles, the 6 jumps three tiles and the 7 jumps four tiles', () => {
    const tilesManager = createTiles('0000056700000000')

    const distances = tilesManager.getAllJumperTiles.map(
      (tile) => tile.jumpDistance,
    )

    expect(distances).toStrictEqual([2, 3, 4])
  })

  test('the jumpers are placed in the columns of their symbols', () => {
    const tilesManager = createTiles('0000056700000000')

    const columns = tilesManager.getAllJumperTiles.map(
      (tile) => tile.position.x / 50,
    )

    expect(columns).toStrictEqual([5, 6, 7])
  })

  test('the jumpers are also path tiles, so the enemies can walk over them', () => {
    const tilesManager = createTiles('0000056700000000')

    expect(tilesManager.getAllPathTiles).toHaveLength(3)
  })

  test('when there are no jumper symbols, there are no jumpers', () => {
    const tilesManager = createTiles('0111100000000000')

    expect(tilesManager.getAllJumperTiles).toHaveLength(0)
  })
})
