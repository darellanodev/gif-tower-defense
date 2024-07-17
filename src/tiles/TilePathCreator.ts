import { MapDataType } from '../types/mapDataType'
import { TilesManager } from './TilesManager'
import { TilePath } from './TilePath'

export class TilePathCreator {
  static #instance: TilePathCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = '1'

  #levelMap: MapDataType
  #tilesManager: TilesManager

  static getInstance(
    levelMap: MapDataType | undefined,
    tilesManager: TilesManager,
  ) {
    if (TilePathCreator.#instance === null) {
      TilePathCreator.#instance = new TilePathCreator(levelMap, tilesManager)
    }
    return TilePathCreator.#instance
  }

  constructor(levelMap: MapDataType | undefined, tilesManager: TilesManager) {
    if (TilePathCreator.#instance !== null) {
      throw new Error(
        'TilePathCreator is a singleton class, use getInstance to get the instance',
      )
    }

    if (!levelMap) {
      throw new Error('Map is undefined')
    }

    this.#levelMap = levelMap

    if (this.#levelMap.rowsMap.length === 0) {
      throw new Error('No rows map found')
    }

    this.#tilesManager = tilesManager

    // assign the singleton instance
    TilePathCreator.#instance = this
  }
  #instancePathTile(posX: number, posY: number) {
    this.#tilesManager.addPathTile(new TilePath({ x: posX, y: posY }))
  }

  #processRow(trimmedRow: string, rowCount: number) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TilePathCreator.FLOOR_SIZE * column
      const posY =
        TilePathCreator.FLOOR_SIZE * rowCount + TilePathCreator.MARGIN_TOP
      if (character === TilePathCreator.SYMBOL) {
        this.#instancePathTile(posX, posY)
      }
    }
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TilePathCreator.#instance = null
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
