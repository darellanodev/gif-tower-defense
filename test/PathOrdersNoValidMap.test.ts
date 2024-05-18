import { Path } from '../src/enemies/Path'
import { TileGenerator } from '../src/tiles/TileGenerator'
import { Player } from '../src/player/Player'
import { getNoValidLevelMapUnreachableEndTile } from './helpers/levelMap'

test('length orders of makeOrders, when map is invalid, returns zero', () => {
  const noValidMap = getNoValidLevelMapUnreachableEndTile()
  const player = new Player()
  const mapimages: any[] = [null, null, null]
  const tileGenerator = new TileGenerator(noValidMap, mapimages, player)
  const pathTiles = tileGenerator.pathTiles
  const startTile = tileGenerator.startTile
  const endTile = tileGenerator.endTile
  const path = new Path(startTile, endTile, pathTiles)

  const orders = path.makeOrders()

  expect(orders).toHaveLength(0)
})
