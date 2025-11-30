import { Image } from 'p5'
import { TilesManager } from './TilesManager'
import { ConstDirection } from '../../constants/ConstDirection'
import { TileEnd } from './TileEnd'
import { MapDataType } from '../../types/mapDataType'
import { ConstTest } from '../../constants/ConstTest'
import { Const } from '../../constants/Const'

export class TileEndCreator {
  static #instance: TileEndCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = 'y'

  static getInstance(mapImages: Image[]) {
    if (TileEndCreator.#instance === null) {
      TileEndCreator.#instance = new TileEndCreator(mapImages)
    }
    return TileEndCreator.#instance
  }

  #mapImages: Image[] | null = null
  constructor(mapImages: Image[]) {
    if (TileEndCreator.#instance !== null) {
      throw new Error(
        'TileEndCreator is a singleton class, use getInstance to get the instance',
      )
    }

    if (!ConstTest.DISABLE_LOADING_IMAGES) {
      this.#mapImages = mapImages
    }

    // assign the singleton instance
    TileEndCreator.#instance = this
  }
  // clearInstance is for using in jest
  static clearInstance() {
    TileEndCreator.#instance = null
  }

  #instanceEndTile(
    levelMap: MapDataType,
    tilesManager: TilesManager,
    posX: number,
    posY: number,
  ) {
    const endImage = this.#endImage(levelMap)

    tilesManager.tileEnd = new TileEnd(endImage, {
      x: posX,
      y: posY,
    })
  }

  #endImage(levelMap: MapDataType) {
    if (this.#mapImages === null) {
      return null
    }

    const directionImageMap = {
      [ConstDirection.DOWN]: 5,
      [ConstDirection.RIGHT]: 4,
      [ConstDirection.LEFT]: 3,
      [ConstDirection.UP]: 2,
    }

    const imageIndex = directionImageMap[levelMap.endDirection] ?? 3
    return this.#mapImages[imageIndex]
  }

  #processRow(
    levelMap: MapDataType,
    tilesManager: TilesManager,
    rowSymbols: string,
    row: number,
  ) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isEndTile(rowSymbols, column)) {
        this.#instanceEndTile(
          levelMap,
          tilesManager,
          this.#getPosX(column),
          this.#getPosY(row),
        )
      }
    }
  }

  #isEndTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TileEndCreator.SYMBOL
  }

  #getPosX(column: number) {
    return TileEndCreator.FLOOR_SIZE * column
  }

  #getPosY(row: number) {
    return TileEndCreator.FLOOR_SIZE * row + TileEndCreator.MARGIN_TOP
  }

  create(levelMap: MapDataType, tilesManager: TilesManager) {
    let rowCount = 0
    levelMap.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(levelMap, tilesManager, trimmedRow, rowCount)
    })
  }
}
