import { TileGenerator } from '../src/TileGenerator'
import { Const } from '../src/Const'
import { ConstTest } from '../src/ConstTest'
import { PathTile } from '../src/PathTile'
import { StartTile } from '../src/StartTile'
import { EndTile } from '../src/EndTile'
import { OrangeTile } from '../src/OrangeTile'
import { TowerGreen } from '../src/TowerGreen'
import { TowerRed } from '../src/TowerRed'
import { TowerYellow } from '../src/TowerYellow'
import { MathUtils } from '../src/MathUtils'
import { TowerGenerator } from '../src/TowerGenerator'
import { ProgressBar } from '../src/ProgressBar'
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
  TowerGreen,
  TowerRed,
  TowerYellow,
  MathUtils,
  ProgressBar,
)

test('TileGenerator throws an exception when an empty string is passed to it', () => {
  const invalidLevelMap = levelsDataProvider.getLevel(
    ConstTest.ID_LEVEL_INVALID_WITHOUT_ROWSMAP_FOR_UNIT_TESTING,
  )

  expect(
    () =>
      new TileGenerator(
        invalidLevelMap,
        mapimages,
        OrangeTile,
        PathTile,
        StartTile,
        EndTile,
        towerGenerator,
      ),
  ).toThrowError('No rows map found')
})

test('TileGenerator generate orange tiles', () => {
  const tileGenerator = new TileGenerator(
    levelMap,
    mapimages,
    OrangeTile,
    PathTile,
    StartTile,
    EndTile,
    towerGenerator,
  )

  const result = tileGenerator.orangeTiles

  expect(result).toHaveLength(71)
})

test('TileGenerator generate path tiles', () => {
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(
    levelMap,
    mapimages,
    OrangeTile,
    PathTile,
    StartTile,
    EndTile,
    towerGenerator,
  )

  const result = tileGenerator.pathTiles

  expect(result).toHaveLength(87)
})

test('TileGenerator generate start tile', () => {
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(
    levelMap,
    mapimages,
    OrangeTile,
    PathTile,
    StartTile,
    EndTile,
    towerGenerator,
  )

  const result = tileGenerator.startTile

  expect(result).toBeInstanceOf(Object)
})

test('TileGenerator generate end tile', () => {
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(
    levelMap,
    mapimages,
    OrangeTile,
    PathTile,
    StartTile,
    EndTile,
    towerGenerator,
  )

  const result = tileGenerator.endTile

  expect(result).toBeInstanceOf(Object)
})

test('TileGenerator generate the initial money', () => {
  const expected = 150

  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(
    levelMap,
    mapimages,
    OrangeTile,
    PathTile,
    StartTile,
    EndTile,
    towerGenerator,
  )

  const result = tileGenerator.initialMoney

  expect(result).toBe(expected)
})
