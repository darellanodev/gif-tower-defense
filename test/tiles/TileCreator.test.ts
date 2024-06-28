import { TileCreator } from '../../src/tiles/TileCreator'
import { Player } from '../../src/player/Player'
import {
  getNoExistingLevelMap,
  getNoValidLevelMapWithoutRows,
  getTileCreatorFromMap,
  getValidLevelMap,
} from '../helpers/levelMap'
import { images } from '../helpers/imagesResources'
import { TowerGreenCreator } from '../../src/towers/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/TowerYellowCreator'

test('Constructor, when passing an invalid map without rows map, throws "No rows map found" exception', () => {
  const player = Player.getInstance()
  const noValidMap = getNoValidLevelMapWithoutRows()
  const towerGreenCreator = TowerGreenCreator.getInstance(images)
  const towerRedCreator = TowerRedCreator.getInstance(images)
  const towerYellowCreator = TowerYellowCreator.getInstance(images, player)
  expect(
    () =>
      new TileCreator(
        noValidMap,
        images,
        player,
        towerGreenCreator,
        towerRedCreator,
        towerYellowCreator,
      ),
  ).toThrow('No rows map found')
})

test('Constructor, when passing a non existing map, throws "Map is undefined" exception', () => {
  const player = Player.getInstance()
  const noExistingMap = getNoExistingLevelMap()
  const towerGreenCreator = TowerGreenCreator.getInstance(images)
  const towerRedCreator = TowerRedCreator.getInstance(images)
  const towerYellowCreator = TowerYellowCreator.getInstance(images, player)
  expect(
    () =>
      new TileCreator(
        noExistingMap,
        images,
        player,
        towerGreenCreator,
        towerRedCreator,
        towerYellowCreator,
      ),
  ).toThrow('Map is undefined')
})

test('orangeTiles getter, when valid map is passed, return the orange tiles', () => {
  const levelMap = getValidLevelMap()
  const TileCreator = getTileCreatorFromMap(levelMap)

  const result = TileCreator.orangeTiles

  expect(result).toHaveLength(71)
})

test('pathTiles getter, when valid map is passed, return the path tiles', () => {
  const levelMap = getValidLevelMap()
  const TileCreator = getTileCreatorFromMap(levelMap)

  const result = TileCreator.pathTiles

  expect(result).toHaveLength(87)
})

test('startTile getter, when valid map is passed, return the start tile', () => {
  const levelMap = getValidLevelMap()
  const TileCreator = getTileCreatorFromMap(levelMap)

  const result = TileCreator.startTile

  expect(result).toBeInstanceOf(Object)
})

test('endTile getter, when valid map is passed, return the end tile', () => {
  const levelMap = getValidLevelMap()
  const TileCreator = getTileCreatorFromMap(levelMap)

  const result = TileCreator.endTile

  expect(result).toBeInstanceOf(Object)
})

test('initialMoney getter, when valid map is passed, return the initial money', () => {
  const levelMap = getValidLevelMap()
  const TileCreator = getTileCreatorFromMap(levelMap)

  const result = TileCreator.initialMoney

  const expected = 150
  expect(result).toBe(expected)
})
