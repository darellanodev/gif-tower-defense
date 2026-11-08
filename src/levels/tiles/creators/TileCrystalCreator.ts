import { TileCrystal } from '../TileCrystal'
import { Image } from 'p5'
import { TilesManager } from '../TilesManager'
import { TileCreator } from './TileCreator'
import { TestFlags } from '../../../../test/flags'
import { TILE_SYMBOL } from '../../../constants/tile'
import { CRYSTAL } from '../../../constants/crystal'

export class TileCrystalCreator extends TileCreator {
  static #instance: TileCrystalCreator | null = null
  #crystalImage: Image | null = null

  static getInstance(mapImages: Image[]) {
    if (TileCrystalCreator.#instance === null) {
      TileCrystalCreator.#instance = new TileCrystalCreator(mapImages)
    }
    return TileCrystalCreator.#instance
  }

  constructor(mapImages: Image[]) {
    super()
    if (TileCrystalCreator.#instance !== null) {
      throw new Error(
        'TileCrystalCreator is a singleton class, use getInstance to get the instance',
      )
    }

    if (!TestFlags.disableImageLoading) {
      this.#crystalImage = mapImages[CRYSTAL.IMAGE_INDEX]
    }

    // assign the singleton instance
    TileCrystalCreator.#instance = this
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileCrystalCreator.#instance = null
  }

  #instanceCrystalTile(tilesManager: TilesManager, posX: number, posY: number) {
    tilesManager.addCrystal(
      new TileCrystal(this.#crystalImage, { x: posX, y: posY }),
    )
  }

  processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isCrystalTile(rowSymbols, column)) {
        this.#instanceCrystalTile(
          tilesManager,
          this.getPosX(column),
          this.getPosY(row),
        )
      }
    }
  }

  #isCrystalTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TILE_SYMBOL.CRYSTAL
  }
}
