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

  #processRow(tilesManager: TilesManager, trimmedRow: string, row: number) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      if (character === TilePathCreator.SYMBOL) {
        this.#instancePathTile(
          tilesManager,
          this.#getPosX(column),
          this.#getPosY(row),
        )
      }
    }
  }

  #getPosX(column: number) {
    return TilePathCreator.FLOOR_SIZE * column
  }

  #getPosY(row: number) {
    return TilePathCreator.FLOOR_SIZE * row + TilePathCreator.MARGIN_TOP
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
