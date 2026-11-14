import { DIRECTION } from '../../src/constants/direction'
import { TESTING_LEVEL } from '../../src/constants/testing'
import { Path } from '../../src/levels/path/Path'
import { LevelsDataTesting } from '../../src/levels/LevelsDataTesting'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { Player } from '../../src/player/Player'
import { MapDataType } from '../../src/types/mapDataType'
import { images } from './imagesResources'
import { TowerGreenCreator } from '../../src/towers/creators/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/creators/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/creators/TowerYellowCreator'
import { TilesManager } from '../../src/levels/tiles/TilesManager'
import { TileOrangeCreator } from '../../src/levels/tiles/creators/TileOrangeCreator'
import { TileStartCreator } from '../../src/levels/tiles/creators/TileStartCreator'
import { TileEndCreator } from '../../src/levels/tiles/creators/TileEndCreator'
import { TilePathCreator } from '../../src/levels/tiles/creators/TilePathCreator'
import { TileJumperCreator } from '../../src/levels/tiles/creators/TileJumperCreator'
import { TileTeleportCreator } from '../../src/levels/tiles/creators/TileTeleportCreator'

export const getTileOrangeCreator = () => {
  TileOrangeCreator.clearInstance()
  const player = Player.getInstance()
  const towerGreenCreator = TowerGreenCreator.getInstance(images)
  const towerRedCreator = TowerRedCreator.getInstance(images)
  const towerYellowCreator = TowerYellowCreator.getInstance(images, player)

  return TileOrangeCreator.getInstance(
    images,
    player,
    towerGreenCreator,
    towerRedCreator,
    towerYellowCreator,
  )
}

export const getTileStartCreator = () => {
  TileStartCreator.clearInstance()
  return TileStartCreator.getInstance(images)
}

export const getTileEndCreator = () => {
  TileEndCreator.clearInstance()
  return TileEndCreator.getInstance(images)
}

export const getTilePathCreator = () => {
  TilePathCreator.clearInstance()
  return TilePathCreator.getInstance()
}

export const getTileJumperCreator = () => {
  TileJumperCreator.clearInstance()
  return TileJumperCreator.getInstance(images)
}

export const getTileTeleportCreator = () => {
  TileTeleportCreator.clearInstance()
  return TileTeleportCreator.getInstance()
}

export const getPathFromMap = (levelMap: MapDataType) => {
  const tilesManager = new TilesManager()

  const tileOrangeCreator = getTileOrangeCreator()
  const tileStartCreator = getTileStartCreator()
  const tileEndCreator = getTileEndCreator()
  const tilePathCreator = getTilePathCreator()
  const tileJumperCreator = getTileJumperCreator()
  const tileTeleportCreator = getTileTeleportCreator()

  tileOrangeCreator.setLevelMap(levelMap)
  tileOrangeCreator.create(tilesManager)
  tileStartCreator.setLevelMap(levelMap)
  tileStartCreator.create(tilesManager)
  tileEndCreator.setLevelMap(levelMap)
  tileEndCreator.create(tilesManager)
  tilePathCreator.setLevelMap(levelMap)
  tilePathCreator.create(tilesManager)
  tileJumperCreator.setLevelMap(levelMap)
  tileJumperCreator.create(tilesManager)
  tileTeleportCreator.setLevelMap(levelMap)
  tileTeleportCreator.create(tilesManager)

  const pathTiles = tilesManager.getAllPathTiles
  const startTile = tilesManager.tileStart
  const endTile = tilesManager.tileEnd

  if (startTile === null) {
    throw new Error('startTile is null')
  }
  if (endTile === null) {
    throw new Error('endTile is null')
  }
  return new Path(startTile, endTile, pathTiles)
}

export const getValidLevelMap = () => {
  return getLevelMap(TESTING_LEVEL.ID_VALID)
}

export const getNoValidLevelMapUnreachableEndTile = () => {
  return getLevelMap(TESTING_LEVEL.ID_INVALID_UNREACHABLE_END)
}

export const getNoValidLevelMapWithoutRows = () => {
  return getLevelMap(TESTING_LEVEL.ID_INVALID_NO_ROWSMAP)
}

export const getNoExistingLevelMap = () => {
  const idNotExistingMap = 923491234
  return getLevelMap(idNotExistingMap)
}

export const getLevelMap = (idLevelMap: number) => {
  const levelsDataProvider = LevelsDataProvider.getInstance()
  levelsDataProvider.initLevels(LevelsDataTesting.data)

  const levelMap = levelsDataProvider.getById(idLevelMap)

  return levelMap
}

export const testTinyOrders = [
  DIRECTION.LEFT,
  DIRECTION.DOWN,
  DIRECTION.RIGHT,
  DIRECTION.UP,
]

export const getTileStartForLevel = (levelId: number) => {
  const levelMap = getLevelMap(levelId)

  const tilesManager = new TilesManager()
  TileStartCreator.clearInstance()
  const tileStartCreator = getTileStartCreator()

  tileStartCreator.setLevelMap(levelMap)
  tileStartCreator.create(tilesManager)
  const tileStart = tilesManager.tileStart

  if (tileStart === null) {
    throw new Error('Error tileStart is null')
  }
  return tileStart
}
