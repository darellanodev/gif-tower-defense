import { TileTeleportIn } from '../TileTeleportIn'
import { TileTeleportOut } from '../TileTeleportOut'
import { TilesManager } from '../TilesManager'
import { TileCreator } from './TileCreator'
import { TILE_SYMBOL } from '../../../constants/tile'

export class TileTeleportCreator extends TileCreator {
  static #instance: TileTeleportCreator | null = null

  static getInstance() {
    if (TileTeleportCreator.#instance === null) {
      TileTeleportCreator.#instance = new TileTeleportCreator()
    }
    return TileTeleportCreator.#instance
  }

  constructor() {
    super()
    if (TileTeleportCreator.#instance !== null) {
      throw new Error(
        'TileTeleportCreator is a singleton class, use getInstance to get the instance',
      )
    }

    // assign the singleton instance
    TileTeleportCreator.#instance = this
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileTeleportCreator.#instance = null
  }

  processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      const position = { x: this.getPosX(column), y: this.getPosY(row) }
      if (rowSymbols[column] === TILE_SYMBOL.TELEPORT_IN) {
        tilesManager.addTeleportInTile(new TileTeleportIn(position))
      }
      if (rowSymbols[column] === TILE_SYMBOL.TELEPORT_OUT) {
        tilesManager.addTeleportOutTile(new TileTeleportOut(position))
      }
    }
  }
}
