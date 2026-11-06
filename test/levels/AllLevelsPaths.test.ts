import { describe, expect } from 'vitest'
import { AllLevels } from '../../src/levels/levelsData/AllLevels'
import { MapDataType } from '../../src/types/mapDataType'
import { getPathFromMap } from '../helpers/levelMap'

// Levels where Path.makeOrders does not reach the end tile with the current algorithm (it loops
// around branches or dead ends until PATH_MAX_SEARCHES). They were already imported before the ice
// tile. This list is a ratchet: when the path algorithm is fixed for a level, its test fails and the
// id has to be removed from the list. A new level must never be added to it: do not import it.
const KNOWN_UNREACHABLE_END_LEVEL_IDS = [
  22, 23, 25, 34, 36, 38, 58, 64, 73, 76, 77, 79, 87, 119, 120, 123, 129, 132,
  134, 136, 143, 144, 149, 156, 157, 158, 171, 175, 183, 184, 197, 198, 207,
  210, 214, 226, 253, 258, 289, 290, 295, 297, 308, 316, 317, 327, 331, 343,
  371, 375, 376, 380, 398, 414, 418, 420, 449, 450, 457, 615, 678, 721, 746,
  749, 755, 881, 923, 925, 963, 986, 997, 1062, 1261, 1265, 1355, 1547, 1569,
  1580, 1603, 1666, 1822, 1868,
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
    'level %i (%s): the enemies can reach the end tile unless it is a known issue',
    (_id, _title, level) => {
      const map = level as MapDataType
      const isKnownIssue = KNOWN_UNREACHABLE_END_LEVEL_IDS.includes(map.id)

      expect(endIsReached(map)).toBe(!isKnownIssue)
    },
  )
})
