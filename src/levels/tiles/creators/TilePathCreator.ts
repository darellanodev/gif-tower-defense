import { TILE_SYMBOL } from '../../../constants/tile'
import { TileIce } from '../TileIce'
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

  #instanceIceTile(tilesManager: TilesManager, posX: number, posY: number) {
    tilesManager.addIceTile(new TileIce({ x: posX, y: posY }))
  }

  processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      const posX = this.getPosX(column)
      const posY = this.getPosY(row)

      if (this.#isPathTile(rowSymbols, column)) {
        this.#instancePathTile(tilesManager, posX, posY)
      }
      if (this.#isIceTile(rowSymbols, column)) {
        this.#instanceIceTile(tilesManager, posX, posY)
      }
    }
  }

  #isIceTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TILE_SYMBOL.ICE
  }

  #isPathTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TILE_SYMBOL.PATH
  }
}
