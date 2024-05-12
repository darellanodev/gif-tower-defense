import { ConstTest } from '../../src/constants/ConstTest'
import { Path } from '../../src/enemies/Path'
import { LevelsData } from '../../src/levels/LevelsData'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { TileGenerator } from '../../src/tiles/TileGenerator'

export const getTileGeneratorFromMap = () => {
  const levelsDataProvider = new LevelsDataProvider(LevelsData.data)

  const levelMap = levelsDataProvider.getLevel(
    ConstTest.ID_LEVEL_VALID_FOR_UNIT_TESTING,
  )

  if (levelMap === undefined) {
    throw new Error('Map invalid')
  }

  const mapimages: any[] = [null, null, null]

  return new TileGenerator(levelMap, mapimages)
}

export const getPathFromMap = () => {
  const tileGenerator = getTileGeneratorFromMap()
  const pathTiles = tileGenerator.pathTiles
  const startTile = tileGenerator.startTile
  const endTile = tileGenerator.endTile

  return new Path(startTile, endTile, pathTiles)
}
