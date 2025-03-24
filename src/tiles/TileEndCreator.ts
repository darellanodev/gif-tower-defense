import { Image } from 'p5'
import { TilesManager } from './TilesManager'
import { ConstDirection } from '../constants/ConstDirection'
import { TileEnd } from './TileEnd'
import { MapDataType } from '../types/mapDataType'
import { ConstTest } from '../constants/ConstTest'
import { Const } from '../constants/Const'

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
    tilesManager: TilesManager,
    levelMap: MapDataType,
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
    tilesManager: TilesManager,
    levelMap: MapDataType,
    trimmedRow: string,
    rowCount: number,
  ) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TileEndCreator.FLOOR_SIZE * column
      const posY =
        TileEndCreator.FLOOR_SIZE * rowCount + TileEndCreator.MARGIN_TOP
      if (character === TileEndCreator.SYMBOL) {
        this.#instanceEndTile(tilesManager, levelMap, posX, posY)
      }
    }
  }

  create(levelMap: MapDataType, tilesManager: TilesManager) {
    let rowCount = 0
    levelMap.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(tilesManager, levelMap, trimmedRow, rowCount)
    })
  }
}
