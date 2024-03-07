import { ConstType, MapDataType } from './types'
import { StartTile } from './StartTile'
import { EndTile } from './EndTile'
import { OrangeTile } from './OrangeTile'
import { PathTile } from './PathTile'
import { TowerGenerator } from './TowerGenerator'
import { Image } from 'p5'

export class TileGenerator {
  static FLOOR_SIZE = 50
  static MARGIN_TOP = 30

  levelMap: MapDataType
  mapImages: Image[]
  Const: ConstType
  OrangeTileClass: typeof OrangeTile
  PathTileClass: typeof PathTile
  StartTileClass: typeof StartTile
  EndTileClass: typeof EndTile
  towerGenerator: TowerGenerator

  orangeImage: Image
  blackImage: Image
  startImage: Image
  endImage: Image
  startDirection: number

  constructor(
    levelMap: MapDataType,
    mapImages: Image[],
    Const: ConstType,
    OrangeTileClass: typeof OrangeTile,
    PathTileClass: typeof PathTile,
    StartTileClass: typeof StartTile,
    EndTileClass: typeof EndTile,
    towerGenerator: TowerGenerator,
  ) {
    this.levelMap = levelMap
    this.mapImages = mapImages
    this.Const = Const
    this.OrangeTileClass = OrangeTileClass
    this.PathTileClass = PathTileClass
    this.StartTileClass = StartTileClass
    this.EndTileClass = EndTileClass
    this.towerGenerator = towerGenerator

    if (this.levelMap.rowsMap.length === 0) {
      throw new Error('No rows map found')
    }

    this._setStartImage(mapImages)
    this._setEndImage(mapImages)

    this.orangeImage = mapImages[0]
    this.blackImage = mapImages[1]
    this.startDirection = this.levelMap.startDirection
  }

  _setStartImage(mapImages: any[]) {
    switch (this.levelMap.startDirection) {
      case this.Const.DOWN_DIRECTION:
        this.startImage = mapImages[6]
        this.startDirection = this.Const.DOWN_DIRECTION
        break

      case this.Const.RIGHT_DIRECTION:
        this.startImage = mapImages[7]
        this.startDirection = this.Const.RIGHT_DIRECTION
        break

      case this.Const.LEFT_DIRECTION:
        this.startImage = mapImages[8]
        this.startDirection = this.Const.LEFT_DIRECTION
        break

      case this.Const.UP_DIRECTION:
        this.startImage = mapImages[9]
        this.startDirection = this.Const.UP_DIRECTION
        break
    }
  }

  _setEndImage(mapImages: any[]) {
    switch (this.levelMap.endDirection) {
      case this.Const.DOWN_DIRECTION:
        this.endImage = mapImages[2]
        break

      case this.Const.RIGHT_DIRECTION:
        this.endImage = mapImages[4]
        break

      case this.Const.LEFT_DIRECTION:
        this.endImage = mapImages[3]
        break

      case this.Const.UP_DIRECTION:
        this.endImage = mapImages[5]
        break
    }
  }

  _extractTiles(symbol: string) {
    const resultTiles: any[] = []

    let rowCount = 0
    this.levelMap.rowsMap.forEach((row: string) => {
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
                new this.OrangeTileClass(
                  this.orangeImage,
                  { x: posX, y: posY },
                  this.Const,
                  this.towerGenerator,
                ),
              )
              break
            case '1':
              resultTiles.push(new this.PathTileClass(posX, posY))
              break
            case 'x':
              resultTiles.push(
                new this.StartTileClass(
                  this.startImage,
                  { x: posX, y: posY },
                  this.startDirection,
                ),
              )
              break
            case 'y':
              resultTiles.push(
                new this.EndTileClass(this.endImage, { x: posX, y: posY }),
              )
              break
          }
        }
      }
    })

    return resultTiles
  }

  orangeTiles() {
    return this._extractTiles('0')
  }

  pathTiles() {
    return this._extractTiles('1')
  }

  startTile() {
    return this._extractTiles('x')[0]
  }

  endTile() {
    return this._extractTiles('y')[0]
  }

  getInitialMoney() {
    return Number(this.levelMap.money)
  }
}
