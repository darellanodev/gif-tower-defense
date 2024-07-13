import { MapDataType } from '../types/mapDataType'
import { Image } from 'p5'
import { Player } from '../player/Player'
import { TilesManager } from './TilesManager'
import { ConstDirection } from '../constants/ConstDirection'
import { TileStart } from './TileStart'
import { TileEnd } from './TileEnd'

export class TileEndCreator {
  static #instance: TileEndCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = 'y'

  #levelMap: MapDataType
  #player: Player
  #tilesManager: TilesManager
  #endImage: Image | null = null

  static getInstance(
    levelMap: MapDataType | undefined,
    mapImages: Image[],
    player: Player,
    tilesManager: TilesManager,
  ) {
    if (TileEndCreator.#instance === null) {
      TileEndCreator.#instance = new TileEndCreator(
        levelMap,
        mapImages,
        player,
        tilesManager,
      )
    }
    return TileEndCreator.#instance
  }

  constructor(
    levelMap: MapDataType | undefined,
    mapImages: Image[],
    player: Player,
    tilesManager: TilesManager,
  ) {
    if (TileEndCreator.#instance !== null) {
      throw new Error(
        'TileEndCreator is a singleton class, use getInstance to get the instance',
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

    this.#tilesManager = tilesManager
    this.#setEndImage(mapImages)

    // assign the singleton instance
    TileEndCreator.#instance = this
  }

  #instanceEndTile(posX: number, posY: number) {
    this.#tilesManager.tileEnd = new TileEnd(this.#endImage, {
      x: posX,
      y: posY,
    })
  }
  #setEndImage(mapImages: any[]) {
    switch (this.#levelMap.endDirection) {
      case ConstDirection.DOWN:
        this.#endImage = mapImages[2]
        break

      case ConstDirection.RIGHT:
        this.#endImage = mapImages[4]
        break

      case ConstDirection.LEFT:
        this.#endImage = mapImages[3]
        break

      case ConstDirection.UP:
        this.#endImage = mapImages[5]
        break
    }
  }

  #processRow(trimmedRow: string, rowCount: number) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TileEndCreator.FLOOR_SIZE * column
      const posY =
        TileEndCreator.FLOOR_SIZE * rowCount + TileEndCreator.MARGIN_TOP
      if (character === TileEndCreator.SYMBOL) {
        this.#instanceEndTile(posX, posY)
      }
    }
  }

  create() {
    let rowCount = 0
    this.#levelMap.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(trimmedRow, rowCount)
    })
  }
}
