import { TILE_SYMBOL } from '../../../constants/tile'
import { TilePath } from '../TilePath'
import { TilesManager } from '../TilesManager'
import { TileCreator } from './TileCreator'

export class TilePathCreator extends TileCreator {
  static #instance: TilePathCreator | null = null

  static getInstance() {
    if (TilePathCreator.#instance === null) {
      TilePathCreator.#instance = new TilePathCreator()
    }
    return TilePathCreator.#instance
  }

  constructor() {
    super()
    if (TilePathCreator.#instance !== null) {
      throw new Error(
        'TilePathCreator is a singleton class, use getInstance to get the instance',
      )
    }

    // assign the singleton instance
    TilePathCreator.#instance = this
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TilePathCreator.#instance = null
  }

  #instancePathTile(tilesManager: TilesManager, posX: number, posY: number) {
    tilesManager.addPathTile(new TilePath({ x: posX, y: posY }))
  }

  processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isPathTile(rowSymbols, column)) {
        this.#instancePathTile(
          tilesManager,
          this.getPosX(column),
          this.getPosY(row),
        )
      }
    }
  }

  #isPathTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TILE_SYMBOL.PATH
  }
}
