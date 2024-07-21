import { Player } from './player/Player'
import { Images } from './resources/Images'
import { LevelsDataProvider } from './levels/LevelsDataProvider'
import { LevelsData } from './levels/LevelsData'
import { TowerGreenCreator } from './towers/TowerGreenCreator'
import { TowerRedCreator } from './towers/TowerRedCreator'
import { TowerYellowCreator } from './towers/TowerYellowCreator'
import { TilesManager } from './tiles/TilesManager'
import { TileOrangeCreator } from './tiles/TileOrangeCreator'
import { TileStartCreator } from './tiles/TileStartCreator'
import { TileEndCreator } from './tiles/TileEndCreator'
import { TilePathCreator } from './tiles/TilePathCreator'
import { Const } from './constants/Const'
import { Position } from './types/position'
import { MapDataType } from './types/mapDataType'

export class MiniMap {
  #tilesManager: TilesManager
  #tileOrangeCreator: TileOrangeCreator
  #tileStartCreator: TileStartCreator
  #tileEndCreator: TileEndCreator
  #tilePathCreator: TilePathCreator
  #player: Player

  #position: Position
  constructor(levelMap: MapDataType, position: Position = { x: 0, y: 0 }) {
    this.#position = position

    if (levelMap === undefined) {
      throw new Error('Map invalid')
    }

    this.#player = Player.getInstance()

    const towerGreenCreator = TowerGreenCreator.getInstance(
      Images.greenTowerImages,
    )
    const towerRedCreator = TowerRedCreator.getInstance(Images.redTowerImages)
    const towerYellowCreator = TowerYellowCreator.getInstance(
      Images.yellowTowerImages,
      this.#player,
    )

    this.#tilesManager = new TilesManager()

    // create orange tiles
    this.#tileOrangeCreator = TileOrangeCreator.getInstance(
      Images.tileImages,
      this.#player,
      towerGreenCreator,
      towerRedCreator,
      towerYellowCreator,
    )
    this.#tileOrangeCreator.createAll(levelMap, this.#tilesManager)

    //create start tile
    this.#tileStartCreator = TileStartCreator.getInstance(Images.tileImages)
    this.#tileStartCreator.create(levelMap, this.#tilesManager)

    //create end tile
    this.#tileEndCreator = TileEndCreator.getInstance(Images.tileImages)
    this.#tileEndCreator.create(levelMap, this.#tilesManager)

    // create path tiles
    this.#tilePathCreator = TilePathCreator.getInstance()
    this.#tilePathCreator.createAll(levelMap, this.#tilesManager)
  }

  set position(position: Position) {
    this.#position.x = position.x
    this.#position.y = position.y
  }

  draw() {
    this.#tilesManager.drawAll(
      Const.SCALE_MINIMAP,
      this.#position.x,
      this.#position.y,
    )
  }
}
