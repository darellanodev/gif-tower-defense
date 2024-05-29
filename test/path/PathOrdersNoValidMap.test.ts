import { Path } from '../../src/path/Path'
import { TileGenerator } from '../../src/tiles/TileGenerator'
import { Player } from '../../src/player/Player'
import { getNoValidLevelMapUnreachableEndTile } from '../helpers/levelMap'
import { images } from '../helpers/imagesResources'

test('length orders of makeOrders, when map is invalid, returns zero', () => {
  const noValidMap = getNoValidLevelMapUnreachableEndTile()
  const player = new Player()
  const tileGenerator = new TileGenerator(noValidMap, images, player)
  const pathTiles = tileGenerator.pathTiles
  const startTile = tileGenerator.startTile
  const endTile = tileGenerator.endTile
  const path = new Path(startTile, endTile, pathTiles)

  const orders = path.makeOrders()

  expect(orders).toHaveLength(0)
})
