import { Image } from 'p5'
import { TilesManager } from '../TilesManager'
import { ConstDirection } from '../../../constants/ConstDirection'
import { TileEnd } from '../TileEnd'
import { ConstTest } from '../../../constants/ConstTest'
import { TileCreator } from './TileCreator'

export class TileEndCreator extends TileCreator {
  static #instance: TileEndCreator | null = null

  static SYMBOL = 'y'

  #mapImages: Image[] | null = null

  static getInstance(mapImages: Image[]) {
    if (TileEndCreator.#instance === null) {
      TileEndCreator.#instance = new TileEndCreator(mapImages)
    }
    return TileEndCreator.#instance
  }

  constructor(mapImages: Image[]) {
    super()
    if (TileEndCreator.#instance !== null) {
      throw new Error(
        'TileEndCreator is a singleton class, use getInstance to get the instance',
      )
    }

    if (!ConstTest.DISABLE_LOADING_IMAGES) {
      this.#mapImages = mapImages
    }

    // assign the singleton instance
    TileEndCreator.#instance = this
  }
  // clearInstance is for using in jest
  static clearInstance() {
    TileEndCreator.#instance = null
  }

  #instanceEndTile(tilesManager: TilesManager, posX: number, posY: number) {
    const endImage = this.#endImage()

    tilesManager.tileEnd = new TileEnd(endImage, {
      x: posX,
      y: posY,
    })
  }

  #endImage() {
    if (this.#mapImages === null) {
      return null
    }

    const directionImageMap = {
      [ConstDirection.DOWN]: 5,
      [ConstDirection.RIGHT]: 4,
      [ConstDirection.LEFT]: 3,
      [ConstDirection.UP]: 2,
    }

    const imageIndex = directionImageMap[this.levelMap!.endDirection] ?? 3
    return this.#mapImages[imageIndex]
  }

  processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isEndTile(rowSymbols, column)) {
        this.#instanceEndTile(
          tilesManager,
          this.getPosX(column),
          this.getPosY(row),
        )
      }
    }
  }

  #isEndTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TileEndCreator.SYMBOL
  }
}
