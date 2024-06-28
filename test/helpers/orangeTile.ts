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
  const player = Player.getInstance()
  const towerGreenCreator = TowerGreenCreator.getInstance(images)
  const towerRedCreator = TowerRedCreator.getInstance(images)
  const towerYellowCreator = TowerYellowCreator.getInstance(images, player)
  return new TileOrange(
    img,
    OrangeTilePosition,
    player,
    towerGreenCreator,
    towerRedCreator,
    towerYellowCreator,
  )
}
