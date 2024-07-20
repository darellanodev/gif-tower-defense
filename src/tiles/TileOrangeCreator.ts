import { TileOrange } from './TileOrange'
import { Image } from 'p5'
import { Player } from '../player/Player'
import { TowerGreenCreator } from '../towers/TowerGreenCreator'
import { TowerRedCreator } from '../towers/TowerRedCreator'
import { TowerYellowCreator } from '../towers/TowerYellowCreator'
import { TilesManager } from './TilesManager'
import { MapDataType } from '../types/mapDataType'

export class TileOrangeCreator {
  static #instance: TileOrangeCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = '0'

  #orangeImage: Image
  #player: Player

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

    this.#orangeImage = mapImages[0]
    this.#towerGreenCreator = towerGreenCreator
    this.#towerRedCreator = towerRedCreator
    this.#towerYellowCreator = towerYellowCreator

    // assign the singleton instance
    TileOrangeCreator.#instance = this
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

  #processRow(
    tilesManager: TilesManager,
    trimmedRow: string,
    rowCount: number,
  ) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TileOrangeCreator.FLOOR_SIZE * column
      const posY =
        TileOrangeCreator.FLOOR_SIZE * rowCount + TileOrangeCreator.MARGIN_TOP
      if (character === TileOrangeCreator.SYMBOL) {
        this.#instanceOrangeTile(tilesManager, posX, posY)
      }
    }
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileOrangeCreator.#instance = null
  }

  createAll(levelMap: MapDataType, tilesManager: TilesManager) {
    let rowCount = 0
    levelMap.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(tilesManager, trimmedRow, rowCount)
    })
  }
}
