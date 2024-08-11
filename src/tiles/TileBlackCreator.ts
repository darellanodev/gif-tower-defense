import { TileBlack } from './TileBlack'
import { Image } from 'p5'
import { TilesManager } from './TilesManager'
import { MapDataType } from '../types/mapDataType'

export class TileBlackCreator {
  static #instance: TileBlackCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = '2'

  #blackImage: Image

  static getInstance(mapImages: Image[]) {
    if (TileBlackCreator.#instance === null) {
      TileBlackCreator.#instance = new TileBlackCreator(mapImages)
    }
    return TileBlackCreator.#instance
  }

  constructor(mapImages: Image[]) {
    if (TileBlackCreator.#instance !== null) {
      throw new Error(
        'TileBlackCreator is a singleton class, use getInstance to get the instance',
      )
    }

    this.#blackImage = mapImages[1]

    // assign the singleton instance
    TileBlackCreator.#instance = this
  }

  #instanceOrangeTile(tilesManager: TilesManager, posX: number, posY: number) {
    tilesManager.addBlackTile(
      new TileBlack(this.#blackImage, { x: posX, y: posY }),
    )
  }

  #processRow(
    tilesManager: TilesManager,
    trimmedRow: string,
    rowCount: number,
  ) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TileBlackCreator.FLOOR_SIZE * column
      const posY =
        TileBlackCreator.FLOOR_SIZE * rowCount + TileBlackCreator.MARGIN_TOP
      if (character === TileBlackCreator.SYMBOL) {
        this.#instanceOrangeTile(tilesManager, posX, posY)
      }
    }
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileBlackCreator.#instance = null
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
