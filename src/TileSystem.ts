import { TileOrangeCreator } from './tiles/TileOrangeCreator'
import { TileStartCreator } from './tiles/TileStartCreator'
import { TileEndCreator } from './tiles/TileEndCreator'
import { TilePathCreator } from './tiles/TilePathCreator'
import { TileBlackCreator } from './tiles/TileBlackCreator'
import { Images } from './resources/Images'
import { Player } from './player/Player'
import { TowerGreenCreator } from './towers/TowerGreenCreator'
import { TowerRedCreator } from './towers/TowerRedCreator'
import { TowerYellowCreator } from './towers/TowerYellowCreator'
import { TilesManager } from './tiles/TilesManager'
import { MapDataType } from './types/mapDataType'

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
    this.#tileStartCreator.create(levelMap, this.#tilesManager)

    //create end tile
    this.#tileEndCreator = TileEndCreator.getInstance(Images.tileImages)
    this.#tileEndCreator.create(levelMap, this.#tilesManager)

    // create path tiles
    this.#tilePathCreator = TilePathCreator.getInstance()
    this.#tilePathCreator.createAll(levelMap, this.#tilesManager)

    // create black tiles
    this.#tileBlackCreator = TileBlackCreator.getInstance(Images.tileImages)
    this.#tileBlackCreator.createAll(levelMap, this.#tilesManager)

    this.#tileOrangeCreator.createAll(levelMap, this.#tilesManager)
  }
}
