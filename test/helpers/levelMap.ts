import { ConstDirection } from '../../src/constants/ConstDirection'
import { ConstTest } from '../../src/constants/ConstTest'
import { Path } from '../../src/path/Path'
import { LevelsData } from '../../src/levels/LevelsData'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { Player } from '../../src/player/Player'
import { TileGenerator } from '../../src/tiles/TileGenerator'
import { MapDataType } from '../../src/types/mapDataType'
import { images } from './imagesResources'
import { TowerGreenCreator } from '../../src/towers/TowerGreenCreator'
import { TowerRedCreator } from '../../src/towers/TowerRedCreator'
import { TowerYellowCreator } from '../../src/towers/TowerYellowCreator'

export const getTileGeneratorFromMap = (levelMap: MapDataType | undefined) => {
  const player = new Player()
  const towerGreenCreator = new TowerGreenCreator(images)
  const towerRedCreator = new TowerRedCreator(images)
  const towerYellowCreator = new TowerYellowCreator(images, player)
  return new TileGenerator(
    levelMap,
    images,
    player,
    towerGreenCreator,
    towerRedCreator,
    towerYellowCreator,
  )
}

export const getPathFromMap = (levelMap: MapDataType | undefined) => {
  const tileGenerator = getTileGeneratorFromMap(levelMap)
  const pathTiles = tileGenerator.pathTiles
  const startTile = tileGenerator.startTile
  const endTile = tileGenerator.endTile

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
