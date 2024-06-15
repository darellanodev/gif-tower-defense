import { Path } from '../../src/path/Path'
import { TileGenerator } from '../../src/tiles/TileGenerator'
import { Player } from '../../src/player/Player'
import { getNoValidLevelMapUnreachableEndTile } from '../helpers/levelMap'
import { images } from '../helpers/imagesResources'
import { TowerGreenCreator } from '../../src/towers/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/TowerYellowCreator'

test('length orders of makeOrders, when map is invalid, returns zero', () => {
  const noValidMap = getNoValidLevelMapUnreachableEndTile()
  const player = new Player()
  const towerGreenCreator = new TowerGreenCreator(images)
  const towerRedCreator = new TowerRedCreator(images)
  const towerYellowCreator = new TowerYellowCreator(images, player)
  const tileGenerator = new TileGenerator(
    noValidMap,
    images,
    player,
    towerGreenCreator,
    towerRedCreator,
    towerYellowCreator,
  )
  const pathTiles = tileGenerator.pathTiles
  const startTile = tileGenerator.startTile
  const endTile = tileGenerator.endTile
  const path = new Path(startTile, endTile, pathTiles)

  const orders = path.makeOrders()

  expect(orders).toHaveLength(0)
})
