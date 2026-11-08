import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { TILE_CREATION_MARGIN_TOP, TILE_SIZE } from '../../src/constants/tile'
import { TileCrystal } from '../../src/levels/tiles/TileCrystal'
import { TileCrystalCreator } from '../../src/levels/tiles/creators/TileCrystalCreator'
import { TilesManager } from '../../src/levels/tiles/TilesManager'
import { MapDataType } from '../../src/types/mapDataType'
import { images } from '../helpers/imagesResources'
import { getPathFromMap } from '../helpers/levelMap'

const emptyRow = '0000000000000000'

const getLevelMapWithRow = (row: string): MapDataType => ({
  id: 9003,
  title: 'crystals',
  author: 'test',
  comments: '',
  rowsMap: [emptyRow, row, ...Array(8).fill(emptyRow)],
  money: 150,
  startDirection: DIRECTION.RIGHT,
  endDirection: DIRECTION.RIGHT,
})

const createTiles = (row: string) => {
  const tilesManager = new TilesManager()
  TileCrystalCreator.clearInstance()
  const creator = TileCrystalCreator.getInstance(images)
  creator.setLevelMap(getLevelMapWithRow(row))
  creator.create(tilesManager)
  return tilesManager
}

describe('TileCrystalCreator', () => {
  test('creates one crystal for every crystal symbol', () => {
    const tilesManager = createTiles('0c00c0000000000c')

    expect(tilesManager.getAllCrystals).toHaveLength(3)
  })

  test('the crystals are instances of TileCrystal', () => {
    const tilesManager = createTiles('0c00c0000000000c')

    const result = tilesManager.getAllCrystals.every(
      (crystal) => crystal instanceof TileCrystal,
    )

    expect(result).toBeTruthy()
  })

  test('the crystals are placed in the columns of the crystal symbols', () => {
    const tilesManager = createTiles('0c00c0000000000c')

    const result = tilesManager.getAllCrystals.map(
      (crystal) => crystal.position.x,
    )

    expect(result).toStrictEqual([TILE_SIZE, 4 * TILE_SIZE, 15 * TILE_SIZE])
  })

  test('the crystals are placed in the row of the crystal symbols', () => {
    const tilesManager = createTiles('0c00c0000000000c')

    // the second row of the map is the row number 2 for the creators
    const expectedY = TILE_SIZE * 2 + TILE_CREATION_MARGIN_TOP
    expect(tilesManager.getAllCrystals[0].position.y).toBe(expectedY)
  })

  test('when there are no crystal symbols, there are no crystals', () => {
    const tilesManager = createTiles('0000000000000000')

    expect(tilesManager.getAllCrystals).toHaveLength(0)
  })
})

describe('TilesManager crystals', () => {
  test('removeCrystal removes only the given crystal', () => {
    const tilesManager = createTiles('0c00c0000000000c')
    const [first, second, third] = tilesManager.getAllCrystals

    tilesManager.removeCrystal(second)

    expect(tilesManager.getAllCrystals).toStrictEqual([first, third])
  })
})

describe('crystals and the path', () => {
  const rowsWith = (symbol: string) => [
    '0000000000000000',
    `x1111${symbol}111111111y`,
    ...Array(8).fill('0000000000000000'),
  ]
  const getMap = (symbol: string): MapDataType => ({
    ...getLevelMapWithRow(emptyRow),
    rowsMap: rowsWith(symbol).map((row) => row.slice(0, 16)),
  })

  test('a crystal in the way blocks the enemies', () => {
    const path = getPathFromMap(getMap('c'))

    path.makeOrders()

    expect(path.endReached).toBeFalsy()
  })

  test('when the crystal is replaced by a path tile, the enemies can reach the end', () => {
    const path = getPathFromMap(getMap('1'))

    path.makeOrders()

    expect(path.endReached).toBeTruthy()
  })
})
