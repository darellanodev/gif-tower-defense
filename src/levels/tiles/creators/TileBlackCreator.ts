import { TileBlack } from '../TileBlack'
import { Image } from 'p5'
import { TilesManager } from '../TilesManager'
import { TileCreator } from './TileCreator'
import { TestFlags } from '../../../../test/flags'

export class TileBlackCreator extends TileCreator {
  static #instance: TileBlackCreator | null = null
  static SYMBOL = '2'

  #blackImage: Image | null = null

  static getInstance(mapImages: Image[]) {
    if (TileBlackCreator.#instance === null) {
      TileBlackCreator.#instance = new TileBlackCreator(mapImages)
    }
    return TileBlackCreator.#instance
  }

  constructor(mapImages: Image[]) {
    super()
    if (TileBlackCreator.#instance !== null) {
      throw new Error(
        'TileBlackCreator is a singleton class, use getInstance to get the instance',
      )
    }

    if (!TestFlags.disableImageLoading) {
      this.#blackImage = mapImages[1]
    }

    // assign the singleton instance
    TileBlackCreator.#instance = this
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileBlackCreator.#instance = null
  }

  #instanceBlackTile(tilesManager: TilesManager, posX: number, posY: number) {
    tilesManager.addBlackTile(
      new TileBlack(this.#blackImage, { x: posX, y: posY }),
    )
  }

  processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isBlackTile(rowSymbols, column)) {
        this.#instanceBlackTile(
          tilesManager,
          this.getPosX(column),
          this.getPosY(row),
        )
      }
    }
  }

  #isBlackTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TileBlackCreator.SYMBOL
  }
}
