import { ButtonsMiniMapsCreator } from '../../src/hud/buttons/ButtonsMiniMapsCreator'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { LevelsDataTesting } from '../../src/levels/LevelsDataTesting'

export const getButtonsMiniMapsCreator = () => {
  const levelsDataProvider = LevelsDataProvider.getInstance()
  levelsDataProvider.initLevels(LevelsDataTesting.data)

  const buttonsMiniMapsCreator =
    ButtonsMiniMapsCreator.getInstance(levelsDataProvider)
  return buttonsMiniMapsCreator
}
