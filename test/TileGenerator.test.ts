import { TileGenerator } from '../src/TileGenerator'
import { ConstTest } from '../src/ConstTest'
import { TowerGenerator } from '../src/TowerGenerator'
import { LevelsData } from '../src/LevelsData'
import { LevelsDataProvider } from '../src/LevelsDataProvider'

const levelsDataProvider = new LevelsDataProvider(LevelsData.data)

const levelMap = levelsDataProvider.getLevel(
  ConstTest.ID_LEVEL_VALID_FOR_UNIT_TESTING,
)

const mapimages: any[] = [null, null, null]
const greenTowerImages: any[] = [null, null, null]
const redTowerImages: any[] = [null, null, null]
const yellowTowerImages: any[] = [null, null, null]

const towerGenerator = new TowerGenerator(
  greenTowerImages,
  redTowerImages,
  yellowTowerImages,
)

test('TileGenerator throws an exception when an empty string is passed to it', () => {
  const invalidLevelMap = levelsDataProvider.getLevel(
    ConstTest.ID_LEVEL_INVALID_WITHOUT_ROWSMAP_FOR_UNIT_TESTING,
  )

  expect(
    () => new TileGenerator(invalidLevelMap, mapimages, towerGenerator),
  ).toThrowError('No rows map found')
})

test('TileGenerator generate orange tiles', () => {
  const tileGenerator = new TileGenerator(levelMap, mapimages, towerGenerator)

  const result = tileGenerator.orangeTiles

  expect(result).toHaveLength(71)
})

test('TileGenerator generate path tiles', () => {
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(levelMap, mapimages, towerGenerator)

  const result = tileGenerator.pathTiles

  expect(result).toHaveLength(87)
})

test('TileGenerator generate start tile', () => {
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(levelMap, mapimages, towerGenerator)

  const result = tileGenerator.startTile

  expect(result).toBeInstanceOf(Object)
})

test('TileGenerator generate end tile', () => {
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(levelMap, mapimages, towerGenerator)

  const result = tileGenerator.endTile

  expect(result).toBeInstanceOf(Object)
})

test('TileGenerator generate the initial money', () => {
  const expected = 150

  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(levelMap, mapimages, towerGenerator)

  const result = tileGenerator.initialMoney

  expect(result).toBe(expected)
})
