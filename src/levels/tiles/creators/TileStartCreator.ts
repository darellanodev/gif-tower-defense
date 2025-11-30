import { Image } from 'p5'
import { TilesManager } from '../TilesManager'
import { ConstDirection } from '../../../constants/ConstDirection'
import { TileStart } from '../TileStart'
import { MapDataType } from '../../../types/mapDataType'
import { ConstTest } from '../../../constants/ConstTest'

export class TileStartCreator {
  static #instance: TileStartCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = 'x'

  #mapImages: Image[] | null = null
  #levelMap: MapDataType | null = null

  static getInstance(mapImages: Image[]) {
    if (TileStartCreator.#instance === null) {
      TileStartCreator.#instance = new TileStartCreator(mapImages)
    }
    return TileStartCreator.#instance
  }

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

  setLevelMap(levelMap: MapDataType) {
    this.#levelMap = levelMap
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

  #processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isStartTile(rowSymbols, column)) {
        this.#instanceStartTile(
          this.#levelMap!,
          tilesManager,
          this.#getPosX(column),
          this.#getPosY(row),
        )
      }
    }
  }

  #isStartTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TileStartCreator.SYMBOL
  }

  #getPosX(column: number) {
    return TileStartCreator.FLOOR_SIZE * column
  }

  #getPosY(row: number) {
    return TileStartCreator.FLOOR_SIZE * row + TileStartCreator.MARGIN_TOP
  }

  create(tilesManager: TilesManager) {
    let rowCount = 0
    this.#levelMap!.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(tilesManager, trimmedRow, rowCount)
    })
  }
}
