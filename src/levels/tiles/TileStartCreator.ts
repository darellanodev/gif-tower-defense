import { Image } from 'p5'
import { TilesManager } from './TilesManager'
import { ConstDirection } from '../../constants/ConstDirection'
import { TileStart } from './TileStart'
import { MapDataType } from '../../types/mapDataType'
import { ConstTest } from '../../constants/ConstTest'

export class TileStartCreator {
  static #instance: TileStartCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = 'x'

  static getInstance(mapImages: Image[]) {
    if (TileStartCreator.#instance === null) {
      TileStartCreator.#instance = new TileStartCreator(mapImages)
    }
    return TileStartCreator.#instance
  }
  #mapImages: Image[] | null = null
  constructor(mapImages: Image[]) {
    if (TileStartCreator.#instance !== null) {
      throw new Error(
        'TileStartCreator is a singleton class, use getInstance to get the instance',
      )
    }
    if (!ConstTest.DISABLE_LOADING_IMAGES) {
      this.#mapImages = mapImages
    }

    // assign the singleton instance
    TileStartCreator.#instance = this
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileStartCreator.#instance = null
  }

  #getStartImage(levelMap: MapDataType) {
    if (this.#mapImages === null) {
      return null
    }
    const startDirectionMap = {
      [ConstDirection.DOWN]: 6,
      [ConstDirection.RIGHT]: 7,
      [ConstDirection.LEFT]: 8,
      [ConstDirection.UP]: 9,
    }
    const index = startDirectionMap[levelMap.startDirection]
    return this.#mapImages[index] ?? 8
  }

  #instanceStartTile(
    levelMap: MapDataType,
    tilesManager: TilesManager,
    posX: number,
    posY: number,
  ) {
    let startImage = this.#getStartImage(levelMap)
    tilesManager.tileStart = new TileStart(
      startImage,
      { x: posX, y: posY },
      levelMap.startDirection,
    )
  }

  #processRow(
    levelMap: MapDataType,
    tilesManager: TilesManager,
    trimmedRow: string,
    rowCount: number,
  ) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TileStartCreator.FLOOR_SIZE * column
      const posY =
        TileStartCreator.FLOOR_SIZE * rowCount + TileStartCreator.MARGIN_TOP
      if (character === TileStartCreator.SYMBOL) {
        this.#instanceStartTile(levelMap, tilesManager, posX, posY)
      }
    }
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
