import { ConstDirection } from '../../src/constants/ConstDirection'
import { ConstTest } from '../../src/constants/ConstTest'
import { Path } from '../../src/levels/path/Path'
import { LevelsDataTesting } from '../../src/levels/LevelsDataTesting'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { Player } from '../../src/player/Player'
import { MapDataType } from '../../src/types/mapDataType'
import { images } from './imagesResources'
import { TowerGreenCreator } from '../../src/towers/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/TowerYellowCreator'
import { TilesManager } from '../../src/levels/tiles/TilesManager'
import { TileOrangeCreator } from '../../src/levels/tiles/creators/TileOrangeCreator'
import { TileStartCreator } from '../../src/levels/tiles/creators/TileStartCreator'
import { TileEndCreator } from '../../src/levels/tiles/creators/TileEndCreator'
import { TilePathCreator } from '../../src/levels/tiles/creators/TilePathCreator'

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

export const getPathFromMap = (levelMap: MapDataType) => {
  const tilesManager = new TilesManager()

  const tileOrangeCreator = getTileOrangeCreator()
  const tileStartCreator = getTileStartCreator()
  const tileEndCreator = getTileEndCreator()
  const tilePathCreator = getTilePathCreator()

  tileOrangeCreator.setLevelMap(levelMap)
  tileOrangeCreator.createAll(tilesManager)
  tileStartCreator.setLevelMap(levelMap)
  tileStartCreator.create(tilesManager)
  tileEndCreator.setLevelMap(levelMap)
  tileEndCreator.create(tilesManager)
  tilePathCreator.setLevelMap(levelMap)
  tilePathCreator.createAll(tilesManager)

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
  return getLevelMap(ConstTest.ID_LEVEL_VALID_FOR_UNIT_TESTING)
}

export const getNoValidLevelMapUnreachableEndTile = () => {
  return getLevelMap(
    ConstTest.ID_LEVEL_INVALID_UNREACHABLE_ENDTILE_FOR_UNIT_TESTING,
  )
}

export const getNoValidLevelMapWithoutRows = () => {
  return getLevelMap(
    ConstTest.ID_LEVEL_INVALID_WITHOUT_ROWSMAP_FOR_UNIT_TESTING,
  )
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
  ConstDirection.LEFT,
  ConstDirection.DOWN,
  ConstDirection.RIGHT,
  ConstDirection.UP,
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
