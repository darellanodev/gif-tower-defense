import { expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { Path } from '../../src/levels/path/Path'
import { TilePath } from '../../src/levels/tiles/TilePath'
import { TileStart } from '../../src/levels/tiles/TileStart'
import { TileEnd } from '../../src/levels/tiles/TileEnd'
import { img } from '../helpers/imagesResources'

test('getTileInPosition, when passing an existing pathtile coordinates, return the pathtile', () => {
  const positionTileStart = { x: 300, y: 300 }
  const positionTileEnd = { x: 0, y: 300 }
  const startTile = new TileStart(img, positionTileStart, DIRECTION.LEFT)
  const endTile = new TileEnd(img, positionTileEnd)
  const searchTile = new TilePath({ x: 150, y: 300 })
  const pathTiles = [
    new TilePath({ x: 100, y: 300 }),
    new TilePath({ x: 150, y: 300 }),
    new TilePath({ x: 200, y: 300 }),
  ]
  const path = new Path(startTile, endTile, pathTiles)

  const result = path.getTilePath(150, 300)

  expect(result).toMatchObject(searchTile)
})
