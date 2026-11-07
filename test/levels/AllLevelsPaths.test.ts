import { describe, expect } from 'vitest'
import { AllLevels } from '../../src/levels/levelsData/AllLevels'
import { MapDataType } from '../../src/types/mapDataType'
import { getPathFromMap } from '../helpers/levelMap'

// Levels where the enemies never reach the end tile. They behave the same way in the legacy game, which
// used the same turning rule and walked from the 'y' tile to the 'x' tile (the converter swaps both symbols):
// - 12 levels have no walkable route between both tiles (for example 76).
// - 20 levels have a route but the rule makes the enemies walk in circles, on purpose in many cases
//   (their titles are 'noend', 'endless', 'funloop', "Can't lose"...).
// This list is a ratchet: when a level starts reaching the end, its test fails and the id has to be removed
// from the list. Do not import a level that is not here and does not reach the end.
const KNOWN_UNREACHABLE_END_LEVEL_IDS = [
  76, 77, 95, 156, 157, 158, 184, 197, 198, 207, 214, 226, 289, 316, 317, 319,
  615, 881, 923, 925, 926, 963, 1062, 1261, 1355, 1456, 1547, 1569, 1580, 1603,
  1666, 1822,
]

const endIsReached = (level: MapDataType) => {
  const path = getPathFromMap(level)
  path.makeOrders()
  return path.endReached
}

describe('AllLevels', () => {
  test('the level ids are unique', () => {
    const ids = AllLevels.data.map((level) => level.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the levels are sorted by id', () => {
    const ids = AllLevels.data.map((level) => level.id)
    const sortedIds = [...ids].sort((a, b) => a - b)

    expect(ids).toStrictEqual(sortedIds)
  })

  test('the known unreachable levels exist', () => {
    const ids = AllLevels.data.map((level) => level.id)

    const result = KNOWN_UNREACHABLE_END_LEVEL_IDS.every((id) =>
      ids.includes(id),
    )

    expect(result).toBeTruthy()
  })

  test.each(AllLevels.data.map((level) => [level.id, level.title, level]))(
    'level %i (%s): the enemies can reach the end tile unless it is a known case',
    (_id, _title, level) => {
      const map = level as MapDataType
      const isKnownCase = KNOWN_UNREACHABLE_END_LEVEL_IDS.includes(map.id)

      expect(endIsReached(map)).toBe(!isKnownCase)
    },
  )
})
