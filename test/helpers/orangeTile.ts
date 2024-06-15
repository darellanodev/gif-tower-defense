import { Player } from '../../src/player/Player'
import { TileOrange } from '../../src/tiles/TileOrange'
import { Position } from '../../src/types/position'
import { img } from './imagesResources'
import { images } from './imagesResources'
import { TowerGreenCreator } from '../../src/towers/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/TowerYellowCreator'
export const instantiateOrangeTile = () => {
  const OrangeTilePosition: Position = { x: 100, y: 200 }
  const player = new Player()
  const towerGreenCreator = new TowerGreenCreator(images)
  const towerRedCreator = new TowerRedCreator(images)
  const towerYellowCreator = new TowerYellowCreator(images, player)
  return new TileOrange(
    img,
    OrangeTilePosition,
    player,
    towerGreenCreator,
    towerRedCreator,
    towerYellowCreator,
  )
}
