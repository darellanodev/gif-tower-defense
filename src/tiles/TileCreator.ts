import { MapDataType } from '../types/mapDataType'
import { TileStart } from './TileStart'
import { TileEnd } from './TileEnd'
import { TileOrange } from './TileOrange'
import { TilePath } from './TilePath'
import { Image } from 'p5'
import { ConstDirection } from '../constants/ConstDirection'
import { ConstMapTileSymbol } from '../constants/ConstMapTileSymbol'
import { Player } from '../player/Player'
import { TowerGreenCreator } from '../towers/TowerGreenCreator'
import { TowerRedCreator } from '../towers/TowerRedCreator'
import { TowerYellowCreator } from '../towers/TowerYellowCreator'

export class TileCreator {
  static #instance: TileCreator | null = null

  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30

  #levelMap: MapDataType
  #mapImages: Image[]

  #orangeImage: Image
  #blackImage: Image
  #startImage: Image | null = null
  #endImage: Image | null = null
  #startDirection: number
  #player: Player

  #towerGreenCreator: TowerGreenCreator
  #towerRedCreator: TowerRedCreator
  #towerYellowCreator: TowerYellowCreator

  static getInstance(
    levelMap: MapDataType | undefined,
    mapImages: Image[],
    player: Player,
    towerGreenCreator: TowerGreenCreator,
    towerRedCreator: TowerRedCreator,
    towerYellowCreator: TowerYellowCreator,
  ) {
    if (TileCreator.#instance === null) {
      TileCreator.#instance = new TileCreator(
        levelMap,
        mapImages,
        player,
        towerGreenCreator,
        towerRedCreator,
        towerYellowCreator,
      )
    }
    return TileCreator.#instance
  }

  constructor(
    levelMap: MapDataType | undefined,
    mapImages: Image[],
    player: Player,
    towerGreenCreator: TowerGreenCreator,
    towerRedCreator: TowerRedCreator,
    towerYellowCreator: TowerYellowCreator,
  ) {
    if (TileCreator.#instance !== null) {
      throw new Error(
        'TileCreator is a singleton class, use getInstance to get the instance',
      )
    }

    if (!levelMap) {
      throw new Error('Map is undefined')
    }

    this.#levelMap = levelMap
    this.#mapImages = mapImages
    this.#player = player

    if (this.#levelMap.rowsMap.length === 0) {
      throw new Error('No rows map found')
    }

    this.#setStartImage(mapImages)
    this.#setEndImage(mapImages)

    this.#orangeImage = mapImages[0]
    this.#blackImage = mapImages[1]
    this.#startDirection = this.#levelMap.startDirection
    this.#towerGreenCreator = towerGreenCreator
    this.#towerRedCreator = towerRedCreator
    this.#towerYellowCreator = towerYellowCreator
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

  #setEndImage(mapImages: any[]) {
    switch (this.#levelMap.endDirection) {
      case ConstDirection.DOWN:
        this.#endImage = mapImages[2]
        break

      case ConstDirection.RIGHT:
        this.#endImage = mapImages[4]
        break

      case ConstDirection.LEFT:
        this.#endImage = mapImages[3]
        break

      case ConstDirection.UP:
        this.#endImage = mapImages[5]
        break
    }
  }

  #instanceOrangeTile(resultTiles: any[], posX: number, posY: number) {
    resultTiles.push(
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

  #instancePathTile(resultTiles: any[], posX: number, posY: number) {
    resultTiles.push(new TilePath({ x: posX, y: posY }))
  }

  #instanceStartTile(resultTiles: any[], posX: number, posY: number) {
    resultTiles.push(
      new TileStart(
        this.#startImage,
        { x: posX, y: posY },
        this.#startDirection,
      ),
    )
  }

  #processSymbol(
    symbol: string,
    resultTiles: any[],
    posX: number,
    posY: number,
  ) {
    switch (symbol) {
      case ConstMapTileSymbol.ORANGE:
        this.#instanceOrangeTile(resultTiles, posX, posY)
        break
      case ConstMapTileSymbol.PATH:
        this.#instancePathTile(resultTiles, posX, posY)
        break
      case ConstMapTileSymbol.START:
        this.#instanceStartTile(resultTiles, posX, posY)
        break
      case ConstMapTileSymbol.END:
        resultTiles.push(new TileEnd(this.#endImage, { x: posX, y: posY }))
        break
    }
  }

  #processRow(
    resultTiles: any[],
    trimmedRow: string,
    rowCount: number,
    symbol: string,
  ) {
    for (let column = 0; column < trimmedRow.length; column++) {
      const character = trimmedRow[column]
      const posX = TileCreator.FLOOR_SIZE * column
      const posY = TileCreator.FLOOR_SIZE * rowCount + TileCreator.MARGIN_TOP
      if (character === symbol) {
        this.#processSymbol(symbol, resultTiles, posX, posY)
      }
    }
  }

  #extractTiles(symbol: string) {
    const resultTiles: any[] = []

    let rowCount = 0
    this.#levelMap.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      this.#processRow(resultTiles, trimmedRow, rowCount, symbol)
    })

    return resultTiles
  }

  get orangeTiles() {
    return this.#extractTiles('0')
  }

  get pathTiles() {
    return this.#extractTiles('1')
  }

  get startTile() {
    return this.#extractTiles('x')[0]
  }

  get endTile() {
    return this.#extractTiles('y')[0]
  }

  get initialMoney() {
    return Number(this.#levelMap.money)
  }
}
