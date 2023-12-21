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
  mapImages: any[]
  Const: any
  OrangeTile: any
  PathTile: any
  StartTile: any
  EndTile: any
  GreenTower: any
  RedTower: any
  YellowTower: any
  UpgradeDisplay: any
  Distance: any

  towerGenerator: any

  constructor(
    levelMap: string,
    mapImages: any[],
    greenTowerImages: any[],
    redTowerImages: any[],
    yellowTowerImages: any[],
    Const: any,
    OrangeTile: any,
    PathTile: any,
    StartTile: any,
    EndTile: any,
    GreenTower: any,
    RedTower: any,
    YellowTower: any,
    UpgradeDisplay: any,
    Distance: any,
    towerGenerator: any,
  ) {
    this.levelMap = levelMap
    this.mapImages = mapImages
    this.greenTowerImages = greenTowerImages
    this.redTowerImages = redTowerImages
    this.yellowTowerImages = yellowTowerImages
    this.Const = Const
    this.OrangeTile = OrangeTile
    this.PathTile = PathTile
    this.StartTile = StartTile
    this.EndTile = EndTile
    this.GreenTower = GreenTower
    this.RedTower = RedTower
    this.YellowTower = YellowTower
    this.UpgradeDisplay = UpgradeDisplay
    this.Distance = Distance
    this.towerGenerator = towerGenerator

    if (this.levelMap === '') {
      throw new Error('Level map string cannot be empty')
    }

    const levelMapParts = this.levelMap.split('@')

    this.levelMapData = levelMapParts[1]

    this._setStartImage(mapImages)
    this._setEndImage(mapImages)

    this.levelMap = levelMapParts[0]
    this.orangeImage = mapImages[0]
    this.blackImage = mapImages[1]
    this.startDirection = Const.LEFT_DIRECTION
  }

  _setStartImage(mapImages: any[]) {
    const levelMapDataParts = this.levelMapData.split(',')
    const startOrientation = levelMapDataParts[0]

    switch (startOrientation) {
      case '1':
        this.startImage = mapImages[6]
        this.startDirection = this.Const.DOWN_DIRECTION
        break

      case '2':
        this.startImage = mapImages[7]
        this.startDirection = this.Const.RIGHT_DIRECTION
        break

      case '3':
        this.startImage = mapImages[8]
        this.startDirection = this.Const.LEFT_DIRECTION
        break

      case '4':
        this.startImage = mapImages[9]
        this.startDirection = this.Const.UP_DIRECTION
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
                new this.OrangeTile(
                  this.orangeImage,
                  posX,
                  posY,
                  this.Const,
                  this.UpgradeDisplay,
                  this.Distance,
                  this.towerGenerator,
                ),
              )
              break
            case '1':
              resultTiles.push(new this.PathTile(posX, posY))
              break
            case 'x':
              resultTiles.push(
                new this.StartTile(
                  this.startImage,
                  posX,
                  posY,
                  this.startDirection,
                ),
              )
              break
            case 'y':
              resultTiles.push(new this.EndTile(this.endImage, posX, posY))
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
