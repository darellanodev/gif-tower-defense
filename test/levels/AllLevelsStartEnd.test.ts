import { describe, expect } from 'vitest'
import { DIRECTION } from '../../src/constants/direction'
import { AllLevels } from '../../src/levels/levelsData/AllLevels'
import { MapDataType } from '../../src/types/mapDataType'

// The first levels were written by hand with irregular directions. They are not checked.
// Do not add more ids: a new level must have the start and end tiles well oriented.
const KNOWN_IRREGULAR_LEVEL_IDS = [7, 18, 20, 21, 23, 24, 25]

type Cell = { column: number; row: number }

const findSymbol = (rowsMap: string[], symbol: string): Cell => {
  const row = rowsMap.findIndex((rowSymbols) => rowSymbols.includes(symbol))
  return { column: rowsMap[row].indexOf(symbol), row }
}

// directions that go from the edge of the map to the inside of the map
const getInwardDirections = (cell: Cell, rowsMap: string[]) => {
  const directions: number[] = []
  if (cell.column === 0) directions.push(DIRECTION.RIGHT)
  if (cell.column === 15) directions.push(DIRECTION.LEFT)
  if (cell.row === 0) directions.push(DIRECTION.DOWN)
  if (cell.row === rowsMap.length - 1) directions.push(DIRECTION.UP)
  return directions
}

// directions that go from the edge of the map to the outside of the map
const getOutwardDirections = (cell: Cell, rowsMap: string[]) => {
  const directions: number[] = []
  if (cell.column === 0) directions.push(DIRECTION.LEFT)
  if (cell.column === 15) directions.push(DIRECTION.RIGHT)
  if (cell.row === 0) directions.push(DIRECTION.UP)
  if (cell.row === rowsMap.length - 1) directions.push(DIRECTION.DOWN)
  return directions
}

const levelsToCheck = AllLevels.data
  .filter((level) => !KNOWN_IRREGULAR_LEVEL_IDS.includes(level.id))
  .map((level) => [level.id, level.title, level])

describe('start and end tiles of AllLevels', () => {
  test.each(levelsToCheck)(
    'level %i (%s): the start tile x is on the edge and the enemies enter in the map',
    (_id, _title, level) => {
      const map = level as MapDataType
      const start = findSymbol(map.rowsMap, 'x')

      expect(getInwardDirections(start, map.rowsMap)).toContain(
        map.startDirection,
      )
    },
  )

  test.each(levelsToCheck)(
    'level %i (%s): the end tile y is on the edge and the enemies leave the map',
    (_id, _title, level) => {
      const map = level as MapDataType
      const end = findSymbol(map.rowsMap, 'y')

      expect(getOutwardDirections(end, map.rowsMap)).toContain(map.endDirection)
    },
  )
})
