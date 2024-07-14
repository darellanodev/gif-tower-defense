import { MapDataType } from '../types/mapDataType'
import { Image } from 'p5'
import { Player } from '../player/Player'
import { TilesManager } from './TilesManager'
import { ConstDirection } from '../constants/ConstDirection'
import { TileStart } from './TileStart'

export class TileStartCreator {
  static #instance: TileStartCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30
  static SYMBOL = 'x'

  #levelMap: MapDataType
  #player: Player
  #tilesManager: TilesManager
  #startImage: Image | null = null
  #startDirection: number

  static getInstance(
    levelMap: MapDataType | undefined,
    mapImages: Image[],
    player: Player,
    tilesManager: TilesManager,
  ) {
    if (TileStartCreator.#instance === null) {
      TileStartCreator.#instance = new TileStartCreator(
        levelMap,
        mapImages,
        player,
        tilesManager,
      )
    }
    return TileStartCreator.#instance
  }

  constructor(
    levelMap: MapDataType | undefined,
    mapImages: Image[],
    player: Player,
    tilesManager: TilesManager,
  ) {
    if (TileStartCreator.#instance !== null) {
      throw new Error(
        'TileStartCreator is a singleton class, use getInstance to get the instance',
      )
    }

    if (!levelMap) {
      throw new Error('Map is undefined')
    }

    this.#levelMap = levelMap
    this.#player = player

    if (this.#levelMap.rowsMap.length === 0) {
      throw new Error('No rows map found')
    }

    this.#tilesManager = tilesManager
    this.#startDirection = this.#levelMap.startDirection
    this.#setStartImage(mapImages)

    // assign the singleton instance
    TileStartCreator.#instance = this
  }

  // clearInstance is for using in jest
  static clearInstance() {
    TileStartCreator.#instance = null
  }

  #setStartImage(mapImages: any[]) {
    switch (this.#levelMap.startDirection) {
      case ConstDirection.DOWN:
        this.#startImage = mapImages[6]
        this.#startDirection = ConstDirection.DOWN
        break

      case ConstDirection.RIGHT:
        this.#startImage = mapImages[7]
        this.#startDirection = ConstDirection.RIGHT
        break

      case ConstDirection.LEFT:
        this.#startImage = mapImages[8]
        this.#startDirection = ConstDirection.LEFT
        break

      case ConstDirection.UP:
        this.#startImage = mapImages[9]
        this.#startDirection = ConstDirection.UP
        break
    }
  }

  #instanceStartTile(posX: number, posY: number) {
    this.#tilesManager.tileStart = new TileStart(
      this.#startImage,
      { x: posX, y: posY },
      this.#startDirection,
    )
  }

  #processRow(trimmedRow: string, rowCount: number) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TileStartCreator.FLOOR_SIZE * column
      const posY =
        TileStartCreator.FLOOR_SIZE * rowCount + TileStartCreator.MARGIN_TOP
      if (character === TileStartCreator.SYMBOL) {
        this.#instanceStartTile(posX, posY)
      }
    }
  }

  create() {
    let rowCount = 0
    this.#levelMap.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(trimmedRow, rowCount)
    })
  }
}
