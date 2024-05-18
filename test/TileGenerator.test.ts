import { TileGenerator } from '../src/tiles/TileGenerator'
import { ConstTest } from '../src/constants/ConstTest'
import { LevelsData } from '../src/levels/LevelsData'
import { LevelsDataProvider } from '../src/levels/LevelsDataProvider'
import { Player } from '../src/player/Player'
import { getLevelMap } from './helpers/levelMap'

test('Constructor, when passing an invalid map without rows map, throws "No rows map found" exception', () => {
  const player = new Player()
  const mapimages: any[] = [null, null, null]
  const levelsDataProvider = new LevelsDataProvider(LevelsData.data)
  const invalidLevelMap = levelsDataProvider.getLevel(
    ConstTest.ID_LEVEL_INVALID_WITHOUT_ROWSMAP_FOR_UNIT_TESTING,
  )

  expect(() => new TileGenerator(invalidLevelMap, mapimages, player)).toThrow(
    'No rows map found',
  )
})

test('Constructor, when passing a non existing map, throws "Map is undefined" exception', () => {
  const player = new Player()
  const mapimages: any[] = [null, null, null]
  const levelsDataProvider = new LevelsDataProvider(LevelsData.data)
  const idNotExistingMap = 923491234
  const invalidLevelMap = levelsDataProvider.getLevel(idNotExistingMap)

  expect(() => new TileGenerator(invalidLevelMap, mapimages, player)).toThrow(
    'Map is undefined',
  )
})

test('orangeTiles getter, when valid map is passed, return the orange tiles', () => {
  const player = new Player()
  const mapimages: any[] = [null, null, null]
  const levelMap = getLevelMap()
  const tileGenerator = new TileGenerator(levelMap, mapimages, player)

  const result = tileGenerator.orangeTiles

  expect(result).toHaveLength(71)
})

test('pathTiles getter, when valid map is passed, return the path tiles', () => {
  const mapimages: any[] = [null, null, null]
  const player = new Player()
  const levelMap = getLevelMap()
  const tileGenerator = new TileGenerator(levelMap, mapimages, player)

  const result = tileGenerator.pathTiles

  expect(result).toHaveLength(87)
})

test('startTile getter, when valid map is passed, return the start tile', () => {
  const mapimages: any[] = [null, null, null]
  const player = new Player()
  const levelMap = getLevelMap()
  const tileGenerator = new TileGenerator(levelMap, mapimages, player)

  const result = tileGenerator.startTile

  expect(result).toBeInstanceOf(Object)
})

test('endTile getter, when valid map is passed, return the end tile', () => {
  const mapimages: any[] = [null, null, null]
  const player = new Player()
  const levelMap = getLevelMap()
  const tileGenerator = new TileGenerator(levelMap, mapimages, player)

  const result = tileGenerator.endTile

  expect(result).toBeInstanceOf(Object)
})

test('initialMoney getter, when valid map is passed, return the initial money', () => {
  const expected = 150
  const mapimages: any[] = [null, null, null]
  const player = new Player()
  const levelMap = getLevelMap()
  const tileGenerator = new TileGenerator(levelMap, mapimages, player)

  const result = tileGenerator.initialMoney

  expect(result).toBe(expected)
})
