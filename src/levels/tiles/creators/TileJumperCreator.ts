import { Image } from 'p5'
import { TileJumper } from '../TileJumper'
import { TilesManager } from '../TilesManager'
import { TileCreator } from './TileCreator'
import { TestFlags } from '../../../../test/flags'
import { JUMPER } from '../../../constants/jumper'

export class TileJumperCreator extends TileCreator {
  static #instance: TileJumperCreator | null = null
  #mapImages: Image[]

  static getInstance(mapImages: Image[]) {
    if (TileJumperCreator.#instance === null) {
      TileJumperCreator.#instance = new TileJumperCreator(mapImages)
    }
    return TileJumperCreator.#instance
  }

  constructor(mapImages: Image[]) {
    super()
    if (TileJumperCreator.#instance !== null) {
      throw new Error(
        'TileJumperCreator is a singleton class, use getInstance to get the instance',
      )
    }
    this.#mapImages = mapImages

    // assign the singleton instance
    TileJumperCreator.#instance = this
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileJumperCreator.#instance = null
  }

  #getImage(symbol: string): Image | null {
    if (TestFlags.disableImageLoading) {
      return null
    }
    return this.#mapImages[JUMPER.IMAGE_INDEX_BY_SYMBOL[symbol]]
  }

  #instanceJumperTile(
    tilesManager: TilesManager,
    symbol: string,
    posX: number,
    posY: number,
  ) {
    tilesManager.addJumperTile(
      new TileJumper(
        this.#getImage(symbol),
        { x: posX, y: posY },
        JUMPER.DISTANCE_BY_SYMBOL[symbol],
      ),
    )
  }

  processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      const symbol = rowSymbols[column]
      if (JUMPER.SYMBOLS.includes(symbol)) {
        this.#instanceJumperTile(
          tilesManager,
          symbol,
          this.getPosX(column),
          this.getPosY(row),
        )
      }
    }
  }
}
