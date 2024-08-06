import {
  getNoValidLevelMapUnreachableEndTile,
  getPathFromMap,
} from '../helpers/levelMap'

test('length orders of makeOrders, when map is invalid, returns zero', () => {
  const noValidMap = getNoValidLevelMapUnreachableEndTile()

  const path = getPathFromMap(noValidMap)
  const orders = path.makeOrders()
  const result = path.endReached

  expect(result).toBeFalsy()
})
