import { ConstDirection } from '../src/constants/ConstDirection'
import { Path } from '../src/enemies/Path'
import { TilePath } from '../src/tiles/TilePath'
import { TileStart } from '../src/tiles/TileStart'
import { TileEnd } from '../src/tiles/TileEnd'
import { Position } from '../src/utils/types'
import { getTileGeneratorFromMap, getValidLevelMap } from './helpers/levelMap'

const levelMap = getValidLevelMap()
const tileGenerator = getTileGeneratorFromMap(levelMap)
const pathTiles = tileGenerator.pathTiles
const startTile = tileGenerator.startTile
const endTile = tileGenerator.endTile

describe('getEnemiesInitialPosition', () => {
  test('when start direction is LEFT and start tile is at {x:750, y:80}, return x+=50 ({x:800, y:80})', () => {
    const startTilePosition = startTile.position
    const expected = { x: startTilePosition.x + 50, y: startTilePosition.y }
    const path = new Path(startTile, endTile, pathTiles)

    const result = path.getEnemiesInitialPosition()

    expect(result).toMatchObject(expected)
  })
})

describe('getTileInPosition', () => {
  test('when passing an existing pathtile coordinates, return the pathtile', () => {
    const img: any = null
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
})
