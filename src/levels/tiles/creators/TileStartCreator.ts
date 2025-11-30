import { Image } from 'p5'
import { TilesManager } from '../TilesManager'
import { ConstDirection } from '../../../constants/ConstDirection'
import { TileStart } from '../TileStart'
import { ConstTest } from '../../../constants/ConstTest'
import { TileCreator } from './TileCreator'

export class TileStartCreator extends TileCreator {
  static #instance: TileStartCreator | null = null

  static MARGIN_TOP = 30
  static SYMBOL = 'x'

  #mapImages: Image[] | null = null

  static getInstance(mapImages: Image[]) {
    if (TileStartCreator.#instance === null) {
      TileStartCreator.#instance = new TileStartCreator(mapImages)
    }
    return TileStartCreator.#instance
  }

  constructor(mapImages: Image[]) {
    super()
    if (TileStartCreator.#instance !== null) {
      throw new Error(
        'TileStartCreator is a singleton class, use getInstance to get the instance',
      )
    }
    if (!ConstTest.DISABLE_LOADING_IMAGES) {
      this.#mapImages = mapImages
    }

    // assign the singleton instance
    TileStartCreator.#instance = this
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileStartCreator.#instance = null
  }

  #getStartImage() {
    if (this.#mapImages === null) {
      return null
    }
    const startDirectionMap = {
      [ConstDirection.DOWN]: 6,
      [ConstDirection.RIGHT]: 7,
      [ConstDirection.LEFT]: 8,
      [ConstDirection.UP]: 9,
    }
    const index = startDirectionMap[this.levelMap!.startDirection]
    return this.#mapImages[index] ?? 8
  }

  #instanceStartTile(tilesManager: TilesManager, posX: number, posY: number) {
    let startImage = this.#getStartImage()
    tilesManager.tileStart = new TileStart(
      startImage,
      { x: posX, y: posY },
      this.levelMap!.startDirection,
    )
  }

  #processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isStartTile(rowSymbols, column)) {
        this.#instanceStartTile(
          tilesManager,
          this.getPosX(column),
          this.getPosY(row),
        )
      }
    }
  }

  #isStartTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TileStartCreator.SYMBOL
  }

  create(tilesManager: TilesManager) {
    let rowCount = 0
    this.levelMap!.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(tilesManager, trimmedRow, rowCount)
    })
  }
}
