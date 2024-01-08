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

const levelMap = `111111111111111x,
                  1000000000000000,
                  1011111111111111,
                  1010000000000001,
                  1010000111111101,
                  1011111100000101,
                  1000000000000101,
                  1111111111111101,
                  0000000000000001,
                  y111111111111111@3,2,-50,450,150`

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
    const expectedX = startTile.getX() + 50
    const expectedY = startTile.getY()
    const expected = { x: expectedX, y: expectedY }

    const path = new Path(startTile, endTile, pathTiles, Const)

    const result = path.getEnemiesInitialPosition()

    expect(result).toMatchObject(expected)
  })
})

describe('finds a pathtile', () => {
  test('if exists return the pathtile', () => {
    const img: any = null
    const startTile = new StartTile(img, 300, 300, Const.LEFT_DIRECTION)
    const endTile = new EndTile(img, 0, 300)

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
  test('if there are 15 tiles consecutively to the left, the enemy moves first 15 times to left', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 15 first left path tiles, if there is no other left path tile then the direction is down 7 times', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 15 first left path tiles, and 7 down path tiles, if there is no other down path tile, then the direction is right 13 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 15 first left path tiles, 7 down, 13 right, go up 3 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 15 first left path tiles, 7 down, 13 right, 3 up, go left 6 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 15 first left path tiles, 7 down, 13 right, 3 up, 6 left, go down 1 path tile', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.DOWN_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 15 first left path tiles, 7 down, 13 right, 3 up, 6 left, 1 down, go 5 left path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
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

  test('after the 15 first left path tiles, 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, go up 3 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
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

  test('after the 15 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, go right 13 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
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

  test('after the 15 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, 13 right, go down 7 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
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

  test('after the 15 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, 13 right, 7 down, go left 14 path tiles', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(5).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(14).fill(Const.LEFT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })

  test('after the 15 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, 13 right, 7 down, 14 left path tiles, go left to end tile', () => {
    const expectedOrders: number[] = []

    expectedOrders.push(...Array(15).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(6).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(5).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(3).fill(Const.UP_DIRECTION))
    expectedOrders.push(...Array(13).fill(Const.RIGHT_DIRECTION))
    expectedOrders.push(...Array(7).fill(Const.DOWN_DIRECTION))
    expectedOrders.push(...Array(14).fill(Const.LEFT_DIRECTION))
    expectedOrders.push(...Array(1).fill(Const.LEFT_DIRECTION))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)

    expect(result).toBeTruthy()
  })
})

describe('invalid map', () => {
  test('when cant reach the end tile returns an empty orders array', () => {
    const levelMap = `
        111111111111111x,
        1000000000000000,
        1011111111111111,
        1010000000000001,
        1010000111111101,
        1011111100000101,
        1000000000000101,
        1111111111111101,
        0000000000000001,
        y011111111111111@3,2,-50,450,150`

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
