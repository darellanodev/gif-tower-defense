import { LevelsDataProvider } from '../../src/levels/LevelsDataProvider'
import { LevelsDataTesting } from '../../src/levels/LevelsDataTesting'
import { ButtonsMiniMapsCreator } from '../../src/hud/ButtonsMiniMapsCreator'
import { MiniMap } from '../../src/MiniMap'
import { ConstTest } from '../../src/constants/ConstTest'

test('createForLevelsIdsMenuSurvival, when we pass six levels Ids, then the 6th button minimap is in the sencond row', () => {
  ConstTest.DISABLE_LOADING_IMAGES = true
  const levelsDataProvider = LevelsDataProvider.getInstance()
  levelsDataProvider.initLevels(LevelsDataTesting.data)

  const buttonsMiniMapsCreator =
    ButtonsMiniMapsCreator.getInstance(levelsDataProvider)

  const levelsIds = [1, 1, 1, 1, 1, 1, 1]
  const buttonsMiniMaps = buttonsMiniMapsCreator.createForLevelIdsMenuSurvival(
    levelsIds,
    MiniMap.TYPE_TEXT_DOWN,
    { x: 100, y: 200 },
  )
  const result = buttonsMiniMaps.at(-1)?.position.y
  const expected = 320
  expect(result).toBe(expected)
})
