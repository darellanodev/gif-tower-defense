import { ConstTest } from '../src/ConstTest'
import { ConstDirection } from '../src/ConstDirection'
import { Path } from '../src/Path'
import { TilePath } from '../src/TilePath'
import { TileStart } from '../src/TileStart'
import { TileEnd } from '../src/TileEnd'
import { TileGenerator } from '../src/TileGenerator'
import { TowerGenerator } from '../src/TowerGenerator'
import { LevelsData } from '../src/LevelsData'
import { LevelsDataProvider } from '../src/LevelsDataProvider'
import { Position } from '../src/types'

const levelsDataProvider = new LevelsDataProvider(LevelsData.data)

const levelMap = levelsDataProvider.getLevel(
  ConstTest.ID_LEVEL_VALID_FOR_UNIT_TESTING,
)

const mapimages: any[] = [null, null, null]
const greenTowerImages: any[] = [null, null, null]
const redTowerImages: any[] = [null, null, null]
const yellowTowerImages: any[] = [null, null, null]

const towerGenerator = new TowerGenerator(
  greenTowerImages,
  redTowerImages,
  yellowTowerImages,
)

const tileGenerator = new TileGenerator(levelMap, mapimages, towerGenerator)
const pathTiles = tileGenerator.pathTiles
const startTile = tileGenerator.startTile
const endTile = tileGenerator.endTile

const path = new Path(startTile, endTile, pathTiles)

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

describe('getEnemiesInitialPosition', () => {
  test('when start direction is LEFT and start tile is at {x:750, y:80}, return x+=50 ({x:800, y:80})', () => {
    const startTilePosition = startTile.getPosition()
    const expected = { x: startTilePosition.x + 50, y: startTilePosition.y }
    const path = new Path(startTile, endTile, pathTiles)

    const result = path.getEnemiesInitialPosition()

    expect(result).toMatchObject(expected)
  })
})

describe('getTileInPosition', () => {
  test('when passing an existing pathtile coordinates, return the pathtile', () => {
    const img: any = null
    const positionTileStart: Position = { x: 300, y: 300 }
    const positionTileEnd: Position = { x: 0, y: 300 }
    const startTile = new TileStart(img, positionTileStart, ConstDirection.LEFT)
    const endTile = new TileEnd(img, positionTileEnd)
    const searchTile = new TilePath({ x: 150, y: 300 })
    const pathTiles = [
      new TilePath({ x: 100, y: 300 }),
      new TilePath({ x: 150, y: 300 }),
      new TilePath({ x: 200, y: 300 }),
    ]
    const path = new Path(startTile, endTile, pathTiles)

    const result = path.getTileInPosition(150, 300)

    expect(result).toMatchObject(searchTile)
  })
})

describe('makeOrders', () => {
  test('if there are 15 tiles consecutively to the left, the enemy moves first 16 times to left (15 tiles to the left + 1 tile to left when the enemy starts before the startTile', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, if there is no other left path tile then the direction is down 7 times', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and 7 down path tiles, if there is no other down path tile, then the direction is right 13 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, go up 3 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, go left 6 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, 6 left, go down 1 path tile', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, 6 left, 1 down, go 5 left path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(5).fill(ConstDirection.LEFT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, go up 3 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(5).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, go right 13 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(5).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, 13 right, go down 7 path tiles', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(5).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })

  test('after the 16 first left path tiles, and the 7 down, 13 right, 3 up, 6 left, 1 down, 5 left, 3 up, 13 right, 7 down, go left 16 path tiles (15 path tiles + 1 path tile from endTile to outside)', () => {
    const expectedOrders: number[] = []
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(6).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(1).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(5).fill(ConstDirection.LEFT))
    expectedOrders.push(...Array(3).fill(ConstDirection.UP))
    expectedOrders.push(...Array(13).fill(ConstDirection.RIGHT))
    expectedOrders.push(...Array(7).fill(ConstDirection.DOWN))
    expectedOrders.push(...Array(16).fill(ConstDirection.LEFT))

    const orders = path.makeOrders()

    const result = isIncluded(orders, expectedOrders)
    expect(result).toBeTruthy()
  })
})

describe('makeOrders when map is invalid', () => {
  test('when can not reach the end tile, returns an empty orders array', () => {
    const levelMap = levelsDataProvider.getLevel(
      ConstTest.ID_LEVEL_INVALID_FOR_UNIT_TESTING,
    )
    const mapimages: any[] = [null, null, null]
    const tileGenerator = new TileGenerator(levelMap, mapimages, towerGenerator)
    const pathTiles = tileGenerator.pathTiles
    const startTile = tileGenerator.startTile
    const endTile = tileGenerator.endTile
    const path = new Path(startTile, endTile, pathTiles)

    const orders = path.makeOrders()

    expect(orders).toHaveLength(0)
  })
})
