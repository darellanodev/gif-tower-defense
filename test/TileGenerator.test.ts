import { TileGenerator } from '../src/tiles/TileGenerator'
import { ConstTest } from '../src/constants/ConstTest'
import { LevelsData } from '../src/levels/LevelsData'
import { LevelsDataProvider } from '../src/levels/LevelsDataProvider'

const levelsDataProvider = new LevelsDataProvider(LevelsData.data)

const levelMap = levelsDataProvider.getLevel(
  ConstTest.ID_LEVEL_VALID_FOR_UNIT_TESTING,
)

if (levelMap === undefined) {
  throw new Error('Map not valid')
}

const mapimages: any[] = [null, null, null]

test('Constructor, when passing an invalid map without rows map, throws "No rows map found" exception', () => {
  const invalidLevelMap = levelsDataProvider.getLevel(
    ConstTest.ID_LEVEL_INVALID_WITHOUT_ROWSMAP_FOR_UNIT_TESTING,
  )

  if (invalidLevelMap === undefined) {
    throw new Error('Map not valid')
  }

  expect(() => new TileGenerator(invalidLevelMap, mapimages)).toThrow(
    'No rows map found',
  )
})

test('orangeTiles getter, when valid map is passed, return the orange tiles', () => {
  const tileGenerator = new TileGenerator(levelMap, mapimages)

  const result = tileGenerator.orangeTiles

  expect(result).toHaveLength(71)
})

test('pathTiles getter, when valid map is passed, return the path tiles', () => {
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(levelMap, mapimages)

  const result = tileGenerator.pathTiles

  expect(result).toHaveLength(87)
})

test('startTile getter, when valid map is passed, return the start tile', () => {
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(levelMap, mapimages)

  const result = tileGenerator.startTile

  expect(result).toBeInstanceOf(Object)
})

test('endTile getter, when valid map is passed, return the end tile', () => {
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(levelMap, mapimages)

  const result = tileGenerator.endTile

  expect(result).toBeInstanceOf(Object)
})

test('initialMoney getter, when valid map is passed, return the initial money', () => {
  const expected = 150
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(levelMap, mapimages)

  const result = tileGenerator.initialMoney

  expect(result).toBe(expected)
})
