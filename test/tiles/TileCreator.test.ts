import { expect } from 'vitest'
import {
  getTileEndCreator,
  getTileOrangeCreator,
  getTilePathCreator,
  getTileStartCreator,
  getValidLevelMap,
} from '../helpers/levelMap'
import { TilesManager } from '../../src/tiles/TilesManager'

test('orangeTiles getter, when valid map is passed, return the orange tiles', () => {
  const levelMap = getValidLevelMap()

  const tilesManager = new TilesManager()
  const tileOrangeCreator = getTileOrangeCreator()
  tileOrangeCreator.createAll(levelMap, tilesManager)

  const result = tilesManager.getAllOrangeTiles

  expect(result).toHaveLength(71)
})

test('pathTiles getter, when valid map is passed, return the path tiles', () => {
  const levelMap = getValidLevelMap()

  const tilesManager = new TilesManager()
  const tilePathCreator = getTilePathCreator()
  tilePathCreator.createAll(levelMap, tilesManager)

  const result = tilesManager.getAllPathTiles

  expect(result).toHaveLength(87)
})

test('startTile getter, when valid map is passed, return the start tile', () => {
  const levelMap = getValidLevelMap()

  const tilesManager = new TilesManager()
  const tileStartCreator = getTileStartCreator()
  tileStartCreator.create(levelMap, tilesManager)

  const result = tilesManager.tileStart

  expect(result).toBeInstanceOf(Object)
})

test('endTile getter, when valid map is passed, return the end tile', () => {
  const levelMap = getValidLevelMap()

  const tilesManager = new TilesManager()
  const tileEndCreator = getTileEndCreator()
  tileEndCreator.create(levelMap, tilesManager)

  const result = tilesManager.tileEnd

  expect(result).toBeInstanceOf(Object)
})
