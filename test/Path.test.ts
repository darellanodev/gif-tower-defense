import { Const } from '../src/Const'
import { Path } from '../src/Path'
import { PathTile } from '../src/PathTile'
import { StartTile } from '../src/StartTile'
import { EndTile } from '../src/EndTile'
import { TileGenerator } from '../src/TileGenerator'
import { OrangeTile } from '../src/OrangeTile'
import { GreenTower } from '../src/GreenTower'
import { RedTower } from '../src/RedTower'
import { YellowTower } from '../src/YellowTower'
import { Distance } from '../src/Distance'
import { TowerGenerator } from '../src/TowerGenerator'
import { ProgressBar } from '../src/ProgressBar'
import { LevelsData } from '../src/LevelsData'
import { LevelsDataProvider } from '../src/LevelsDataProvider'
import { Position } from '../src/types'

const levelsDataProvider = new LevelsDataProvider(LevelsData.data)

const levelMap = levelsDataProvider.getLevel(
  Const.ID_LEVEL_VALID_FOR_UNIT_TESTING,
)

const mapimages: any[] = [null, null, null]
const greenTowerImages: any[] = [null, null, null]
const redTowerImages: any[] = [null, null, null]
const yellowTowerImages: any[] = [null, null, null]

const towerGenerator = new TowerGenerator(
  greenTowerImages,
  redTowerImages,
  yellowTowerImages,
  Const,
  GreenTower,
  RedTower,
  YellowTower,
  Distance,
  ProgressBar,
)

const tileGenerator = new TileGenerator(
  levelMap,
  mapimages,
  Const,
  OrangeTile,
  PathTile,
  StartTile,
  EndTile,
  towerGenerator,
)
const pathTiles = tileGenerator.pathTiles()
const startTile = tileGenerator.startTile()
const endTile = tileGenerator.endTile()

const path = new Path(startTile, endTile, pathTiles, Const)

const isIncluded = (
  bigGroupElements: number[],
  smallGroupElements: number[],
) => {
  let result = true

  if (
    bigGroupElements.length === 0 ||
    smallGroupElements.length > bigGroupElements.length
  ) {
    result = false
  }

  let i = 0
  for (const smallGroupElement of smallGroupElements) {
    if (bigGroupElements[i] !== smallGroupElement) {
      result = false
      break
    }
    i++
  }

  return result
}

describe('enemies initial position', () => {
  test('when start direction is LEFT and start tile is at x:750, y:80', () => {
    const startTilePosition = startTile.getPosition()
    const expectedX = startTilePosition.x + 50
    const expectedY = startTilePosition.y
    const expected = { x: expectedX, y: expectedY }

    const path = new Path(startTile, endTile, pathTiles, Const)

    const result = path.getEnemiesInitialPosition()

    expect(result).toMatchObject(expected)
  })
})

describe('finds a pathtile', () => {
  test('if exists return the pathtile', () => {
    const img: any = null
    const positionStartTile: Position = { x: 300, y: 300 }
    const positionEndTile: Position = { x: 0, y: 300 }
    const startTile = new StartTile(
      img,
      positionStartTile,
      Const.LEFT_DIRECTION,
    )
    const endTile = new EndTile(img, positionEndTile)

    const searchTile = new PathTile(150, 300)

    const pathTiles = [
      new PathTile(100, 300),
      new PathTile(150, 300),
      new PathTile(200, 300),
    ]

    const path = new Path(startTile, endTile, pathTiles, Const)

    const result = path.getTileInPosition(150, 300)

    expect(result).toMatchObject(searchTile)
  })
})

describe('When start direction is left', () => {
  test('if there are 15 tiles consecutively to the left, the enemy moves first 16 times to left (15 tiles to the left + 1 tile to left when the enemy starts before the startTile', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, if there is no other left path tile then the direction is down 7 times', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and 7 down path tiles, if there is no other down path tile, then the direction is right 13 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, go up 3 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, go left 6 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, 6 left, go down 1 path tile', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.DOWN_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, 6 left, 1 down, go 5 left path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(5).fill(Const.LEFT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, go up 3 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(5).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, go right 13 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(5).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, 13 right, go down 7 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(5).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, 13 right, 7 down, go left 16 path tiles (15 path tiles + 1 path tile from endTile to outside)', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(5).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(16).fill(Const.LEFT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })
})

describe('invalid map', () => {
  test('when cant reach the end tile returns an empty orders array', () => {
    const levelMap = levelsDataProvider.getLevel(
      Const.ID_LEVEL_INVALID_FOR_UNIT_TESTING,
    )

    const mapimages: any[] = [null, null, null]

    const tileGenerator = new TileGenerator(
      levelMap,
      mapimages,
      Const,
      OrangeTile,
      PathTile,
      StartTile,
      EndTile,
      towerGenerator,
    )
    const pathTiles = tileGenerator.pathTiles()
    const startTile = tileGenerator.startTile()
    const endTile = tileGenerator.endTile()

    const path = new Path(startTile, endTile, pathTiles, Const)

    const orders = path.makeOrders()

    expect(orders).toHaveLength(0)
  })
})
