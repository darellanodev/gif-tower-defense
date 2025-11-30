import { TileBlack } from './TileBlack'
import { Image } from 'p5'
import { TilesManager } from './TilesManager'
import { MapDataType } from '../../types/mapDataType'
import { ConstTest } from '../../constants/ConstTest'

export class TileBlackCreator {
  static #instance: TileBlackCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = '2'

  #blackImage: Image | null = null
  #levelMap: MapDataType | null = null

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

    if (!ConstTest.DISABLE_LOADING_IMAGES) {
      this.#blackImage = mapImages[1]
    }

    // assign the singleton instance
    TileBlackCreator.#instance = this
  }

  setLevelMap(levelMap: MapDataType) {
    this.#levelMap = levelMap
  }

  #instanceBlackTile(tilesManager: TilesManager, posX: number, posY: number) {
    tilesManager.addBlackTile(
      new TileBlack(this.#blackImage, { x: posX, y: posY }),
    )
  }

  #processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isBlackTile(rowSymbols, column)) {
        this.#instanceBlackTile(
          tilesManager,
          this.#getPosX(column),
          this.#getPosY(row),
        )
      }
    }
  }

  #isBlackTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TileBlackCreator.SYMBOL
  }

  #getPosX(column: number) {
    return TileBlackCreator.FLOOR_SIZE * column
  }

  #getPosY(row: number) {
    return TileBlackCreator.FLOOR_SIZE * row + TileBlackCreator.MARGIN_TOP
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileBlackCreator.#instance = null
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
