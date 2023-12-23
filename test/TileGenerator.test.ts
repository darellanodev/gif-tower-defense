import { TileGenerator } from '../src/TileGenerator'
import { Const } from '../src/Const'
import { PathTile } from '../src/PathTile'
import { StartTile } from '../src/StartTile'
import { EndTile } from '../src/EndTile'
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

test('TileGenerator throws an exception when an empty string is passed to it', () => {
  expect(
    () =>
      new TileGenerator(
        '',
        mapimages,
        Const,
        OrangeTile,
        PathTile,
        StartTile,
        EndTile,
        towerGenerator,
      ),
  ).toThrowError('Level map string cannot be empty')
})

test('TileGenerator generate orange tiles', () => {
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

  const result = tileGenerator.orangeTiles()

  expect(result).toHaveLength(71)
})

test('TileGenerator generate path tiles', () => {
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

  const result = tileGenerator.pathTiles()

  expect(result).toHaveLength(87)
})

test('TileGenerator generate start tile', () => {
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

  const result = tileGenerator.startTile()

  expect(result).toBeInstanceOf(Object)
})

test('TileGenerator generate end tile', () => {
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

  const result = tileGenerator.endTile()

  expect(result).toBeInstanceOf(Object)
})

test('TileGenerator generate the initial money', () => {
  const expected = 150

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

  const result = tileGenerator.getInitialMoney()

  expect(result).toBe(expected)
})
