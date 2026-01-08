import { TileOrange } from '../TileOrange'
import { Image } from 'p5'
import { Player } from '../../../player/Player'
import { TowerGreenCreator } from '../../../towers/creators/TowerGreenCreator'
import { TowerRedCreator } from '../../../towers/creators/TowerRedCreator'
import { TowerYellowCreator } from '../../../towers/creators/TowerYellowCreator'
import { TilesManager } from '../TilesManager'
import { TileCreator } from './TileCreator'
import { TestFlags } from '../../../../test/flags'
import { TILE_SYMBOL } from '../../../constants/tile'

export class TileOrangeCreator extends TileCreator {
  static #instance: TileOrangeCreator | null = null
  #orangeImage: Image | null = null
  #player: Player

  #towerGreenCreator: TowerGreenCreator
  #towerRedCreator: TowerRedCreator
  #towerYellowCreator: TowerYellowCreator

  static getInstance(
    mapImages: Image[],
    player: Player,
    towerGreenCreator: TowerGreenCreator,
    towerRedCreator: TowerRedCreator,
    towerYellowCreator: TowerYellowCreator,
  ) {
    if (TileOrangeCreator.#instance === null) {
      TileOrangeCreator.#instance = new TileOrangeCreator(
        mapImages,
        player,
        towerGreenCreator,
        towerRedCreator,
        towerYellowCreator,
      )
    }
    return TileOrangeCreator.#instance
  }

  constructor(
    mapImages: Image[],
    player: Player,
    towerGreenCreator: TowerGreenCreator,
    towerRedCreator: TowerRedCreator,
    towerYellowCreator: TowerYellowCreator,
  ) {
    super()
    if (TileOrangeCreator.#instance !== null) {
      throw new Error(
        'TileOrangeCreator is a singleton class, use getInstance to get the instance',
      )
    }

    this.#player = player
    if (!TestFlags.disableImageLoading) {
      this.#orangeImage = mapImages[0]
    }
    this.#towerGreenCreator = towerGreenCreator
    this.#towerRedCreator = towerRedCreator
    this.#towerYellowCreator = towerYellowCreator

    // assign the singleton instance
    TileOrangeCreator.#instance = this
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileOrangeCreator.#instance = null
  }

  #instanceOrangeTile(tilesManager: TilesManager, posX: number, posY: number) {
    tilesManager.addOrangeTile(
      new TileOrange(
        this.#orangeImage,
        { x: posX, y: posY },
        this.#player,
        this.#towerGreenCreator,
        this.#towerRedCreator,
        this.#towerYellowCreator,
      ),
    )
  }

  processRow(tilesManager: TilesManager, rowSymbols: string, row: number) {
    for (let column = 0; column < rowSymbols.length; column++) {
      if (this.#isOrangeTile(rowSymbols, column)) {
        this.#instanceOrangeTile(
          tilesManager,
          this.getPosX(column),
          this.getPosY(row),
        )
      }
    }
  }

  #isOrangeTile(rowSymbols: string, column: number) {
    return rowSymbols[column] === TILE_SYMBOL.ORANGE
  }
}
