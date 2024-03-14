import { MapDataType } from './types'
import { TileStart } from './TileStart'
import { TileEnd } from './TileEnd'
import { TileOrange } from './TileOrange'
import { TilePath } from './TilePath'
import { TowerGenerator } from './TowerGenerator'
import { Image } from 'p5'
import { ConstDirection } from './ConstDirection'

export class TileGenerator {
  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30

  #levelMap: MapDataType
  #mapImages: Image[]
  #TileOrangeClass: typeof TileOrange
  #TilePathClass: typeof TilePath
  #TileStartClass: typeof TileStart
  #TileEndClass: typeof TileEnd
  #towerGenerator: TowerGenerator

  #orangeImage: Image
  #blackImage: Image
  #startImage: Image
  #endImage: Image
  #startDirection: number

  constructor(
    levelMap: MapDataType,
    mapImages: Image[],
    TileOrangeClass: typeof TileOrange,
    TilePathClass: typeof TilePath,
    TileStartClass: typeof TileStart,
    TileEndClass: typeof TileEnd,
    towerGenerator: TowerGenerator,
  ) {
    this.#levelMap = levelMap
    this.#mapImages = mapImages
    this.#TileOrangeClass = TileOrangeClass
    this.#TilePathClass = TilePathClass
    this.#TileStartClass = TileStartClass
    this.#TileEndClass = TileEndClass
    this.#towerGenerator = towerGenerator

    if (this.#levelMap.rowsMap.length === 0) {
      throw new Error('No rows map found')
    }

    this.#setStartImage(mapImages)
    this.#setEndImage(mapImages)

    this.#orangeImage = mapImages[0]
    this.#blackImage = mapImages[1]
    this.#startDirection = this.#levelMap.startDirection
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

  _extractTiles(symbol: string) {
    const resultTiles: any[] = []

    let rowCount = 0
    this.#levelMap.rowsMap.forEach((row: string) => {
      const trimmedRow = row.trim()
      rowCount++
      for (let column = 0; column < trimmedRow.length; column++) {
        const character = trimmedRow[column]
        const posX = TileGenerator.FLOOR_SIZE * column
        const posY =
          TileGenerator.FLOOR_SIZE * rowCount + TileGenerator.MARGIN_TOP
        if (character === symbol) {
          switch (symbol) {
            case '0':
              resultTiles.push(
                new this.#TileOrangeClass(
                  this.#orangeImage,
                  { x: posX, y: posY },
                  this.#towerGenerator,
                ),
              )
              break
            case '1':
              resultTiles.push(new this.#TilePathClass(posX, posY))
              break
            case 'x':
              resultTiles.push(
                new this.#TileStartClass(
                  this.#startImage,
                  { x: posX, y: posY },
                  this.#startDirection,
                ),
              )
              break
            case 'y':
              resultTiles.push(
                new this.#TileEndClass(this.#endImage, { x: posX, y: posY }),
              )
              break
          }
        }
      }
    })

    return resultTiles
  }

  get orangeTiles() {
    return this._extractTiles('0')
  }

  get pathTiles() {
    return this._extractTiles('1')
  }

  get startTile() {
    return this._extractTiles('x')[0]
  }

  get endTile() {
    return this._extractTiles('y')[0]
  }

  get initialMoney() {
    return Number(this.#levelMap.money)
  }
}
