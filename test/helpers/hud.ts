import { ConstTest } from '../../src/constants/ConstTest'
import { ButtonsMiniMapsCreator } from '../../src/hud/ButtonsMiniMapsCreator'
import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { LevelsDataTesting } from '../../src/levels/LevelsDataTesting'
import { MiniMap } from '../../src/MiniMap'
import { Position } from '../../src/types/position'

export const createSixMiniMapsButtonsForMenuSurvival = (
  initialPosition: Position,
) => {
  ConstTest.DISABLE_LOADING_IMAGES = true
  const levelsDataProvider = LevelsDataProvider.getInstance()
  levelsDataProvider.initLevels(LevelsDataTesting.data)

  const buttonsMiniMapsCreator =
    ButtonsMiniMapsCreator.getInstance(levelsDataProvider)
  const levelsIds = [1, 1, 1, 1, 1, 1]
  const buttonsMiniMaps = buttonsMiniMapsCreator.createForLevelIdsMenuSurvival(
    levelsIds,
    MiniMap.TYPE_TEXT_DOWN,
    initialPosition,
  )
  return buttonsMiniMaps
}
