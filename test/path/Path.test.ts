import { ConstDirection } from '../../src/constants/ConstDirection'
import { Path } from '../../src/path/Path'
import { TilePath } from '../../src/tiles/TilePath'
import { TileStart } from '../../src/tiles/TileStart'
import { TileEnd } from '../../src/tiles/TileEnd'
import { Position } from '../../src/types/position'
import { getTileCreatorFromMap, getValidLevelMap } from '../helpers/levelMap'
import { img } from '../helpers/imagesResources'

test('getEnemiesInitialPosition, when start direction is LEFT and start tile is at {x:750, y:80}, return x+=50 ({x:800, y:80})', () => {
  const levelMap = getValidLevelMap()
  const TileCreator = getTileCreatorFromMap(levelMap)
  const pathTiles = TileCreator.pathTiles
  const startTile = TileCreator.startTile
  const endTile = TileCreator.endTile
  const startTilePosition = startTile.position
  const path = new Path(startTile, endTile, pathTiles)

  const result = path.getEnemiesInitialPosition()

  const expected = { x: startTilePosition.x + 50, y: startTilePosition.y }
  expect(result).toMatchObject(expected)
})

test('getTileInPosition, when passing an existing pathtile coordinates, return the pathtile', () => {
  const positionTileStart: Position = { x: 300, y: 300 }
  const positionTileEnd: Position = { x: 0, y: 300 }
  const startTile = new TileStart(img, positionTileStart, ConstDirection.LEFT)
  const endTile = new TileEnd(img, positionTileEnd)
  const searchTile = new TilePath({ x: 150, y: 300 })
  const pathTiles = [
    new TilePath({ x: 100, y: 300 }),
    new TilePath({ x: 150, y: 300 }),
    new TilePath({ x: 200, y: 300 }),
  ]
  const path = new Path(startTile, endTile, pathTiles)

  const result = path.getTileInPosition(150, 300)

  expect(result).toMatchObject(searchTile)
})
