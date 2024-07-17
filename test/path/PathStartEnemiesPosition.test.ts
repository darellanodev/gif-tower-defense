import { PathStartEnemiesPosition } from '../../src/path/PathStartEnemiesPosition'
import { TilesManager } from '../../src/tiles/TilesManager'
import { TileStartCreator } from '../../src/tiles/TileStartCreator'
import { getTileStartCreator, getValidLevelMap } from '../helpers/levelMap'

test('getEnemiesInitialPosition, when start direction is LEFT and start tile is at {x:750, y:80}, return x+=50 ({x:800, y:80})', () => {
  const startTilePosition = { x: 750, y: 80 }
  const levelMap = getValidLevelMap()

  const tilesManager = new TilesManager()
  TileStartCreator.clearInstance()
  const tileStartCreator = getTileStartCreator(levelMap, tilesManager)
  tileStartCreator.create()
  const startTile = tilesManager.tileStart

  if (startTile === null) {
    throw new Error('Error startTile is null')
  }

  const pathStartEnemyPosition = PathStartEnemiesPosition.getInstance(startTile)

  const result = pathStartEnemyPosition.get()

  const expected = { x: startTilePosition.x + 50, y: startTilePosition.y }
  expect(result).toMatchObject(expected)
})
