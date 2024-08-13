import { createSixMiniMapsButtonsForMenuSurvival } from '../helpers/hud'

const buttonsMiniMaps = createSixMiniMapsButtonsForMenuSurvival()

test('createForLevelsIdsMenuSurvival, when we pass six levels Ids, then the 6th button minimap is in the sencond row', () => {
  const result = buttonsMiniMaps.at(-1)?.position.y
  const expected = 320
  expect(result).toBe(expected)
})

test('createForLevelsIdsMenuSurvival, when we look at the y position of the 5th level, is the same as the first minimap button', () => {
  const result = buttonsMiniMaps[4]?.position.y
  const expected = 200
  expect(result).toBe(expected)
})
