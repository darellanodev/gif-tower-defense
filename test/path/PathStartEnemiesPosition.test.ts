import { PathStartEnemiesPosition } from '../../src/path/PathStartEnemiesPosition'
import { TilesManager } from '../../src/tiles/TilesManager'
import { TileStartCreator } from '../../src/tiles/TileStartCreator'
import {
  getLevelMap,
  getTileStartCreator,
  getValidLevelMap,
} from '../helpers/levelMap'

test('getEnemiesInitialPosition, levelMap 1 (serpent) when start direction is LEFT and start tile is at {x:750, y:80}, return x+=50 ({x:800, y:80})', () => {
  const tileStartPosition = { x: 750, y: 80 }
  const levelMap = getValidLevelMap()

  const tilesManager = new TilesManager()
  TileStartCreator.clearInstance()
  const tileStartCreator = getTileStartCreator()
  tileStartCreator.create(levelMap, tilesManager)
  const tileStart = tilesManager.tileStart

  if (tileStart === null) {
    throw new Error('Error tileStart is null')
  }
  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  const expected = { x: tileStartPosition.x + 50, y: tileStartPosition.y }
  expect(result).toMatchObject(expected)
})

test('getEnemiesInitialPosition, levelMap 14 (one loop) when start direction is LEFT and start tile is at {x:750, y:80}, return x+=50 ({x:800, y:80})', () => {
  const topRightTileY = 80

  const tileStartPosition = { x: 750, y: topRightTileY + 50 }
  const levelId = 14
  const levelMap = getLevelMap(levelId)

  const tilesManager = new TilesManager()
  TileStartCreator.clearInstance()
  const tileStartCreator = getTileStartCreator()

  tileStartCreator.create(levelMap, tilesManager)
  const tileStart = tilesManager.tileStart

  if (tileStart === null) {
    throw new Error('Error tileStart is null')
  }

  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance()
  pathStartEnemyPosition.tileStart = tileStart

  const result = pathStartEnemyPosition.get()

  const expected = { x: tileStartPosition.x + 50, y: tileStartPosition.y }
  expect(result).toMatchObject(expected)
})
