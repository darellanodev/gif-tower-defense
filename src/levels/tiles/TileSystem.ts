import { TileOrangeCreator } from './TileOrangeCreator'
import { TileStartCreator } from './TileStartCreator'
import { TileEndCreator } from './TileEndCreator'
import { TilePathCreator } from './TilePathCreator'
import { TileBlackCreator } from './TileBlackCreator'
import { Images } from '../../resources/Images'
import { Player } from '../../player/Player'
import { TowerGreenCreator } from '../../towers/TowerGreenCreator'
import { TowerRedCreator } from '../../towers/TowerRedCreator'
import { TowerYellowCreator } from '../../towers/TowerYellowCreator'
import { TilesManager } from './TilesManager'
import { MapDataType } from '../../types/mapDataType'

export class TileSystem {
  #tileBlackCreator: TileBlackCreator
  #tileOrangeCreator: TileOrangeCreator
  #tilePathCreator: TilePathCreator | null = null
  #tileStartCreator: TileStartCreator | null = null
  #tileEndCreator: TileEndCreator | null = null
  #tilesManager: TilesManager
  #player: Player

  constructor(player: Player, tilesManager: TilesManager) {
    this.#player = player
    this.#tilesManager = tilesManager
    const towerGreenCreator = TowerGreenCreator.getInstance(
      Images.greenTowerImages,
    )
    const towerRedCreator = TowerRedCreator.getInstance(Images.redTowerImages)
    const towerYellowCreator = TowerYellowCreator.getInstance(
      Images.yellowTowerImages,
      this.#player,
    )
    // create black tiles
    this.#tileBlackCreator = TileBlackCreator.getInstance(Images.tileImages)

    // create orange tiles
    this.#tileOrangeCreator = TileOrangeCreator.getInstance(
      Images.tileImages,
      this.#player,
      towerGreenCreator,
      towerRedCreator,
      towerYellowCreator,
    )
  }
  createTiles(levelMap: MapDataType) {
    //create start tile
    this.#tileStartCreator = TileStartCreator.getInstance(Images.tileImages)
    this.#tileStartCreator.setLevelMap(levelMap)
    this.#tileStartCreator.create(this.#tilesManager)

    //create end tile
    this.#tileEndCreator = TileEndCreator.getInstance(Images.tileImages)
    this.#tileEndCreator.setLevelMap(levelMap)
    this.#tileEndCreator.create(this.#tilesManager)

    // create path tiles
    this.#tilePathCreator = TilePathCreator.getInstance()
    this.#tilePathCreator.setLevelMap(levelMap)
    this.#tilePathCreator.createAll(this.#tilesManager)

    // create black tiles
    this.#tileBlackCreator = TileBlackCreator.getInstance(Images.tileImages)
    this.#tileBlackCreator.setLevelMap(levelMap)
    this.#tileBlackCreator.createAll(this.#tilesManager)

    this.#tileOrangeCreator.setLevelMap(levelMap)
    this.#tileOrangeCreator.createAll(this.#tilesManager)
  }
}
