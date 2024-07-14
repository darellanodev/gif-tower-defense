import { ConstDirection } from '../../src/constants/ConstDirection'
import { ConstTest } from '../../src/constants/ConstTest'
import { Path } from '../../src/path/Path'
import { LevelsData } from '../../src/levels/LevelsData'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { Player } from '../../src/player/Player'
import { MapDataType } from '../../src/types/mapDataType'
import { images } from './imagesResources'
import { TowerGreenCreator } from '../../src/towers/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/TowerYellowCreator'
import { TilesManager } from '../../src/tiles/TilesManager'
import { TileOrangeCreator } from '../../src/tiles/TileOrangeCreator'
import { TileStartCreator } from '../../src/tiles/TileStartCreator'
import { TileEndCreator } from '../../src/tiles/TileEndCreator'
import { TilePathCreator } from '../../src/tiles/TilePathCreator'

export const getTileOrangeCreator = (
  levelMap: MapDataType | undefined,
  tilesManager: TilesManager,
) => {
  const player = Player.getInstance()
  const towerGreenCreator = TowerGreenCreator.getInstance(images)
  const towerRedCreator = TowerRedCreator.getInstance(images)
  const towerYellowCreator = TowerYellowCreator.getInstance(images, player)

  return TileOrangeCreator.getInstance(
    levelMap,
    images,
    player,
    towerGreenCreator,
    towerRedCreator,
    towerYellowCreator,
    tilesManager,
  )
}

export const getTileStartCreator = (
  levelMap: MapDataType | undefined,
  tilesManager: TilesManager,
) => {
  const player = Player.getInstance()
  return TileStartCreator.getInstance(levelMap, images, player, tilesManager)
}

export const getTileEndCreator = (
  levelMap: MapDataType | undefined,
  tilesManager: TilesManager,
) => {
  const player = Player.getInstance()
  return TileEndCreator.getInstance(levelMap, images, player, tilesManager)
}

export const getTilePathCreator = (
  levelMap: MapDataType | undefined,
  tilesManager: TilesManager,
) => {
  const player = Player.getInstance()
  return TilePathCreator.getInstance(levelMap, images, player, tilesManager)
}

export const getPathFromMap = (levelMap: MapDataType | undefined) => {
  const tilesManager = new TilesManager()

  TileOrangeCreator.clearInstance()
  TileStartCreator.clearInstance()
  TileEndCreator.clearInstance()
  TilePathCreator.clearInstance()

  const tileOrangeCreator = getTileOrangeCreator(levelMap, tilesManager)
  const tileStartCreator = getTileStartCreator(levelMap, tilesManager)
  const tileEndCreator = getTileEndCreator(levelMap, tilesManager)
  const tilePathCreator = getTilePathCreator(levelMap, tilesManager)

  tileOrangeCreator.createAll()
  tileStartCreator.create()
  tileEndCreator.create()
  tilePathCreator.createAll()

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

const getLevelMap = (idLevelMap: number) => {
  const levelsDataProvider = new LevelsDataProvider(LevelsData.data)
  const levelMap = levelsDataProvider.getLevel(idLevelMap)

  return levelMap
}

export const testTinyOrders = [
  ConstDirection.LEFT,
  ConstDirection.DOWN,
  ConstDirection.RIGHT,
  ConstDirection.UP,
]
