import { TileOrange } from './TileOrange'
import { Image } from 'p5'
import { Player } from '../../player/Player'
import { TowerGreenCreator } from '../../towers/TowerGreenCreator'
import { TowerRedCreator } from '../../towers/TowerRedCreator'
import { TowerYellowCreator } from '../../towers/TowerYellowCreator'
import { TilesManager } from './TilesManager'
import { MapDataType } from '../../types/mapDataType'
import { ConstTest } from '../../constants/ConstTest'

export class TileOrangeCreator {
  static #instance: TileOrangeCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = '0'

  #orangeImage: Image | null = null
  #player: Player
  #levelMap: MapDataType | null = null

  #towerGreenCreator: TowerGreenCreator
  #towerRedCreator: TowerRedCreator
  #towerYellowCreator: TowerYellowCreator

  static getInstance(
    mapImages: Image[],
    player: Player,
    towerGreenCreator: TowerGreenCreator,
    towerRedCreator: TowerRedCreator,
    towerYellowCreator: TowerYellowCreator,
  ) {
    if (TileOrangeCreator.#instance === null) {
      TileOrangeCreator.#instance = new TileOrangeCreator(
        mapImages,
        player,
        towerGreenCreator,
        towerRedCreator,
        towerYellowCreator,
      )
    }
    return TileOrangeCreator.#instance
  }

  constructor(
    mapImages: Image[],
    player: Player,
    towerGreenCreator: TowerGreenCreator,
    towerRedCreator: TowerRedCreator,
    towerYellowCreator: TowerYellowCreator,
  ) {
    if (TileOrangeCreator.#instance !== null) {
      throw new Error(
        'TileOrangeCreator is a singleton class, use getInstance to get the instance',
      )
    }

    this.#player = player
    if (!ConstTest.DISABLE_LOADING_IMAGES) {
      this.#orangeImage = mapImages[0]
    }
    this.#towerGreenCreator = towerGreenCreator
    this.#towerRedCreator = towerRedCreator
    this.#towerYellowCreator = towerYellowCreator

    // assign the singleton instance
    TileOrangeCreator.#instance = this
  }

  setLevelMap(levelMap: MapDataType) {
    this.#levelMap = levelMap
  }

  #instanceOrangeTile(tilesManager: TilesManager, posX: number, posY: number) {
    tilesManager.addOrangeTile(
      new TileOrange(
        this.#orangeImage,
        { x: posX, y: posY },
        this.#player,
        this.#towerGreenCreator,
        this.#towerRedCreator,
        this.#towerYellowCreator,
      ),
    )
  }

  #processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isOrangeTile(rowSymbols, column)) {
        this.#instanceOrangeTile(
          tilesManager,
          this.#getPosX(column),
          this.#getPosY(row),
        )
      }
    }
  }

  #isOrangeTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TileOrangeCreator.SYMBOL
  }

  #getPosX(column: number) {
    return TileOrangeCreator.FLOOR_SIZE * column
  }

  #getPosY(row: number) {
    return TileOrangeCreator.FLOOR_SIZE * row + TileOrangeCreator.MARGIN_TOP
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileOrangeCreator.#instance = null
  }

  createAll(tilesManager: TilesManager) {
    let rowCount = 0
    this.#levelMap!.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(tilesManager, trimmedRow, rowCount)
    })
  }
}
