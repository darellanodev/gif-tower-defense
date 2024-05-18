import { Player } from '../../src/player/Player'
import { TileOrange } from '../../src/tiles/TileOrange'
import { Position } from '../../src/utils/types'
import { img } from './imagesResources'

export const instantiateOrangeTile = () => {
  const OrangeTilePosition: Position = { x: 100, y: 200 }
  const player = new Player()
  return new TileOrange(img, OrangeTilePosition, player)
}
