import { Path } from '../../src/path/Path'
import { Player } from '../../src/player/Player'
import { getNoValidLevelMapUnreachableEndTile } from '../helpers/levelMap'
import { images } from '../helpers/imagesResources'
import { TowerGreenCreator } from '../../src/towers/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/TowerYellowCreator'
import { TileCreator } from '../../src/tiles/TileCreator'

test('length orders of makeOrders, when map is invalid, returns zero', () => {
  const noValidMap = getNoValidLevelMapUnreachableEndTile()
  const player = Player.getInstance()
  const towerGreenCreator = new TowerGreenCreator(images)
  const towerRedCreator = new TowerRedCreator(images)
  const towerYellowCreator = new TowerYellowCreator(images, player)
  const tileCreator = new TileCreator(
    noValidMap,
    images,
    player,
    towerGreenCreator,
    towerRedCreator,
    towerYellowCreator,
  )
  const pathTiles = tileCreator.pathTiles
  const startTile = tileCreator.startTile
  const endTile = tileCreator.endTile
  const path = new Path(startTile, endTile, pathTiles)

  const orders = path.makeOrders()

  expect(orders).toHaveLength(0)
})
