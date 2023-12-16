import { Const } from '../src/Const'
import { OrangeTile } from '../src/OrangeTile'
import { PathTile } from '../src/PathTile'
import { StartTile } from '../src/StartTile'
import { EndTile } from '../src/EndTile'

export class TileGenerator {
  FLOOR_SIZE = 50
  MARGIN_TOP = 30

  levelMap: string
  levelMapData: string
  orangeImage: any
  blackImage: any
  startImage: any
  endImage: any
  startDirection: number
  greenTowerImages: any[]
  redTowerImages: any[]
  yellowTowerImages: any[]

  constructor(
    levelMap: string,
    mapImages: any[],
    greenTowerImages: any[],
    redTowerImages: any[],
    yellowTowerImages: any[],
  ) {
    if (levelMap === '') {
      throw new Error('Level map string cannot be empty')
    }

    const levelMapParts = levelMap.split('@')

    this.levelMapData = levelMapParts[1]

    this._setStartImage(mapImages)
    this._setEndImage(mapImages)

    this.levelMap = levelMapParts[0]
    this.orangeImage = mapImages[0]
    this.blackImage = mapImages[1]
    this.startDirection = Const.LEFT_DIRECTION

    this.greenTowerImages = greenTowerImages
    this.redTowerImages = redTowerImages
    this.yellowTowerImages = yellowTowerImages
  }

  _setStartImage(mapImages: any[]) {
    const levelMapDataParts = this.levelMapData.split(',')
    const startOrientation = levelMapDataParts[0]

    switch (startOrientation) {
      case '1':
        this.startImage = mapImages[6]
        this.startDirection = Const.DOWN_DIRECTION
        break

      case '2':
        this.startImage = mapImages[7]
        this.startDirection = Const.RIGHT_DIRECTION
        break

      case '3':
        this.startImage = mapImages[8]
        this.startDirection = Const.LEFT_DIRECTION
        break

      case '4':
        this.startImage = mapImages[9]
        this.startDirection = Const.UP_DIRECTION
        break
    }
  }

  _setEndImage(mapImages: any[]) {
    const levelMapDataParts = this.levelMapData.split(',')
    const endOrientation = levelMapDataParts[1]

    switch (endOrientation) {
      case '1':
        this.endImage = mapImages[2]
        break

      case '2':
        this.endImage = mapImages[3]
        break

      case '3':
        this.endImage = mapImages[4]
        break

      case '4':
        this.endImage = mapImages[5]
        break
    }
  }

  _extractTiles(symbol: string) {
    const resultTiles: any[] = []

    const mapArray = this.levelMap.split(',')
    let rowCount = 0
    mapArray.forEach((row) => {
      const trimmedRow = row.trim()
      rowCount++
      for (let column = 0; column < trimmedRow.length; column++) {
        const character = trimmedRow[column]
        const posX = this.FLOOR_SIZE * column
        const posY = this.FLOOR_SIZE * rowCount + this.MARGIN_TOP
        if (character === symbol) {
          switch (symbol) {
            case '0':
              resultTiles.push(
                new OrangeTile(
                  this.orangeImage,
                  posX,
                  posY,
                  this.greenTowerImages,
                  this.redTowerImages,
                  this.yellowTowerImages,
                ),
              )
              break
            case '1':
              resultTiles.push(new PathTile(posX, posY))
              break
            case 'x':
              resultTiles.push(
                new StartTile(this.startImage, posX, posY, this.startDirection),
              )
              break
            case 'y':
              resultTiles.push(new EndTile(this.endImage, posX, posY))
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
    const levelMapDataParts = this.levelMapData.split(',')
    const initialMoney = levelMapDataParts[4]

    return Number(initialMoney)
  }
}
