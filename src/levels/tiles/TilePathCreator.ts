import { MapDataType } from '../../types/mapDataType'
import { TilePath } from './TilePath'
import { TilesManager } from './TilesManager'

export class TilePathCreator {
  static #instance: TilePathCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = '1'

  static getInstance() {
    if (TilePathCreator.#instance === null) {
      TilePathCreator.#instance = new TilePathCreator()
    }
    return TilePathCreator.#instance
  }

  constructor() {
    if (TilePathCreator.#instance !== null) {
      throw new Error(
        'TilePathCreator is a singleton class, use getInstance to get the instance',
      )
    }

    // assign the singleton instance
    TilePathCreator.#instance = this
  }
  #instancePathTile(tilesManager: TilesManager, posX: number, posY: number) {
    tilesManager.addPathTile(new TilePath({ x: posX, y: posY }))
  }

  #processRow(
    tilesManager: TilesManager,
    trimmedRow: string,
    rowCount: number,
  ) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TilePathCreator.FLOOR_SIZE * column
      const posY =
        TilePathCreator.FLOOR_SIZE * rowCount + TilePathCreator.MARGIN_TOP
      if (character === TilePathCreator.SYMBOL) {
        this.#instancePathTile(tilesManager, posX, posY)
      }
    }
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TilePathCreator.#instance = null
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
