import { Player } from './player/Player'
import { Images } from './resources/Images'
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
import { TextProperties } from './hud/TextProperties'
import { P5 } from './utils/P5'
import { TileBlackCreator } from './tiles/TileBlackCreator'

export class MiniMap {
  static TYPE_TEXT_DOWN = 1
  static TYPE_TEXT_LEFT = 2

  #tilesManager: TilesManager
  #tileBlackCreator: TileBlackCreator
  #tileOrangeCreator: TileOrangeCreator
  #tileStartCreator: TileStartCreator
  #tileEndCreator: TileEndCreator
  #tilePathCreator: TilePathCreator
  #player: Player
  #type: number
  #author: string
  #title: string
  #levelId: number

  #position: Position
  constructor(
    levelMap: MapDataType,
    type: number,
    position: Position = { x: 0, y: 0 },
  ) {
    this.#position = position
    this.#type = type

    this.#author = levelMap.author
    this.#title = levelMap.title
    this.#levelId = levelMap.id

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

    // create black tiles
    this.#tileBlackCreator = TileBlackCreator.getInstance(Images.tileImages)
    this.#tileBlackCreator.createAll(levelMap, this.#tilesManager)

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

  get levelId() {
    return this.#levelId
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
    TextProperties.setForHudData()
    if (this.#type === MiniMap.TYPE_TEXT_LEFT) {
      this.#drawTitleMapTextLeft()
    } else if (this.#type === MiniMap.TYPE_TEXT_DOWN) {
      this.#drawTitleMapTextDown()
    }
  }
  #drawTitleMapTextLeft() {
    P5.p5.text(this.#title, this.#position.x, this.#position.y + 102)
    P5.p5.text(`By ${this.#author}`, this.#position.x, this.#position.y + 118)
  }
  #drawTitleMapTextDown() {
    P5.p5.text(this.#title, this.#position.x - 170, this.#position.y + 71)
    P5.p5.text(
      `By ${this.#author}`,
      this.#position.x - 170,
      this.#position.y + 88,
    )
  }
}
