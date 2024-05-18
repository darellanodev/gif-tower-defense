import { ConstTest } from '../../src/constants/ConstTest'
import { LevelsData } from '../../src/levels/LevelsData'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'

export const getLevelMap = () => {
  const levelsDataProvider = new LevelsDataProvider(LevelsData.data)

  const levelMap = levelsDataProvider.getLevel(
    ConstTest.ID_LEVEL_VALID_FOR_UNIT_TESTING,
  )

  if (levelMap === undefined) {
    throw new Error('Map not valid')
  }

  return levelMap
}
