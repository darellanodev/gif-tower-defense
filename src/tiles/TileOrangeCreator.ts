import { MapDataType } from '../types/mapDataType'
import { TileOrange } from './TileOrange'
import { Image } from 'p5'
import { Player } from '../player/Player'
import { TowerGreenCreator } from '../towers/TowerGreenCreator'
import { TowerRedCreator } from '../towers/TowerRedCreator'
import { TowerYellowCreator } from '../towers/TowerYellowCreator'
import { TilesManager } from './TilesManager'

export class TileOrangeCreator {
  static #instance: TileOrangeCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = '0'

  #levelMap: MapDataType

  #orangeImage: Image
  #player: Player

  #towerGreenCreator: TowerGreenCreator
  #towerRedCreator: TowerRedCreator
  #towerYellowCreator: TowerYellowCreator
  #tilesManager: TilesManager

  static getInstance(
    levelMap: MapDataType | undefined,
    mapImages: Image[],
    player: Player,
    towerGreenCreator: TowerGreenCreator,
    towerRedCreator: TowerRedCreator,
    towerYellowCreator: TowerYellowCreator,
    tilesManager: TilesManager,
  ) {
    if (TileOrangeCreator.#instance === null) {
      TileOrangeCreator.#instance = new TileOrangeCreator(
        levelMap,
        mapImages,
        player,
        towerGreenCreator,
        towerRedCreator,
        towerYellowCreator,
        tilesManager,
      )
    }
    return TileOrangeCreator.#instance
  }

  constructor(
    levelMap: MapDataType | undefined,
    mapImages: Image[],
    player: Player,
    towerGreenCreator: TowerGreenCreator,
    towerRedCreator: TowerRedCreator,
    towerYellowCreator: TowerYellowCreator,
    tilesManager: TilesManager,
  ) {
    if (TileOrangeCreator.#instance !== null) {
      throw new Error(
        'TileOrangeCreator is a singleton class, use getInstance to get the instance',
      )
    }

    if (!levelMap) {
      throw new Error('Map is undefined')
    }

    this.#levelMap = levelMap
    this.#player = player

    if (this.#levelMap.rowsMap.length === 0) {
      throw new Error('No rows map found')
    }

    this.#orangeImage = mapImages[0]
    this.#towerGreenCreator = towerGreenCreator
    this.#towerRedCreator = towerRedCreator
    this.#towerYellowCreator = towerYellowCreator

    this.#tilesManager = tilesManager

    // assign the singleton instance
    TileOrangeCreator.#instance = this
  }

  #instanceOrangeTile(posX: number, posY: number) {
    this.#tilesManager.addOrangeTile(
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

  #processRow(trimmedRow: string, rowCount: number) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TileOrangeCreator.FLOOR_SIZE * column
      const posY =
        TileOrangeCreator.FLOOR_SIZE * rowCount + TileOrangeCreator.MARGIN_TOP
      if (character === TileOrangeCreator.SYMBOL) {
        this.#instanceOrangeTile(posX, posY)
      }
    }
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileOrangeCreator.#instance = null
  }

  createAll() {
    let rowCount = 0
    this.#levelMap.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(trimmedRow, rowCount)
    })
  }
}
